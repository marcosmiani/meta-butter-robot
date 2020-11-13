import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Select } from 'antd'
import styled from 'styled-components'

import {
  SEARCH_TYPES
} from '../client'

const GET_LOCATIONS = gql`
  query locations($search: String) {
    locations(page: 1, filter: {name: $search}) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        residents {
          id
        }
      }
    }
  }
`

const GET_DIMENSIONS = gql`
  query dimensions($search: String) {
    locations(page: 1, filter: {dimension: $search}) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        dimension
        residents {
          id
        }
      }
    }
  }
`

const GET_EPISODES = gql`
  query episodes($search: String) {
    episodes(page: 1, filter: {name: $search}) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        characters {
          id
        }
      }
    }
  }
`

const { Option } = Select

const SearchInput = styled(Select)`
  width: 100%;
  margin-top: 16px;
`

const byUnique = (acc, curr) => {
  if (!acc.find(item => item.value === curr.value)) {
    acc.push(curr)
  }
  return acc
}

const DimentionPicker = ({ type, onSelect }) => {
  const QUERY_MAP = {
    [SEARCH_TYPES.DIMENSION]: GET_DIMENSIONS,
    [SEARCH_TYPES.LOCATION]: GET_LOCATIONS,
    [SEARCH_TYPES.EPISODE]: GET_EPISODES
  }

  const STATUS_MAP = {
    [SEARCH_TYPES.DIMENSION]: useState(''),
    [SEARCH_TYPES.LOCATION]: useState(''),
    [SEARCH_TYPES.EPISODE]: useState('')
  }

  const { refetch, loading, error, data } = useQuery(QUERY_MAP[type])
  const [value, setValue] = STATUS_MAP[type]

  useEffect(() => {
    // Update the document title using the browser API
    // setValue('')
    refetch && refetch({ search: value })
  }, [type])

  const handleSearch = value => {
    if (value) {
      refetch({ search: value })
    } else {
      refetch()
    }
  }

  const handleChange = value => {
    setValue(value)
  }

  const handleSelect = (value, option) => {
    const searchValue = RegExp(value, 'gi')
    const selected = (data?.locations?.results || data?.episodes?.results || [])
      .reduce(
        (acc, curr) => {
          if (searchValue.test(curr.name || curr.dimension)) {
            const characters = (curr.characters || curr.residents)
            characters.forEach(character => character.id && acc.add(character.id))
          }
          return acc
        },
        new Set()
      )

    onSelect([...selected])
  }

  const options = !loading &&
     !error &&
     (data?.locations?.results || data?.episodes?.results || [])
       .map(result => ({
         key: result.id,
         value: result.name || result.dimension
       }))
       .reduce(byUnique, [])

  return (
    <SearchInput
      value={value}
      onSelect={handleSelect}
      onSearch={handleSearch}
      onChange={handleChange}
      showSearch
      placeholder='Search here'
      defaultActiveFirstOption={false}
      allowClear
      showArrow={false}
      filterOption={false}
      notFoundContent={null}
    >
      {(options || []).map(d => <Option key={d.value}>{d.value}</Option>)}
    </SearchInput>
  )
}

export default DimentionPicker
