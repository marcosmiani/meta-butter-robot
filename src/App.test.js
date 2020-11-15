import { render, screen } from '@testing-library/react'
import App from './App'

test('renders elements correctly', () => {
  render(<App />)
  const headerElement = screen.getByTestId(/app-header/i)
  expect(headerElement).toBeInTheDocument()

  const episodeOptionElement = screen.getByTestId(/search-episode-option/i)
  expect(episodeOptionElement).toBeInTheDocument()
  const dimensionOptionElement = screen.getByTestId(/search-dimension-option/i)
  expect(dimensionOptionElement).toBeInTheDocument()
  const locationOptionElement = screen.getByTestId(/search-location-option/i)
  expect(locationOptionElement).toBeInTheDocument()

  const searchElement = screen.getByTestId(/search-input/i)
  expect(searchElement).toBeInTheDocument()

  const messageElement = screen.getByTestId(/butter-robot-message/i)
  expect(messageElement).toBeInTheDocument()
})
