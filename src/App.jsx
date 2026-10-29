import { useState, useEffect } from 'react'
import './App.css'
import AudioPlayer from './components/AudioPlayer'
import SongLibrary from './components/SongLibrary'
import SetlistManager from './components/SetlistManager'
import SongBrowser from './components/SongBrowser'
import Metronome from './components/Metronome'

function App() {
  const [currentView, setCurrentView] = useState('library')
  const [songs, setSongs] = useState([])
  const [currentSong, setCurrentSong] = useState(null)
  const [setlists, setSetlists] = useState([])

  useEffect(() => {
    const savedSongs = localStorage.getItem('musicman-songs')
    if (savedSongs) {
      setSongs(JSON.parse(savedSongs))
    }

    const savedSetlists = localStorage.getItem('musicman-setlists')
    if (savedSetlists) {
      setSetlists(JSON.parse(savedSetlists))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('musicman-songs', JSON.stringify(songs))
  }, [songs])

  useEffect(() => {
    localStorage.setItem('musicman-setlists', JSON.stringify(setlists))
  }, [setlists])

  const handleImportSong = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const newSong = {
        id: Date.now().toString(),
        name: file.name.replace(/\.[^/.]+$/, ''),
        file: file,
        audioData: e.target.result,
        tempo: 1.0,
        loopStart: null,
        loopEnd: null,
        loopEnabled: false,
        createdAt: new Date().toISOString()
      }
      setSongs([...songs, newSong])
    }
    reader.readAsDataURL(file)
  }

  const handleUpdateSong = (songId, updates) => {
    setSongs(songs.map(song => 
      song.id === songId ? { ...song, ...updates } : song
    ))
    if (currentSong && currentSong.id === songId) {
      setCurrentSong({ ...currentSong, ...updates })
    }
  }

  const handleDeleteSong = (songId) => {
    setSongs(songs.filter(song => song.id !== songId))
    if (currentSong && currentSong.id === songId) {
      setCurrentSong(null)
    }
  }

  const handleCreateSetlist = (name) => {
    const newSetlist = {
      id: Date.now().toString(),
      name,
      songs: [],
      createdAt: new Date().toISOString()
    }
    setSetlists([...setlists, newSetlist])
  }

  const handleUpdateSetlist = (setlistId, updates) => {
    setSetlists(setlists.map(setlist =>
      setlist.id === setlistId ? { ...setlist, ...updates } : setlist
    ))
  }

  const handleDeleteSetlist = (setlistId) => {
    setSetlists(setlists.filter(setlist => setlist.id !== setlistId))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Music Man</h1>
        <nav className="app-nav">
          <button 
            className={currentView === 'library' ? 'active' : ''}
            onClick={() => setCurrentView('library')}
          >
            Library
          </button>
          <button 
            className={currentView === 'browse' ? 'active' : ''}
            onClick={() => setCurrentView('browse')}
          >
            Browse
          </button>
          <button 
            className={currentView === 'setlists' ? 'active' : ''}
            onClick={() => setCurrentView('setlists')}
          >
            Setlists
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentView === 'library' && (
          <SongLibrary
            songs={songs}
            currentSong={currentSong}
            onImportSong={handleImportSong}
            onSelectSong={setCurrentSong}
            onUpdateSong={handleUpdateSong}
            onDeleteSong={handleDeleteSong}
          />
        )}

        {currentView === 'browse' && (
          <SongBrowser
            songs={songs}
            onSelectSong={setCurrentSong}
          />
        )}

        {currentView === 'setlists' && (
          <SetlistManager
            setlists={setlists}
            songs={songs}
            onCreateSetlist={handleCreateSetlist}
            onUpdateSetlist={handleUpdateSetlist}
            onDeleteSetlist={handleDeleteSetlist}
            onSelectSong={setCurrentSong}
          />
        )}
      </main>

      {currentSong && (
        <AudioPlayer
          song={currentSong}
          onUpdateSong={handleUpdateSong}
        />
      )}

      <Metronome />
    </div>
  )
}

export default App
