import * as React from 'react'
import styled from 'styled-components'
import { List, Avatar } from 'antd'

const Character = styled(List.Item)`
  width: 350px;
  margin: 16px;
`

const CharacterCard = ({ name, image, origin, location, species, status }) => {
  return (
    <Character>
      <List.Item.Meta
        avatar={<Avatar src={image} size='large' />}
        title={name}
        description={`${origin.dimension} ${location.dimension} ${species} ${status}`}
      />
    </Character>
  )
}

export default CharacterCard
