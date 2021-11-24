import React from 'react'
import theme from './theme'
import PlayIconCircle from './PlayIconCircle'
import CheckIconCircle from './CheckIconCircle'
import { withBus } from 'react-suber'
import { connect } from 'react-redux'
import * as editor from 'shared/modules/editor/editorDuck'
import { CSSProperties } from 'styled-components'
import AuraBanner from './AuraBanner'

interface IProps {
  onQueryUpdate: any
  onItemClick: (cmd: string) => void
  customActiveConnection: any
}

type IStyles = {
  h5: CSSProperties
  container: CSSProperties
  innerContainer: CSSProperties
  item: CSSProperties
  cta: CSSProperties
  ctaIcon: CSSProperties
  ctaInner: CSSProperties
}

const styles = {
  h5: {
    padding: '1.5rem',
    margin: 0,
    borderBottom: `1px solid ${theme.colors.whitesmoke}`
  },
  item: {
    padding: '1rem 1.5rem',
    lineHeight: 1.7
  },
  container: {
    padding: '10px',
    paddingRight: 0,
    height: '100%',
    background: 'rgb(227 237 245)',
    width: '33%',
    minWidth: '360px',
    maxWidth: '360px'
  },
  innerContainer: {
    background: 'white',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 2,
    position: 'relative'
  },
  cta: {
    marginTop: '.5rem'
  },
  ctaInner: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  ctaIcon: {
    paddingRight: '.5rem',
    display: 'flex'
  }
} as IStyles

const QuickActions = (props: IProps) => {
  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <div style={{ flex: 0 }}>
          <h3 style={styles.h5}>Movies Database</h3>
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ ...styles.item, paddingTop: '1rem' }}>
              <h5 style={{ marginBottom: '2rem' }}>Sample Queries</h5>
              <div>Finding who directed Cloud Atlas movie</div>
              <div style={styles.cta}>
                <a
                  style={styles.ctaInner}
                  href="#"
                  onClick={() =>
                    props.onItemClick(
                      "MATCH (m:Movie {title: 'Cloud Atlas'})<-[d:DIRECTED]-(p:Person)\nreturn p, d"
                    )
                  }
                >
                  <span style={styles.ctaIcon}>
                    <PlayIconCircle
                      color={theme.colors.primary.DEFAULT}
                      size={14}
                    />
                  </span>{' '}
                  <span className="inline-flex items-center">Run query</span>
                </a>
              </div>
            </div>
            <div style={styles.item}>
              <div>
                Finding all people who have co-acted with Tom Hanks in any movie
              </div>
              <div style={styles.cta}>
                <a
                  style={styles.ctaInner}
                  href="#"
                  onClick={() =>
                    props.onItemClick(
                      'MATCH (tom:Person {name: "Tom Hanks"})-[a:ACTED_IN]->(m:Movie)<-[aa:ACTED_IN]-(p:Person)\nreturn p, a, aa, m, tom'
                    )
                  }
                >
                  <span style={styles.ctaIcon}>
                    <PlayIconCircle
                      color={theme.colors.primary.DEFAULT}
                      size={14}
                    />
                  </span>
                  <span className="inline-flex items-center">Run query</span>
                </a>
              </div>
            </div>
            <div style={styles.item}>
              <div>
                Finding all people related to the movie Cloud Atlas in any way
              </div>
              <div style={styles.cta}>
                <a
                  style={styles.ctaInner}
                  href="#"
                  onClick={() =>
                    props.onItemClick(
                      'MATCH (p:Person)-[relatedTo]-(m:Movie {title: "Cloud Atlas"})\nreturn p, m, relatedTo'
                    )
                  }
                >
                  <span style={styles.ctaIcon}>
                    <PlayIconCircle
                      color={theme.colors.primary.DEFAULT}
                      size={14}
                    />
                  </span>
                  <span className="inline-flex items-center">Run query</span>
                </a>
              </div>
            </div>
          </div>
          <div
            style={{ padding: '.75rem 1.5rem', fontSize: 14, lineHeight: 1.7 }}
          >
            <span>
              Connected to the{' '}
              <strong>
                <em>movies</em>
              </strong>{' '}
              database with <strong>read-only</strong> access
            </span>
            <span className="inline-flex items-center">
              {' '}
              <CheckIconCircle size={12} color={theme.colors.success.DEFAULT} />
            </span>
          </div>
        </div>
        <AuraBanner />
      </div>
    </div>
  )
}

const mapDispatchToProps = (_dispatch: any, ownProps: any) => {
  return {
    onItemClick: (cmd: string) => {
      ownProps.bus.send(editor.SET_CONTENT, editor.setContent(cmd))
    }
  }
}

export default withBus(connect(null, mapDispatchToProps)(QuickActions))
