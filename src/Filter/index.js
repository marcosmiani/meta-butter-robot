import React from 'react'
import Search from './Search'
import { Radio } from 'antd'
import styled from 'styled-components'
import { useReactiveVar } from '@apollo/client'
import {
  searchTypeVar,
  charactersVar,
  SEARCH_TYPES
} from '../client'

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 16px;
`

const Filter = () => {
  const type = useReactiveVar(searchTypeVar)

  return (
    <FilterWrapper>
      <Radio.Group onChange={e => searchTypeVar(e.target.value)} defaultValue={type}>
        <Radio.Button value={SEARCH_TYPES.DIMENSION}>Dimension</Radio.Button>
        <Radio.Button value={SEARCH_TYPES.LOCATION}>Location</Radio.Button>
        <Radio.Button value={SEARCH_TYPES.EPISODE}>Episode</Radio.Button>
      </Radio.Group>
      <Search
        type={type}
        onSelect={characters => {
          charactersVar[type](characters)
        }}
      />
    </FilterWrapper>
  )
}

export default Filter
