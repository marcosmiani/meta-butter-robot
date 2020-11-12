import * as React from 'react'
import { List, Avatar } from 'antd'
// import CharacterCard from './Card'
import { useQuery, gql } from '@apollo/client'

const GET_CHARACTERS = gql`
  query charactersSimple {
    characters(page: 1) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        species
        status
        origin {
          dimension
        }
        location {
          dimension
        }
      }
    }
  }
`

const CharacterList = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS)

  return (
    <List
      itemLayout='horizontal'
      dataSource={!loading && !error ? (data?.characters?.results || []) : []}
      loading={loading}
      size={20}
      pagination='bottom'
      renderItem={({ name, image, origin, location, species, status }) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={image} size='large' />}
            title={name}
            description={`${origin.dimension} ${location.dimension} ${species} ${status}`}
          />
        </List.Item>
      )}
    />
  )
}

export default CharacterList
