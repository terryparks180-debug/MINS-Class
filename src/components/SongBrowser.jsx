import { useState } from 'react'
import './SongBrowser.css'

function SongBrowser({ songs, onSelectSong }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="song-browser">
      <div className="browser-header">
        <h2>Browse Songs</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search songs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="browser-content">
        <div className="info-message">
          <p>
            <strong>Note:</strong> The song catalog source has not been decided yet.
            Currently showing only imported songs from your local library.
          </p>
          <p>
            To connect to an external music service (Spotify, YouTube, Apple Music, etc.),
            a product decision is needed from the Client/Analyst.
          </p>
        </div>

        {songs.length === 0 ? (
          <div className="empty-state">
            <p>No songs available. Import songs in the Library first.</p>
          </div>
        ) : (
          <div className="song-grid">
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                className="song-card"
                onClick={() => onSelectSong(song)}
              >
                <div className="song-card-icon">🎵</div>
                <h3>{song.name}</h3>
                <p className="song-card-meta">
                  Tempo: {Math.round(song.tempo * 100)}%
                </p>
              </div>
            ))}
          </div>
        )}

        {searchQuery && filteredSongs.length === 0 && (
          <div className="empty-state">
            <p>No songs match "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SongBrowser
