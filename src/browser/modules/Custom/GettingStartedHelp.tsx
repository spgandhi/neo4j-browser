import React from 'react'
import PlayIconCircle from './PlayIconCircle'
import theme from './theme'

function GettingStartedHelp() {
  const searchParams = new URLSearchParams(window.location.search)

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'initial'
      }}
    >
      <div
        style={{
          maxWidth: 676,
          background: 'white',
          borderRadius: 4,
          padding: '32px 24px',
          boxShadow: '15px 30px 70px 0px rgb(12 26 37 / 20%)'
        }}
      >
        <h5>Getting Started</h5>
        <ol style={{ paddingLeft: 16 }}>
          <li style={{ marginBottom: 8 }}>
            <span style={{ display: 'inline-flex' }}>
              {searchParams.get('showSidebar') == 'false' ? (
                <>
                  <span>
                    Write the cypher query in the editor above and then click on
                    the play icon to run the query.
                  </span>
                </>
              ) : (
                <>
                  <span>Click on "Run Query" ( </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 4px'
                    }}
                  >
                    <PlayIconCircle
                      color={theme.colors.primary.DEFAULT}
                      size={14}
                    />
                  </span>
                  <span>
                    {' '}
                    ) on one of the sample queries in the left sidebar.
                  </span>
                </>
              )}
            </span>
          </li>
          <li style={{ marginBottom: 8 }}>
            When the query populates in the Cypher Editor above, click on the
            play icon to run the query.
          </li>
          <li style={{ marginBottom: 8 }}>
            The results will then display here.
          </li>
        </ol>
      </div>
    </div>
  )
}

export default GettingStartedHelp
