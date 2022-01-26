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
  title: 'Movies Database',
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

const icijOffshoreLeaks: Connection = {
  title: 'ICIJ Offshore Leaks',
  id: 'icij-offshore-leaks',
  connectionDetails: {
    host: 'bolt+s://dfcda233a5f385e30fde8485826f0d6f.neo4jsandbox.com:7687',
    id: 'icij-offshore-leaks',
    username: 'neo4j',
    password: 'planes-population-prisms'
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
    host: 'bolt+s://6389e39e757f319f59b5df1c0d6f432e.neo4jsandbox.com:7687',
    id: 'open-street-map',
    username: 'neo4j',
    password: 'colleges-swabs-morale'
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
    host: 'bolt+s://e95af8c8310936d81ab9e36eace2d888.neo4jsandbox.com:7687',
    id: 'contact-tracing',
    username: 'neo4j',
    password: 'prompts-pans-shoes'
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
    host: 'bolt+s://c4e940259c3fdfc1eb794c89ca68c9c4.neo4jsandbox.com:7687',
    id: 'open-street-map',
    username: 'neo4j',
    password: 'turpitude-chairmen-shadow'
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
