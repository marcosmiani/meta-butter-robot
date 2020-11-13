import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client'

export const SEARCH_TYPES = {
  DIMENSION: 'dimension',
  LOCATION: 'location',
  EPISODE: 'episode'
}

export const searchTypeVar = makeVar(SEARCH_TYPES.DIMENSION)

const dimensionCharactersVar = makeVar([])
const locationCharactersVar = makeVar([])
const episodeCharactersVar = makeVar([])

export const charactersVar = {
  [SEARCH_TYPES.DIMENSION]: dimensionCharactersVar,
  [SEARCH_TYPES.LOCATION]: locationCharactersVar,
  [SEARCH_TYPES.EPISODE]: episodeCharactersVar
}

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
  cache: new InMemoryCache()
})

export default client
