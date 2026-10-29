import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the application header', () => {
    render(<App />)
    expect(screen.getByText('Music Man')).toBeInTheDocument()
  })

  it('renders navigation buttons', () => {
    render(<App />)
    expect(screen.getByText('Library')).toBeInTheDocument()
    expect(screen.getByText('Browse')).toBeInTheDocument()
    expect(screen.getByText('Setlists')).toBeInTheDocument()
  })

  it('switches between views', () => {
    render(<App />)
    
    const libraryButton = screen.getByText('Library')
    const browseButton = screen.getByText('Browse')
    const setlistsButton = screen.getByText('Setlists')

    fireEvent.click(browseButton)
    expect(screen.getByText('Browse Songs')).toBeInTheDocument()

    fireEvent.click(setlistsButton)
    expect(screen.getByText('Setlists')).toBeInTheDocument()

    fireEvent.click(libraryButton)
    expect(screen.getByText('Song Library')).toBeInTheDocument()
  })

  it('shows empty state when no songs are imported', () => {
    render(<App />)
    expect(screen.getByText(/No songs imported yet/)).toBeInTheDocument()
  })
})
