import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Select } from 'antd'
import styled from 'styled-components'

const GET_LOCATIONS = gql`
  query locations($location: String) {
    locations(page: 0, filter: {name: $location}) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        dimension
        residents {
          id
        }
      }
    }
  }
`

const { Option } = Select

const LocationInput = styled(Select)`
  width: 250px;
`

const DimentionPicker = () => {
  const [value, setValue] = useState([])

  const { refetch, loading, error, data } = useQuery(GET_LOCATIONS)

  const handleSearch = value => {
    if (value) {
      refetch({ location: value })
    } else {
      refetch()
    }
  }

  const handleChange = value => {
    setValue(value)
  }

  const handleSelect = (value, option) => {
    console.info(value, option, data.locations.results.find(location => location.id === value))
  }

  return (
    <LocationInput
      showSearch
      loading={loading}
      mode='multiple'
      value={value}
      placeholder='Search a location'
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      onSelect={handleSelect}
      notFoundContent={null}
    >
      {!loading && !error && data && data.locations.results.map(d => (
        <Option key={d.id}>{d.name}</Option>
      ))}
    </LocationInput>
  )
}

export default DimentionPicker
