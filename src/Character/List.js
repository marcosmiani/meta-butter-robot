import * as React from 'react'
import { List } from 'antd'
// import CharacterCard from './Card'
import { useQuery, gql, useReactiveVar } from '@apollo/client'
import { searchTypeVar, charactersVar } from '../client'
import CharacterCard from './Card'

export const GET_CHARACTERS_BY_IDS = gql`
  query charactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids){
      id
      name
      status
      species
      type
      gender
      origin{
        id
        name
        type
        dimension
        created
      }
      location{
        id
        name
        type
        dimension
        created
      }
      image
      episode{
        id
        name
        air_date
        episode
        created
      }
      created
    }
  }
`

const CharacterList = () => {
  const type = useReactiveVar(searchTypeVar)
  const characters = useReactiveVar(charactersVar[type])

  const { loading, error, data } = useQuery(
    GET_CHARACTERS_BY_IDS,
    {
      variables: { ids: characters },
      skip: !characters.length
    }
  )

  return (
    <List
      itemLayout='horizontal'
      dataSource={!loading && !error ? (data?.charactersByIds || []) : []}
      loading={loading}
      size={20}
      pagination='bottom'
      renderItem={(character) => (
        <CharacterCard {...character} />
      )}
    />
  )
}

export default CharacterList
