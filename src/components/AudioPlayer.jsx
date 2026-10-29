import { useState, useEffect, useRef, useCallback } from 'react'
import './AudioPlayer.css'

function AudioPlayer({ song, onUpdateSong }) {
  const audioContextRef = useRef(null)
  const audioBufferRef = useRef(null)
  const sourceNodeRef = useRef(null)
  const playbackRateRef = useRef(1.0)
  const startTimeRef = useRef(0)
  const pauseTimeRef = useRef(0)
  const loopTimeoutRef = useRef(null)
  const countIntervalRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [countIn, setCountIn] = useState(4)
  const [isCountingIn, setIsCountingIn] = useState(false)
  const [countDisplay, setCountDisplay] = useState('')

  const initAudioContext = useCallback(async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume()
    }
  }, [])

  const loadAudio = useCallback(async () => {
    await initAudioContext()
    
    if (song.audioData && !audioBufferRef.current) {
      const response = await fetch(song.audioData)
      const arrayBuffer = await response.arrayBuffer()
      audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer)
      setDuration(audioBufferRef.current.duration)
    }
  }, [song.audioData, initAudioContext])

  useEffect(() => {
    loadAudio()
    return () => {
      stopPlayback()
    }
  }, [loadAudio])

  const stopPlayback = useCallback(() => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop()
      } catch (e) {
        // Ignore if already stopped
      }
      sourceNodeRef.current = null
    }
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current)
      loopTimeoutRef.current = null
    }
    if (countIntervalRef.current) {
      clearInterval(countIntervalRef.current)
      countIntervalRef.current = null
    }
    setIsCountingIn(false)
    setCountDisplay('')
  }, [])

  const playAudio = useCallback((startTime = 0) => {
    if (!audioBufferRef.current || !audioContextRef.current) return

    stopPlayback()

    const source = audioContextRef.current.createBufferSource()
    source.buffer = audioBufferRef.current
    source.playbackRate.value = song.tempo
    sourceNodeRef.current = source

    source.connect(audioContextRef.current.destination)

    const actualStartTime = startTime || (pauseTimeRef.current || 0)
    const endTime = song.loopEnabled && song.loopEnd ? song.loopEnd : audioBufferRef.current.duration

    source.start(0, actualStartTime, endTime - actualStartTime)
    startTimeRef.current = audioContextRef.current.currentTime - actualStartTime / song.tempo
    pauseTimeRef.current = actualStartTime

    source.onended = () => {
      if (song.loopEnabled && song.loopStart !== null && song.loopEnd !== null) {
        loopTimeoutRef.current = setTimeout(() => {
          playAudio(song.loopStart)
        }, 50)
      } else {
        setIsPlaying(false)
        pauseTimeRef.current = 0
      }
    }

    setIsPlaying(true)
  }, [song, stopPlayback])

  const handlePlayPause = useCallback(async () => {
    await initAudioContext()
    await loadAudio()

    if (isPlaying) {
      stopPlayback()
      pauseTimeRef.current = getCurrentTime()
      setIsPlaying(false)
    } else {
      if (countIn > 0 && pauseTimeRef.current === 0) {
        setIsCountingIn(true)
        let count = countIn
        setCountDisplay(count.toString())
        
        countIntervalRef.current = setInterval(() => {
          count -= 1
          if (count > 0) {
            setCountDisplay(count.toString())
          } else {
            clearInterval(countIntervalRef.current)
            setIsCountingIn(false)
            setCountDisplay('')
            playAudio()
          }
        }, 60000 / (120 * 2)) // Assuming 120 BPM for count-in
      } else {
        playAudio()
      }
    }
  }, [isPlaying, countIn, initAudioContext, loadAudio, playAudio, stopPlayback])

  const handleStop = useCallback(() => {
    stopPlayback()
    pauseTimeRef.current = 0
    setIsPlaying(false)
    setCurrentTime(0)
  }, [stopPlayback])

  const getCurrentTime = useCallback(() => {
    if (!audioContextRef.current || !startTimeRef.current) return 0
    return (audioContextRef.current.currentTime - startTimeRef.current) * song.tempo
  }, [song.tempo])

  useEffect(() => {
    let animationFrame
    
    const updateTime = () => {
      if (isPlaying) {
        setCurrentTime(getCurrentTime())
        animationFrame = requestAnimationFrame(updateTime)
      }
    }

    if (isPlaying) {
      animationFrame = requestAnimationFrame(updateTime)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isPlaying, getCurrentTime])

  const handleTempoChange = (newTempo) => {
    onUpdateSong(song.id, { tempo: parseFloat(newTempo) })
    if (sourceNodeRef.current) {
      sourceNodeRef.current.playbackRate.value = parseFloat(newTempo)
    }
  }

  const handleLoopToggle = () => {
    const newLoopEnabled = !song.loopEnabled
    onUpdateSong(song.id, { loopEnabled: newLoopEnabled })
    if (!newLoopEnabled) {
      stopPlayback()
      playAudio(pauseTimeRef.current)
    }
  }

  const handleLoopStartChange = (time) => {
    onUpdateSong(song.id, { loopStart: parseFloat(time) })
  }

  const handleLoopEndChange = (time) => {
    onUpdateSong(song.id, { loopEnd: parseFloat(time) })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value)
    pauseTimeRef.current = newTime
    setCurrentTime(newTime)
    if (isPlaying) {
      playAudio(newTime)
    }
  }

  return (
    <div className="audio-player">
      <div className="player-header">
        <h2>{song.name}</h2>
        {isCountingIn && (
          <div className="count-in-display">{countDisplay}</div>
        )}
      </div>

      <div className="player-controls">
        <button onClick={handleStop} className="stop-button">Stop</button>
        <button onClick={handlePlayPause} className="play-button">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      <div className="time-display">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="seek-bar"
        />
        <span>{formatTime(duration)}</span>
      </div>

      <div className="tempo-control">
        <label>
          Tempo: {Math.round(song.tempo * 100)}%
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.05"
            value={song.tempo}
            onChange={(e) => handleTempoChange(e.target.value)}
          />
        </label>
      </div>

      <div className="loop-control">
        <label>
          <input
            type="checkbox"
            checked={song.loopEnabled}
            onChange={handleLoopToggle}
          />
          Enable Loop
        </label>
        {song.loopEnabled && (
          <div className="loop-points">
            <div>
              <label>Start: {formatTime(song.loopStart || 0)}</label>
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={song.loopStart || 0}
                onChange={(e) => handleLoopStartChange(e.target.value)}
              />
            </div>
            <div>
              <label>End: {formatTime(song.loopEnd || duration)}</label>
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={song.loopEnd || duration}
                onChange={(e) => handleLoopEndChange(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AudioPlayer
