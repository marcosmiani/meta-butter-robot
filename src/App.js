import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'

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

const GET_CHARACTERS = gql`
  query charactersSimple {
    characters(page: 1) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
      }
    }
  }
`

function App () {
  const { loading, error, data } = useQuery(GET_CHARACTERS)

  return (
    <AppWrapper>
      <header className='App-header'>
        welcome to..
      </header>
      <div>
        {!loading && !error && data.characters.results.map(character => (
          <div key={character.id}>{character.name}</div>
        ))}
      </div>
    </AppWrapper>
  )
}

export default App
