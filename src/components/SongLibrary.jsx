import { useRef } from 'react'
import './SongLibrary.css'

function SongLibrary({ songs, currentSong, onImportSong, onSelectSong, onUpdateSong, onDeleteSong }) {
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      onImportSong(file)
    }
    e.target.value = ''
  }

  const handleImportClick = () => {
    fileInputRef.current.click()
  }

  const handleShareSong = (song) => {
    const shareData = {
      name: song.name,
      tempo: song.tempo,
      loopStart: song.loopStart,
      loopEnd: song.loopEnd,
      loopEnabled: song.loopEnabled
    }
    
    const shareString = JSON.stringify(shareData, null, 2)
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareString)
        .then(() => {
          alert('Song configuration copied to clipboard!')
        })
        .catch(() => {
          alert('Failed to copy to clipboard')
        })
    } else {
      alert('Clipboard not available in this browser')
    }
  }

  return (
    <div className="song-library">
      <div className="library-header">
        <h2>Song Library</h2>
        <button onClick={handleImportClick} className="import-button">
          Import Audio
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {songs.length === 0 ? (
        <div className="empty-state">
          <p>No songs imported yet. Click "Import Audio" to add your first song.</p>
        </div>
      ) : (
        <div className="song-list">
          {songs.map((song) => (
            <div
              key={song.id}
              className={`song-item ${currentSong?.id === song.id ? 'active' : ''}`}
            >
              <div className="song-info">
                <h3>{song.name}</h3>
                <p className="song-meta">
                  Tempo: {Math.round(song.tempo * 100)}%
                  {song.loopEnabled && (
                    <span> | Loop: {song.loopStart?.toFixed(1)}s - {song.loopEnd?.toFixed(1)}s</span>
                  )}
                </p>
              </div>
              <div className="song-actions">
                <button onClick={() => onSelectSong(song)}>
                  {currentSong?.id === song.id ? 'Playing' : 'Select'}
                </button>
                <button onClick={() => handleShareSong(song)} className="share-button">
                  Share Config
                </button>
                <button onClick={() => onDeleteSong(song.id)} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SongLibrary
