const DEFAULT_HOST = 'neo4j+s://demo.neo4jlabs.com:7687'
const DEFAULT_AUTHENTICATION_METHOD = 'NATIVE'

const defaultConnectionSetting = {
  host: DEFAULT_HOST,
  authenticationMethod: DEFAULT_AUTHENTICATION_METHOD
}

const moviesDatabase = {
  title: 'Movies Database',
  id: 'movies',
  connectionDetails: {
    ...defaultConnectionSetting,
    id: 'movies',
    username: 'movies',
    password: 'movies',
    db: 'movies',
    requestedUseDb: 'movies'
  }
}

const recommendationDatabase = {
  title: 'Recommendation',
  id: 'recommendation',
  connectionDetails: {
    ...defaultConnectionSetting,
    id: 'movies',
    username: 'movies',
    password: 'movies',
    db: 'movies',
    requestedUseDb: 'movies'
  }
}

export default [moviesDatabase, recommendationDatabase]
