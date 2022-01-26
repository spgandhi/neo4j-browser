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
    host: 'bolt+s://6b4fbb179a11540e48b4e77537bc07c9.neo4jsandbox.com:7687',
    id: 'movies',
    username: 'neo4j',
    password: 'car-passage-tills'
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
    host: 'bolt+s://d81ef4d4927024a3c8001bcc97b7a8e7.neo4jsandbox.com:7687',
    id: 'crime',
    username: 'neo4j',
    password: 'teams-bays-ingredients'
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
    host: 'bolt+s://bacd1c08b07979b20f4dd978c615e54b.neo4jsandbox.com:7687',
    id: 'open-street-map',
    username: 'neo4j',
    password: 'air-fuels-cups'
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
    host: 'bolt+s://1d06b62ce9bc4734735e6cd0e573cae6.neo4jsandbox.com:7687',
    id: 'contact-tracing',
    username: 'neo4j',
    password: 'jug-strain-eves'
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
    host: 'bolt+s://bcc26d9974116d4aaef4dbbc6392e402.neo4jsandbox.com:7687',
    id: 'open-street-map',
    username: 'neo4j',
    password: 'pints-circuitry-professionalism'
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
