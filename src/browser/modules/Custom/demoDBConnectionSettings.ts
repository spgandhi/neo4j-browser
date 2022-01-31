type Connection = {
  id: string
  title: string
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
  title: 'Movies',
  id: 'movies',
  connectionDetails: {
    host: 'bolt+s://c437b9da33285ed02894f9390788a862.neo4jsandbox.com:7687',
    id: 'movies',
    username: 'neo4j',
    password: 'tents-fours-stream'
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
  id: 'crime',
  connectionDetails: {
    host: 'bolt+s://e93bc828a65698de09eea6f20fb911f0.neo4jsandbox.com:7687',
    id: 'crime',
    username: 'neo4j',
    password: 'boils-hydrometers-slides'
  },
  queries: [
    {
      id: 0,
      text: 'Find all',
      query: `MATCH (n) return n limit 25`
    }
  ]
}

const icijOffshoreLeaks: Connection = {
  title: 'ICIJ Offshore Leaks',
  id: 'icij-offshore-leaks',
  connectionDetails: {
    host: 'bolt+s://98ce4ba996dcc977b01e1625273bad2c.neo4jsandbox.com:7687',
    id: 'icij-offshore-leaks',
    username: 'neo4j',
    password: 'label-overflow-letterhead'
  },
  queries: [
    {
      id: 0,
      text: 'Find all',
      query: `MATCH (n) return n limit 25`
    }
  ]
}

const openStreetMap: Connection = {
  title: 'Open Street Map',
  id: 'open-street-map',
  connectionDetails: {
    host: 'bolt+s://972d99373e323be89e28bb0273fdeddb.neo4jsandbox.com:7687',
    id: 'open-street-map',
    username: 'neo4j',
    password: 'polishers-tanks-thicknesses'
  },
  queries: [
    {
      id: 0,
      text: 'Find all',
      query: `MATCH (n) return n limit 25`
    }
  ]
}

const ContactTracing: Connection = {
  title: 'Contact Tracing',
  id: 'contact-tracing',
  connectionDetails: {
    host: 'bolt+s://d75f6f02cc1b25e85a2b02e2e30d630f.neo4jsandbox.com:7687',
    id: 'contact-tracing',
    username: 'neo4j',
    password: 'sewage-thousands-tugs'
  },
  queries: [
    {
      id: 0,
      text: 'Find all',
      query: `MATCH (n) return n limit 25`
    }
  ]
}

const StackOverflow: Connection = {
  title: 'Stack Overflow',
  id: 'stack-overflow',
  connectionDetails: {
    host: 'bolt+s://56dbcbbbee60c82b4d1719aabbc999be.neo4jsandbox.com:7687',
    id: 'open-street-map',
    username: 'neo4j',
    password: 'massed-surprise-sum'
  },
  queries: [
    {
      id: 0,
      text: 'Find all',
      query: `MATCH (n) return n limit 25`
    }
  ]
}

export default [
  moviesDatabase,
  crimeInvestigation,
  icijOffshoreLeaks,
  openStreetMap,
  ContactTracing,
  StackOverflow
]
