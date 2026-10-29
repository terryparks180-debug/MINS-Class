import { useState } from 'react'
import './SetlistManager.css'

function SetlistManager({ setlists, songs, onCreateSetlist, onUpdateSetlist, onDeleteSetlist, onSelectSong }) {
  const [selectedSetlist, setSelectedSetlist] = useState(null)
  const [newSetlistName, setNewSetlistName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateSetlist = (e) => {
    e.preventDefault()
    if (newSetlistName.trim()) {
      onCreateSetlist(newSetlistName.trim())
      setNewSetlistName('')
      setIsCreating(false)
    }
  }

  const handleAddSongToSetlist = (songId) => {
    if (!selectedSetlist) return
    
    const song = songs.find(s => s.id === songId)
    if (song && !selectedSetlist.songs.includes(songId)) {
      onUpdateSetlist(selectedSetlist.id, {
        songs: [...selectedSetlist.songs, songId]
      })
    }
  }

  const handleRemoveSongFromSetlist = (songId) => {
    if (!selectedSetlist) return
    
    onUpdateSetlist(selectedSetlist.id, {
      songs: selectedSetlist.songs.filter(id => id !== songId)
    })
  }

  const handleMoveSong = (fromIndex, toIndex) => {
    if (!selectedSetlist) return
    
    const newSongs = [...selectedSetlist.songs]
    const [movedSong] = newSongs.splice(fromIndex, 1)
    newSongs.splice(toIndex, 0, movedSong)
    
    onUpdateSetlist(selectedSetlist.id, { songs: newSongs })
  }

  const handlePlaySongInSetlist = (songId) => {
    const song = songs.find(s => s.id === songId)
    if (song) {
      onSelectSong(song)
    }
  }

  const handlePlayNext = () => {
    if (!selectedSetlist || !selectedSetlist.songs.length) return
    
    // For now, just play the first song if none is playing, or the next one
    // The actual "current song" tracking would need to be passed from parent
    const nextIndex = 0
    if (nextIndex < selectedSetlist.songs.length) {
      handlePlaySongInSetlist(selectedSetlist.songs[nextIndex])
    }
  }

  return (
    <div className="setlist-manager">
      <div className="setlist-manager-header">
        <h2>Setlists</h2>
        {!isCreating ? (
          <button onClick={() => setIsCreating(true)} className="create-button">
            + New Setlist
          </button>
        ) : (
          <form onSubmit={handleCreateSetlist} className="create-form">
            <input
              type="text"
              value={newSetlistName}
              onChange={(e) => setNewSetlistName(e.target.value)}
              placeholder="Setlist name"
              autoFocus
            />
            <button type="submit">Create</button>
            <button type="button" onClick={() => setIsCreating(false)}>Cancel</button>
          </form>
        )}
      </div>

      <div className="setlist-manager-content">
        <div className="setlist-list">
          {setlists.length === 0 ? (
            <p className="empty-state">No setlists created yet.</p>
          ) : (
            setlists.map((setlist) => (
              <div
                key={setlist.id}
                className={`setlist-item ${selectedSetlist?.id === setlist.id ? 'active' : ''}`}
                onClick={() => setSelectedSetlist(setlist)}
              >
                <div className="setlist-info">
                  <h3>{setlist.name}</h3>
                  <p>{setlist.songs.length} songs</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm('Delete this setlist?')) {
                      onDeleteSetlist(setlist.id)
                      if (selectedSetlist?.id === setlist.id) {
                        setSelectedSetlist(null)
                      }
                    }
                  }}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {selectedSetlist && (
          <div className="setlist-detail">
            <div className="setlist-detail-header">
              <h3>{selectedSetlist.name}</h3>
              <button onClick={handlePlayNext} className="next-button">
                Play Next Song
              </button>
            </div>

            <div className="setlist-songs">
              {selectedSetlist.songs.length === 0 ? (
                <p className="empty-state">No songs in this setlist.</p>
              ) : (
                selectedSetlist.songs.map((songId, index) => {
                  const song = songs.find(s => s.id === songId)
                  if (!song) return null
                  
                  return (
                    <div key={songId} className="setlist-song-item">
                      <div className="song-order">
                        <span>{index + 1}</span>
                        {index > 0 && (
                          <button onClick={() => handleMoveSong(index, index - 1)} className="move-button">
                            ↑
                          </button>
                        )}
                        {index < selectedSetlist.songs.length - 1 && (
                          <button onClick={() => handleMoveSong(index, index + 1)} className="move-button">
                            ↓
                          </button>
                        )}
                      </div>
                      <div className="song-info">
                        <h4>{song.name}</h4>
                      </div>
                      <div className="song-actions">
                        <button onClick={() => handlePlaySongInSetlist(songId)}>
                          Play
                        </button>
                        <button
                          onClick={() => handleRemoveSongFromSetlist(songId)}
                          className="remove-button"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className="add-songs-section">
              <h4>Add Songs</h4>
              {songs.length === 0 ? (
                <p className="empty-state">No songs available. Import songs in the Library first.</p>
              ) : (
                <div className="available-songs">
                  {songs
                    .filter(song => !selectedSetlist.songs.includes(song.id))
                    .map(song => (
                      <div key={song.id} className="available-song-item">
                        <span>{song.name}</span>
                        <button onClick={() => handleAddSongToSetlist(song.id)}>
                          Add
                        </button>
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SetlistManager
