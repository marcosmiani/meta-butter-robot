import React, { useState } from 'react'
import { useQuery, gql, useReactiveVar } from '@apollo/client'
import styled from 'styled-components'
import { Row, Col, Spin, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { searchTypeVar, charactersVar } from '../client'
import CharacterCard from './Card'
import Detail from './Detail'

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
    }
  }
`

const CharactersRow = styled(Row)`
  max-height: calc(100vh - 120px);
  height: calc(100vh - 120px);
  width: 100%;
  overflow: hidden auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FilterColumn = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`

const Chat = styled(Typography.Paragraph)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`

const Message = styled(Typography.Text)`
  color: white;
  font-size: 16px;
`

const CharacterList = () => {
  const [characterDetailId, setCharacterDetail] = useState(null)

  const type = useReactiveVar(searchTypeVar)
  const charactersIds = useReactiveVar(charactersVar[type])
  const skip = !charactersIds.length

  const { loading, error, data } = useQuery(
    GET_CHARACTERS_BY_IDS,
    {
      variables: { ids: charactersIds },
      skip
    }
  )

  const characters = !loading && !error ? (data?.charactersByIds || []) : []

  return (
    <CharactersRow
      justify='center'
      wrap
    >
      {loading && (<Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />)}
      {characters.map(character => (
        <FilterColumn key={character.id}>
          <CharacterCard {...character} onSelect={setCharacterDetail} />
        </FilterColumn>
      ))}
      {skip && (
        <EmptyMessage data-testid='butter-robot-message'>
          <img
            width={200}
            alt='ButterRobot'
            src={`${process.env.PUBLIC_URL}/Butter_Robot.png`}
          />
          <Chat>
            <Message code>What is my purpose?</Message>
            <Message>You pass butter</Message>
            <Message>...</Message>
            <Message code>What is my purpose?</Message>
            <Message>You pass butter</Message>
            <Message code>Oh my god...</Message>
            <Message>Yeah, welcome to the club, pal</Message>
          </Chat>
        </EmptyMessage>
      )}
      {error && (
        <EmptyMessage>
          <img
            width={200}
            alt='OH geez oh man'
            src='/OH_geez_oh_man.png'
          />
          <Chat>
            <Message code>Something went horribly wrong, please try again?</Message>
          </Chat>
        </EmptyMessage>
      )}
      <Detail
        id={characterDetailId}
        onClose={() => setCharacterDetail(false)}
      />
    </CharactersRow>
  )
}

export default CharacterList
