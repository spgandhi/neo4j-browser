import { ConsoleErrorListener } from 'antlr4/error/ErrorListener'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import { executeSystemCommand } from 'shared/modules/commands/commandsDuck'
import {
  CONNECT,
  setActiveConnection
} from 'shared/modules/connections/connectionsDuck'
import { getRequests } from 'shared/modules/requests/requestsDuck'
import { OverlayElement } from './AppWrapper'
import CustomProgressBar from './CustomProgressBar'
import demoDBConnectionSettings from './demoDBConnectionSettings'
import { generateQueryWithComment, trackEvent } from './helpers'

const loadingData = {
  loadingStep: [10, 20, 30, 60, 80],
  timerSteps: [0, 2000, 4000, 6000, 8000],
  loadingStepText: [
    'Switching database',
    'Checking server configuration',
    'Verifying sample data',
    'Loading Neo4j Browser',
    'We are almost done'
  ],
  defaultText: 'We are almost done'
}

interface IProps {
  children: React.ReactNode
  setActiveConnection: Function
  executeSystemCommand: any
  bus: any
  queryRequests: any
}

const AuthWrapper = (props: IProps) => {
  const { queryRequests } = props
  const [isCredentialing, setIsCredentialing] = useState(true)
  const [firstQueryMode, setFirstQueryMode] = useState(false)

  const handleDBConnect = (details: any, initialCommand: string) => {
    setIsCredentialing(true)
    trackEvent('CONNECT_TO_DB', {
      id: details.id
    })
    setFirstQueryMode(true)
    props.bus.self(CONNECT, details, (res: any) => {
      trackEvent('CONNECT_TO_DB_SUCCESS', {
        id: details.id,
        ...res
      })
      props.setActiveConnection(details.id)
      props.executeSystemCommand(':clear')
      props.executeSystemCommand(initialCommand)

      // Allow max 20 secs for initial command to execute before showing the screen
      setTimeout(() => {
        if (!isCredentialing) {
          readyForDisplay()
        }
      }, 20 * 1000)
    })
  }

  const readyForDisplay = () => {
    setIsCredentialing(false)
    setFirstQueryMode(false)
  }

  useEffect(() => {
    const handleTask = async () => {
      handleDBConnect(
        demoDBConnectionSettings[0].connectionDetails,
        generateQueryWithComment(
          demoDBConnectionSettings[0].queries[0].query,
          demoDBConnectionSettings[0].queries[0].text
        )
      )
    }

    handleTask()

    // Listen for message to change connection to another DB
    window.addEventListener('message', (event: any) => {
      const allowedMessages = demoDBConnectionSettings.map(db => db.id)
      if (allowedMessages.indexOf(event.data) > -1) {
        const db = demoDBConnectionSettings.find(db => db.id === event.data)
        if (!db) return
        props.executeSystemCommand(':server disconnect')
        handleDBConnect(db.connectionDetails, db.queries[0].query)
      }
    })
  }, [])

  useEffect(() => {
    if (firstQueryMode && Object.keys(queryRequests).length > 0) {
      const isActiveQuery = Object.keys(queryRequests).some(key => {
        const request = queryRequests[key]
        return request.status === 'pending'
      })
      if (!isActiveQuery) readyForDisplay()
    }
  }, [queryRequests])

  if (isCredentialing) {
    return (
      <OverlayElement>
        <div style={{ width: 300, height: 20 }}>
          <CustomProgressBar data={loadingData} color="blue" size="small" />
        </div>
      </OverlayElement>
    )
  }

  return <div>{!isCredentialing && props.children}</div>
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setActiveConnection: (id: any) => dispatch(setActiveConnection(id)),
    executeSystemCommand: (cmd: string) => dispatch(executeSystemCommand(cmd))
  }
}

const mapStateToProps = (state: any) => {
  return {
    queryRequests: getRequests(state)
  }
}

export default withBus(
  connect(mapStateToProps, mapDispatchToProps)(AuthWrapper)
)
