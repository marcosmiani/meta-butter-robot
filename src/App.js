import React from 'react'
import styled from 'styled-components'
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
    <AppWrapper>
      <AppHeader data-testid='app-header'>
        <Filter />
      </AppHeader>
      <AppBody>
        <CharacterList />
      </AppBody>
    </AppWrapper>
  )
}

export default App
