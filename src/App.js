import React from 'react'
import styled from 'styled-components'
import { ApolloProvider } from '@apollo/client'

import client from './client'
import CharacterList from './Character/List'
import Filter from './Filter'

const AppWrapper = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const AppHeader = styled.header`
  background-color: #FFF;
  flex: 0 0 auto;
  width: 100%;
`

const AppBody = styled.div`
  margin: 0;
  flex: 1 0 100%;
  color: white;
`

function App () {
  return (
    <ApolloProvider client={client}>
      <AppWrapper>
        <AppHeader data-testid='app-header'>
          <Filter />
        </AppHeader>
        <AppBody>
          <CharacterList />
        </AppBody>
      </AppWrapper>
    </ApolloProvider>
  )
}

export default App
