import React from 'react'
import theme from './theme'
import PlayIconCircle from './PlayIconCircle'
import CheckIconCircle from './CheckIconCircle'
import { withBus } from 'react-suber'
import { connect } from 'react-redux'
import * as editor from 'shared/modules/editor/editorDuck'
import { CSSProperties } from 'styled-components'
import AuraBanner from './AuraBanner'
import { trackEvent } from './helpers'

interface IProps {
  onQueryUpdate: any
  processQuery: (cmd: string) => void
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
    paddingRight: 0,
    height: '100%',
    background: 'rgb(227 237 245)',
    width: '33%',
    minWidth: '360px',
    maxWidth: '360px',
    display: 'flex',
    flexDirection: 'column'
  },
  innerContainer: {
    background: 'white',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'auto',
    flexGrow: 1
  },
  cta: {
    marginTop: '.5rem',
    fontSize: 14
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

const sampleQueries = [
  {
    id: '0',
    text: 'Find people who directed Cloud Atlas movie',
    query:
      "MATCH (m:Movie {title: 'Cloud Atlas'})<-[d:DIRECTED]-(p:Person)\nreturn m, d, p"
  },
  {
    id: '1',
    text: 'Find people who have co-acted with Tom Hanks in any movie',
    query: `MATCH (tom:Person {name: "Tom Hanks"})-[a:ACTED_IN]->(m:Movie)<-[rel:ACTED_IN]-(p:Person)\nreturn p, a, rel, m, tom`
  },
  {
    id: '2',
    text: 'Find all people related to the movie Cloud Atlas in any way',
    query: `MATCH (p:Person)-[relatedTo]-(m:Movie {title: "Cloud Atlas"})\nreturn p, m, relatedTo`
  }
]

const QuickActions = (props: IProps) => {
  const handleQueryClick = (query: string, properties: any = {}) => {
    trackEvent('SAMPLE_QUERY_CLICK', properties)
    props.processQuery(query)
  }
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
            <div>
              <h5
                style={{
                  marginBottom: '1rem',
                  ...styles.item,
                  paddingBottom: 0
                }}
              >
                Sample Queries
              </h5>
              {sampleQueries.map(({ text, query }: any, index: number) => (
                <div key={index} style={{ ...styles.item, paddingTop: '1rem' }}>
                  <div style={{ fontSize: 14 }}>{text}</div>
                  <div style={styles.cta}>
                    <a
                      style={styles.ctaInner}
                      href="#"
                      onClick={() =>
                        handleQueryClick(query, { queryListIndex: index })
                      }
                    >
                      <span style={styles.ctaIcon}>
                        <PlayIconCircle
                          color={theme.colors.primary.DEFAULT}
                          size={14}
                        />
                      </span>{' '}
                      <span className="inline-flex items-center">
                        Run query
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{ padding: '.75rem 1.5rem', fontSize: 13, lineHeight: 1.7 }}
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
      </div>
      <AuraBanner />
    </div>
  )
}

const mapDispatchToProps = (_dispatch: any, ownProps: any) => {
  return {
    processQuery: (cmd: string) => {
      ownProps.bus.send(editor.SET_CONTENT, editor.setContent(cmd))
    }
  }
}

export default withBus(connect(null, mapDispatchToProps)(QuickActions))
