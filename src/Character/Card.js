import * as React from 'react'
import styled from 'styled-components'
import { List, Card } from 'antd'

const { Meta } = Card

const Character = styled(List.Item)`
  min-width: 250px;
  margin: 16px;
`

const CharacterCard = ({ id, name, image, origin, location, species, status, onSelect }) => {
  return (
    <Character>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={name} src={image} />}
        onClick={() => onSelect(id)}
      >
        <Meta
          title={name}
          description={`${location.dimension} ${species} ${status}`}
        />
      </Card>
    </Character>
  )
}

export default CharacterCard
