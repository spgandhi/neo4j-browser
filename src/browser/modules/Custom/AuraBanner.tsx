import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import { getRequests } from 'shared/modules/requests/requestsDuck'
import theme from './theme'
import mixpanel from 'mixpanel-browser'

function AuraBanner(props: any) {
  const [shouldShowBanner, setShowBanner] = useState(false)
  const [mixpanelUserId, setMixpanelUserId] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setShowBanner(true)
    }, 3 * 60 * 1000)
  }, [])

  useEffect(() => {
    const successfulCypherRequests = Object.keys(props.queryRequests).filter(
      requestId =>
        props.queryRequests[requestId].status === 'success' &&
        props.queryRequests[requestId].type === 'cypher'
    )
    if (successfulCypherRequests.length >= 2) {
      setShowBanner(true)
      try {
        setMixpanelUserId(mixpanel.get_distinct_id())
      } catch (e) {
        console.warn('Mixpanel not initialized', e)
      }
    }
  }, [props.queryRequests])

  const handleCtaClick = () => {
    mixpanel.track('TEST_DRIVE_CLICK', { label: 'Start free on aura' })
  }

  let ctaUrl = `https://console.neo4j.io/?ref=test-drive`
  if (mixpanelUserId) ctaUrl += `&mpid=${mixpanelUserId}`

  return (
    <div
      style={{
        width: '100%',
        background: theme.colors.primary[50],
        color: 'white',
        margin: 'auto',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '36px 24px',
        transform: shouldShowBanner ? 'translateY(0)' : 'translateY(100%)',
        opacity: shouldShowBanner ? 1 : 0,
        transition: '1s all',
        zIndex: 99,
        borderRadius: '0 0 4px 4px'
      }}
    >
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          rowGap: 36,
          justifyContent: 'space-between'
        }}
      >
        <div>
          <h3>You are doing great! Next Step?</h3>
          <p className="text-subtitle">
            Continue learning and building with Neo4j with a persistent database
            and a detailed guide
          </p>
        </div>
        <div>
          <a
            onClick={handleCtaClick}
            className="button primary"
            style={{
              background: 'white',
              padding: '12px 18px',
              borderRadius: 4
            }}
            href={ctaUrl}
            target="_blank"
            rel="noreferrer"
          >
            Start Free on AuraDB
          </a>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    queryRequests: getRequests(state)
  }
}

export default withBus(connect(mapStateToProps, null)(AuraBanner))
