import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import { GlobalState } from 'shared/globalState'
import {
  executeCommand,
  executeSystemCommand
} from 'shared/modules/commands/commandsDuck'
import {
  CONNECT,
  getUseDb,
  setActiveConnection
} from 'shared/modules/connections/connectionsDuck'
import {
  getRemoteContentHostnameAllowlist,
  isServerConfigDone
} from 'shared/modules/dbMeta/dbMetaDuck'
import { getRequests } from 'shared/modules/requests/requestsDuck'
import { OverlayElement } from './AppWrapper'
import CustomProgressBar from './CustomProgressBar'
import dbSettings, { DatabaseItem } from './demoDBConnectionSettings'
import { generateQueryWithComment, trackEvent } from './helpers'

const loadingData = {
  loadingStep: [10, 20, 30, 60, 80],
  timerSteps: [0, 3000, 3000, 4000, 5000],
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
  executeCommand: any
  bus: any
  queryRequests: any
  isServerConfigDone: boolean
  activeDb: string | null
}

const AuthWrapper = (props: IProps) => {
  const searchParams = new URLSearchParams(window.location.search)

  const { queryRequests, isServerConfigDone, activeDb } = props
  const [isCredentialing, setIsCredentialing] = useState(true)
  const [firstQueryMode, setFirstQueryMode] = useState(
    searchParams.get('firstQuery') !== 'false'
  )

  // Step 1: Connect to the database
  useEffect(() => {
    setIsCredentialing(true)

    handleDBConnect(dbSettings.DBCredentials)

    // Listen for message to change connection to another DB
    window.addEventListener('message', (event: any) => {
      const allowedMessages = dbSettings.allowedDatabases.map(db => db.id)
      if (allowedMessages.indexOf(event.data) > -1) {
        const db = dbSettings.allowedDatabases.find(db => db.id === event.data)
        if (!db) return
        setIsCredentialing(true)
        handleUseDb(db)
      }
    })
  }, [])

  const handleDBConnect = (details: any) => {
    trackEvent('CONNECT_TO_DB', {
      id: details.id
    })
    props.bus.self(CONNECT, details, (res: any) => {
      trackEvent('CONNECT_TO_DB_SUCCESS', {
        id: details.id,
        ...res
      })

      props.setActiveConnection(details.id)

      // Allow max 20 secs for initial command to execute before showing the screen
      setTimeout(() => {
        if (!isCredentialing) {
          readyForDisplay()
        }
      }, 20 * 1000)
    })
  }

  useEffect(() => {
    if (window.parent !== self) {
      window.parent.postMessage(
        {
          message: 'neo4j-test-drive',
          data: {
            queryRequests
          }
        },
        '*'
      )
    }
  }, [queryRequests])

  // Step 2: When serverConfig is done, set active DB

  const handleUseDb = (dbDetails: DatabaseItem) => {
    trackEvent('SET_ACTIVE_DB', {
      id: dbDetails.id
    })
    props.executeCommand(`:use ${dbDetails.id}`)
  }

  useEffect(() => {
    if (isServerConfigDone) {
      let db = dbSettings.allowedDatabases[0]

      if (searchParams.get('usecase')) {
        const urlParamDb = dbSettings.allowedDatabases.find(
          db => db.id === searchParams.get('usecase')
        )
        if (urlParamDb) db = urlParamDb
      }
      console.log(db)
      handleUseDb(db)

      if (!firstQueryMode) readyForDisplay()
    }
  }, [isServerConfigDone])

  // Step 3: When activeDB is set, run the initial query

  const executeIitialQuery = (dbDetails: DatabaseItem) => {
    setFirstQueryMode(true)
    props.executeCommand(':clear')
    props.executeCommand(
      generateQueryWithComment(
        dbDetails.queries[0].query,
        dbDetails.queries[0].text
      )
    )
  }

  useEffect(() => {
    if (searchParams.get('firstQuery') == 'false') return

    if (activeDb) {
      const dbDetails = dbSettings.allowedDatabases.find(
        db => db.id === activeDb
      )
      if (dbDetails) {
        trackEvent('SET_ACTIVE_DB_SUCCESS', {
          id: dbDetails.id
        })
        executeIitialQuery(dbDetails)
      }
    }
  }, [activeDb])

  // Step 4: When initial query is done, show the screen

  const readyForDisplay = () => {
    setIsCredentialing(false)
    setFirstQueryMode(false)
  }

  useEffect(() => {
    if (firstQueryMode && Object.keys(queryRequests).length > 0) {
      const isActiveQuery = Object.keys(queryRequests).some(key => {
        const request = queryRequests[key]
        return request.status === 'pending'
      })
      if (!isActiveQuery) {
        readyForDisplay()
      }
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
    executeSystemCommand: (cmd: string) => dispatch(executeSystemCommand(cmd)),
    executeCommand: (cmd: string) => dispatch(executeCommand(cmd))
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    queryRequests: getRequests(state),
    isServerConfigDone: isServerConfigDone(state),
    activeDb: getUseDb(state)
  }
}

export default withBus(
  connect(mapStateToProps, mapDispatchToProps)(AuthWrapper)
)
