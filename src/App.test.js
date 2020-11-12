import { render, screen } from '@testing-library/react'
import App from './App'

test('renders elements correctly', () => {
  render(<App />)
  const headerElement = screen.getByTestId(/app-header/i)
  expect(headerElement).toBeInTheDocument()
})
