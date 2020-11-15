import React from 'react'
import Search from './Search'
import { Radio, Row, Col } from 'antd'
import styled from 'styled-components'
import { useReactiveVar } from '@apollo/client'
import {
  searchTypeVar,
  charactersVar,
  SEARCH_TYPES
} from '../client'

const FilterRow = styled(Row)`
  margin: 16px;
`

const FilterColumn = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Filter = () => {
  const type = useReactiveVar(searchTypeVar)

  return (
    <FilterRow justify='center' align='center'>
      <FilterColumn xs={{ span: 24 }} sm={{ span: 10 }} md={{ span: 8, offset: 2 }}>
        <Radio.Group
          onChange={e => searchTypeVar(e.target.value)} defaultValue={type}
        >
          <Radio.Button data-testid='search-dimension-option' value={SEARCH_TYPES.DIMENSION}>Dimension</Radio.Button>
          <Radio.Button data-testid='search-location-option' value={SEARCH_TYPES.LOCATION}>Location</Radio.Button>
          <Radio.Button data-testid='search-episode-option' value={SEARCH_TYPES.EPISODE}>Episode</Radio.Button>
        </Radio.Group>
      </FilterColumn>
      <FilterColumn xs={{ span: 24 }} sm={{ span: 14 }} md={{ span: 8, offset: 0 }}>
        <Search
          type={type}
          onSelect={characters => {
            charactersVar[type](characters)
          }}
        />
      </FilterColumn>
    </FilterRow>
  )
}

export default Filter
