import React from 'react'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'
import { Row, Button, Col, Modal, Spin, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import EpisodeList from './Episodes'

export const GET_CHARACTER_BY_ID = gql`
  query getOneCharacter($id: ID!) {
    character(id: $id){
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
        type
        dimension
        created
      }
      location {
        id
        name
        type
        dimension
        created
      }
      image
      episode {
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

const CharactersBody = styled(Row)`
  min-height: 50vh;
  min-width: 50vw;
  overflow: hidden auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

const CharactersData = ({ character }) => (
  <Col>
    <Row>
      <Col xs={24} md={12}>
        <img
          alt={character?.name}
          src={character?.image}
        />
      </Col>
      <Col xs={24} md={12}>
        <PropertyTitle level={3}>
          {character?.name}
        </PropertyTitle>
        <CharacterProperty label='Species' value={character?.species} />
        <CharacterProperty label='Gender' value={character?.gender} />
        <CharacterProperty label='Status' value={character?.status} />
        <Row>
          <CharacterProperty
            label='Origin'
            value={character?.origin?.name}
          />
          <CharacterProperty
            label='Origin Dimension'
            value={character?.origin?.dimension || 'unknown'}
          />
        </Row>
        <Row>
          <CharacterProperty
            label='Location'
            value={character?.location?.name}
          />
          <CharacterProperty
            label='Loc. Dimension'
            value={character?.location?.dimension || 'unknown'}
          />
        </Row>
      </Col>
    </Row>
    <PropertyTitle level={4}>
      Episodes
    </PropertyTitle>
    <EpisodeList episodes={character?.episode || []} />
  </Col>
)

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

const PropertyTitle = styled(Typography.Title)`
  margin: 8px 0;
`

const PropertyText = styled(Typography.Text)`
  min-width: 120px;
  display: inline-block;
  text-align: left;
  padding-right: 4px;
`

const PropertyLabel = styled(PropertyText)`
  min-width: 80px;
`

const CharacterProperty = ({ label, value }) => (
  <Typography.Paragraph>
    <PropertyLabel>
      {label}
    </PropertyLabel>
    <PropertyText code>
      {value}
    </PropertyText>
  </Typography.Paragraph>
)

const CharacterDetail = ({ id, onClose }) => {
  const { loading, error, data } = useQuery(
    GET_CHARACTER_BY_ID,
    {
      variables: { id },
      skip: !id
    }
  )

  return (
    <Modal
      visible={id}
      centered
      width='90%'
      onOk={() => onClose(false)}
      onCancel={() => onClose(false)}
      footer={[
        <Button key='back' onClick={onClose}>
          Close
        </Button>
      ]}
    >
      <CharactersBody
        justify='center'
        wrap
      >
        {!loading && !error && (
          <CharactersData character={data?.character} />
        )}
        {loading && (<Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />)}
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
      </CharactersBody>
    </Modal>
  )
}

export default CharacterDetail
