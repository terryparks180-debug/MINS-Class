import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SongLibrary from '../components/SongLibrary'

describe('SongLibrary', () => {
  const mockSongs = [
    {
      id: '1',
      name: 'Test Song',
      tempo: 1.0,
      loopEnabled: false,
      loopStart: null,
      loopEnd: null
    }
  ]

  const mockProps = {
    songs: mockSongs,
    currentSong: null,
    onImportSong: vi.fn(),
    onSelectSong: vi.fn(),
    onUpdateSong: vi.fn(),
    onDeleteSong: vi.fn()
  }

  it('renders song library header', () => {
    render(<SongLibrary {...mockProps} />)
    expect(screen.getByText('Song Library')).toBeInTheDocument()
  })

  it('renders import button', () => {
    render(<SongLibrary {...mockProps} />)
    expect(screen.getByText('Import Audio')).toBeInTheDocument()
  })

  it('shows empty state when no songs', () => {
    render(<SongLibrary {...mockProps} songs={[]} />)
    expect(screen.getByText(/No songs imported yet/)).toBeInTheDocument()
  })

  it('renders song items when songs exist', () => {
    render(<SongLibrary {...mockProps} />)
    expect(screen.getByText('Test Song')).toBeInTheDocument()
  })

  it('calls onSelectSong when select button is clicked', () => {
    render(<SongLibrary {...mockProps} />)
    const selectButton = screen.getByText('Select')
    fireEvent.click(selectButton)
    expect(mockProps.onSelectSong).toHaveBeenCalledWith(mockSongs[0])
  })
})
