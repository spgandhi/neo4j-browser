import React, { useEffect, useRef, useState } from 'react'
import { Suspense } from 'react'
import { Loader, Progress } from 'semantic-ui-react'
import theme from './theme'
// import PreviewImg from './preview.jpg'

const baseDir = ''
// '/wp-content/themes/neo4jweb/assets_v2/scripts/react-modules/neo4j-browser-lite/dist'

const AppWrapper = () => {
  const [shouldShowOverlay, setShouldShowOverlay] = useState(true)
  const [isLoadingBrowserApp, setIsLoadingBrowserApp] = useState(false)
  const [AsyncMainComponent, setAsyncMainComponent] = useState<any>(null)

  const onShowMain = async () => {
    setIsLoadingBrowserApp(true)
    console.log('clicked')
    setTimeout(() => {
      setShouldShowOverlay(false)
    }, 5000)
    handleAppImport()
  }

  const handleAppImport = () => {
    import('../../AppInit').then(module => {
      setAsyncMainComponent(module.default)
    })
  }

  console.log('here')

  return (
    <div>
      {shouldShowOverlay && (
        <OverlayElement>
          {!isLoadingBrowserApp && (
            <button
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
            <div>
              <Loader active inverted />
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
  <div style={{ position: 'relative', borderRadius: 8 }}>
    <img
      src={`${baseDir}/assets/images/preview.jpg`}
      style={{ width: '100%' }}
    />
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: 'rgba(0,0,0,.5)'
      }}
    >
      {children}
    </div>
  </div>
)

export default AppWrapper
