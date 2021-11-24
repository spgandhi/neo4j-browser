import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import {
  setActiveConnection,
  updateConnection
} from 'shared/modules/connections/connectionsDuck'

interface IProps {
  children: React.ReactNode
  updateConnection: Function
  setActiveConnection: Function
}

const AuthWrapper = (props: IProps) => {
  const [isCredentialingDone, setIsCredentialingDone] = useState(false)

  useEffect(() => {
    const handleTask = async () => {
      props.updateConnection({
        id: 'movies',
        host: `neo4j+s://demo.neo4jlabs.com:7687`,
        username: 'movies',
        password: 'movies',
        db: 'movies',
        requestedUseDb: 'movies',
        authenticationMethod: 'NATIVE'
      })
      props.setActiveConnection('movies')

      setIsCredentialingDone(true)
    }
    handleTask()
  }, [])

  return <div>{isCredentialingDone && props.children}</div>
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateConnection: (connection: any) => {
      dispatch(updateConnection(connection))
    },
    setActiveConnection: (id: any) => dispatch(setActiveConnection(id))
  }
}

export default withBus(connect(null, mapDispatchToProps)(AuthWrapper))
