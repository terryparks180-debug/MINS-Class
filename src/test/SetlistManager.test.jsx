import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SetlistManager from '../components/SetlistManager'

describe('SetlistManager', () => {
  const mockProps = {
    setlists: [],
    songs: [],
    onCreateSetlist: vi.fn(),
    onUpdateSetlist: vi.fn(),
    onDeleteSetlist: vi.fn(),
    onSelectSong: vi.fn()
  }

  it('renders setlist manager header', () => {
    render(<SetlistManager {...mockProps} />)
    expect(screen.getByText('Setlists')).toBeInTheDocument()
  })

  it('shows create button', () => {
    render(<SetlistManager {...mockProps} />)
    expect(screen.getByText('+ New Setlist')).toBeInTheDocument()
  })

  it('shows empty state when no setlists', () => {
    render(<SetlistManager {...mockProps} />)
    expect(screen.getByText(/No setlists created yet/)).toBeInTheDocument()
  })

  it('opens create form when create button is clicked', () => {
    render(<SetlistManager {...mockProps} />)
    const createButton = screen.getByText('+ New Setlist')
    fireEvent.click(createButton)
    expect(screen.getByPlaceholderText('Setlist name')).toBeInTheDocument()
  })
})
