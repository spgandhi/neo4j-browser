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
    graphValue?: string
    description?: string
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
        text: 'Find the Directors of Tom Hanks Movies',
        graphValue: 'Joins Become Simple',
        description: 'Avoiding 2 extra lookup tables and 5 joins',
        query: `MATCH (tom:Person {name: "Tom Hanks"})-[:ACTED_IN]->(tomHanksMovies)<-[:DIRECTED]-(director)\nRETURN tom, tomHanksMovies, director`
      },
      {
        id: '1',
        text: 'Bacon Number with All the Steps',
        graphValue: 'Graphs Make Paths Useful',
        description: 'Difficult at best without a graphDB',
        query: `MATCH p=shortestPath(\n(bacon:Person {name:"Kevin Bacon"})-[*]-(iceT:Person {name:"Ice-T"})\n)\nRETURN p`
      },
      {
        id: '2',
        text: 'Find the actor/directors with their movies',
        query: `MATCH (directed:Movie)<-[:DIRECTED]-(person:Person)-[:ACTED_IN]->(acted)\nRETURN person, directed, acted`,
        graphValue: 'Complexity Becomes Interesting'
      }
    ]
  },
  {
    title: 'Stack Overflow',
    id: 'stackoverflow2',
    queries: [
      {
        id: '0',
        text: 'Find the Directors of Tom Hanks Movies',
        graphValue: 'People Connected through Questions',
        description:
          'When people are connected through many steps, how do the JOINs look? Instead, visualizing these relationships in data can reveal useful insights, without complex queries',
        query: `MATCH (q:Question)<-[:ASKED]-(u:User)-[:PROVIDED]->(a:Answer)\nRETURN q, u, a LIMIT 10`
      },
      {
        id: '1',
        text: 'Bacon Number with All the Steps',
        graphValue: 'Complexity Becomes Useful',
        description:
          'With many “foreign key” relationships, knowing the data structure is critical and specialized. …but is it necessary?',
        query: `MATCH p=(q:Question {uuid: 65725353})-[]-()\nMATCH (q)<-[]-(answer:Answer)\nMATCH p2=(answer)-[]-()\nRETURN p, p2`
      },
      {
        id: '2',
        text: 'Find the actor/directors with their movies',
        description: 'Spreadsheets, software, or reports? Flatten the result.',
        query: `MATCH (tag:Tag)<-[:TAGGED]-(q:Question)<-[:ANSWERED]-(a:Answer)\nRETURN tag.name, sum(q.view_count) AS views, count(a) AS answers\nORDER BY answers DESC, views DESC`,
        graphValue: 'Gimme a Table'
      },
      {
        id: '3',
        text: 'Find the actor/directors with their movies',
        description:
          'Better ways to understand the data by looking for intermediate relationships. Here, we look at the way tags relate to each other, by connecting any two that share a question.',
        query: `WITH ['neo4j', 'cypher', 'graph-databases'] AS excludeTags\nMATCH (tag1:Tag)<-[:TAGGED]-(q:Question)-[:TAGGED]->(tag2:Tag)\nWHERE tag1.name > tag2.name AND NOT tag1.name IN excludeTags AND NOT tag2.name IN excludeTags\nWITH tag1, tag2, count(q) AS questionCount ORDER BY questionCount DESC LIMIT 100\nRETURN tag1, tag2, apoc.create.vRelationship(tag1, 'RELATES_TO', {name: questionCount}, tag2) AS rel`,
        graphValue: 'Knowledge Domains'
      }
    ]
  },
  {
    title: 'Network Management',
    id: 'network',
    queries: [
      {
        id: '0',
        text: 'Find the Directors of Tom Hanks Movies',
        graphValue: 'Version Management Simplified',
        description:
          'Dependencies across applications will always be a graph. Sure, this can be shoehorned into a list or a rdb and when it must include machines on different versions?',
        query: `MATCH (s:Software)-[:VERSION]->(v)\nOPTIONAL MATCH (s)-[:DEPENDS_ON]->(dv)\nRETURN s, dv, v`
      },
      {
        id: '1',
        text: 'Bacon Number with All the Steps',
        graphValue: 'Network and Software for One Machine',
        description:
          'All the pieces needed for a single machine. How many spreadsheets does this avoid?',
        query: `MATCH net=(m:Machine {name: "DC1-RCK-1-3-M-12"})<-[]-(:Rack)-[:CONTAINS*2]-(:Router)\nMATCH soft=allShortestPaths((m)-[*1..3]-(:Software))\nRETURN net, soft`
      },
      {
        id: '2',
        text: 'Datacenter Network Connectivity',
        description:
          '// Is this even possible with SQL without day(s) of frustration?',
        query: `MATCH path = allShortestPaths( (:Rack)-[:HOLDS|ROUTES|CONNECTS*]-(:Router:Egress) )\nRETURN path`,
        graphValue: 'Datacenter Network Connectivity'
      }
    ]
  }
]

export default {
  allowedDatabases,
  DBCredentials
}
