export type DBCredentials = {
  id: string
  host: string
  username: string
  password: string
  requestedUseDb?: string
  db?: string
}

export type DatabaseItem = {
  id: string
  title: string
  queries: {
    id: string | number
    query: string
    text: string
  }[]
}

const DBCredentials: DBCredentials = {
  host: 'neo4j+s://demo.neo4jlabs.com:7687',
  id: 'demodb',
  username: 'demo',
  password: 'demo',
  requestedUseDb: 'movies',
  db: 'movies'
}

const allowedDatabases: DatabaseItem[] = [
  {
    id: 'movies',
    title: 'Movies',
    queries: [
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
  },

  {
    title: 'ICIJ Offshore Leaks',
    id: 'offshoreleaks',
    queries: [
      {
        id: 0,
        text: 'Find all',
        query: `MATCH (n) return n limit 25`
      }
    ]
  },
  {
    title: 'Open Street Map',
    id: 'openstreetmap',
    queries: [
      {
        id: 0,
        text: 'Find all',
        query: `MATCH (n) return n limit 25`
      }
    ]
  },
  {
    title: 'Stack Overflow',
    id: 'stackoverflow',
    queries: [
      {
        id: 0,
        text: 'Find all',
        query: `MATCH (n) return n limit 25`
      }
    ]
  }
]

export default {
  allowedDatabases,
  DBCredentials
}
