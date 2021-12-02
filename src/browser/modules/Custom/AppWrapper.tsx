import React, { useEffect, useRef, useState } from 'react'
import { Suspense } from 'react'
import theme from './theme'
import mixpanel from 'mixpanel-browser'
import { trackEvent } from './helpers'
import CustomProgressBar from './CustomProgressBar'

const loadingData = {
  loadingStep: [10, 20, 30, 60, 80, 90],
  timerSteps: [0, 1000, 2000, 4000, 6000, 10000],
  loadingStepText: [
    'Firing up the database',
    'Setting server configuration',
    'Loading sample data',
    'Loading Neo4j Browser',
    'Connecting to the database',
    'We are almost done'
  ],
  defaultText: 'We are almost done'
}

const baseDir = ''
// '/wp-content/themes/neo4jweb/assets_v2/scripts/react-modules/neo4j-browser-lite/dist'

const AppWrapper = () => {
  const [shouldShowOverlay, setShouldShowOverlay] = useState(true)
  const [isLoadingBrowserApp, setIsLoadingBrowserApp] = useState(false)
  const [AsyncMainComponent, setAsyncMainComponent] = useState<any>(null)

  const onShowMain = () => {
    setIsLoadingBrowserApp(true)
    trackEvent('INIT_ATTEMPT')
    handleAppImport()
  }

  const handleAppImport = () => {
    import('../../AppInit').then(module => {
      trackEvent('INIT_SUCCESS')
      setAsyncMainComponent(module.default)
      console.log('init complete', Date.now())
      setTimeout(() => {
        setShouldShowOverlay(false)
        console.log('running timeout', Date.now())
      }, 10000)
    })
  }

  useEffect(() => {
    // if prod-URL then use 'prod-token' else 'dev-token'
    const MIXPANEL_TOKEN =
      window.location.href.indexOf('test-drive.neo4j.com') > -1
        ? '4bfb2414ab973c741b6f067bf06d5575'
        : 'ef1696f0a9c88563894dcba2019a9bef'

    mixpanel.init(MIXPANEL_TOKEN, { debug: true })
  }, [])

  return (
    <div>
      {shouldShowOverlay && (
        <OverlayElement>
          {!isLoadingBrowserApp && (
            <button
              id="test-drive-launch-btn"
              style={{
                background: theme.colors.secondary.DEFAULT,
                padding: '12px 24px',
                borderRadius: 4,
                border: 0,
                color: 'white',
                fontWeight: 'bold'
              }}
              onClick={onShowMain}
            >
              Start Playground
            </button>
          )}
          {isLoadingBrowserApp && (
            <div style={{ width: 300, height: 20 }}>
              <CustomProgressBar data={loadingData} color="blue" size="small" />
            </div>
          )}
        </OverlayElement>
      )}
      {AsyncMainComponent && (
        <Suspense fallback={<div>Loading</div>}>{AsyncMainComponent}</Suspense>
      )}
    </div>
  )
}

const OverlayElement = ({ children }: any) => (
  <div
    style={{
      position: 'absolute',
      borderRadius: 8,
      zIndex: 99999,
      height: '100vh',
      width: '100%'
    }}
  >
    <img
      src={`${baseDir}/assets/images/preview.jpg`}
      style={{ width: '100%', height: '100vh' }}
    />
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: 'rgba(0,0,0,.8)'
      }}
    >
      {children}
    </div>
  </div>
)

export default AppWrapper
