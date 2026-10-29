import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SongBrowser from '../components/SongBrowser'

describe('SongBrowser', () => {
  const mockSongs = [
    {
      id: '1',
      name: 'Test Song',
      tempo: 1.0
    }
  ]

  const mockProps = {
    songs: mockSongs,
    onSelectSong: vi.fn()
  }

  it('renders browser header', () => {
    render(<SongBrowser {...mockProps} />)
    expect(screen.getByText('Browse Songs')).toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<SongBrowser {...mockProps} />)
    expect(screen.getByPlaceholderText('Search songs...')).toBeInTheDocument()
  })

  it('shows info message about song source', () => {
    render(<SongBrowser {...mockProps} />)
    expect(screen.getByText(/song catalog source has not been decided/)).toBeInTheDocument()
  })

  it('filters songs based on search query', () => {
    render(<SongBrowser {...mockProps} />)
    const searchInput = screen.getByPlaceholderText('Search songs...')
    fireEvent.change(searchInput, { target: { value: 'Test' } })
    expect(screen.getByText('Test Song')).toBeInTheDocument()
  })

  it('shows no results message when search matches nothing', () => {
    render(<SongBrowser {...mockProps} />)
    const searchInput = screen.getByPlaceholderText('Search songs...')
    fireEvent.change(searchInput, { target: { value: 'NonExistent' } })
    expect(screen.getByText(/No songs match/)).toBeInTheDocument()
  })
})
