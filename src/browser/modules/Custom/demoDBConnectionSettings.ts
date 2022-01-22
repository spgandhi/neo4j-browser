type Connection = {
  id: string
  title: string
  dbName: string
  connectionDetails: {
    id: string
    host: string
    username: string
    password: string
  }
  queries: {
    id: string | number
    query: string
    text: string
  }[]
}

const moviesDatabase: Connection = {
  title: 'Movies Database',
  dbName: 'movies',
  id: 'movies',
  connectionDetails: {
    host: 'bolt+s://0650b4f312907ff556ff11b7b2d10259.neo4jsandbox.com:7687',
    id: 'movies',
    username: 'neo4j',
    password: 'drive-contacts-talkers'
  },
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
}

const crimeInvestigation: Connection = {
  title: 'Crime Investigation',
  dbName: 'crime-investigation',
  id: 'crime',
  connectionDetails: {
    host: 'bolt+s://8101a5d1f65a7c985f0765c0931db207.neo4jsandbox.com:7687',
    id: 'crime',
    username: 'neo4j',
    password: 'tour-excesses-dew'
  },
  queries: [
    {
      id: 0,
      text: 'Find all',
      query: `MATCH (n) return n limit 25`
    }
  ]
}

export default [moviesDatabase, crimeInvestigation]
