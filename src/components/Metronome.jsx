import { useState, useEffect, useRef, useCallback } from 'react'
import './Metronome.css'

function Metronome() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [bpm, setBpm] = useState(120)
  const [currentBeat, setCurrentBeat] = useState(0)
  
  const audioContextRef = useRef(null)
  const intervalRef = useRef(null)
  const nextNoteTimeRef = useRef(0)
  const beatNumberRef = useRef(0)

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }
  }, [])

  const playClick = useCallback(() => {
    if (!audioContextRef.current) return

    const osc = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    osc.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    // Higher pitch for first beat of measure
    if (beatNumberRef.current % 4 === 0) {
      osc.frequency.value = 1000
    } else {
      osc.frequency.value = 800
    }

    gainNode.gain.value = 0.5
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.1)

    osc.start(audioContextRef.current.currentTime)
    osc.stop(audioContextRef.current.currentTime + 0.1)

    beatNumberRef.current++
    setCurrentBeat(beatNumberRef.current % 4)
  }, [])

  const scheduler = useCallback(() => {
    if (!audioContextRef.current) return

    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + 0.1) {
      playClick()
      const secondsPerBeat = 60.0 / bpm
      nextNoteTimeRef.current += secondsPerBeat
    }
  }, [bpm, playClick])

  useEffect(() => {
    let animationFrame

    if (isPlaying) {
      const lookahead = 25.0
      const schedule = () => {
        scheduler()
        animationFrame = requestAnimationFrame(schedule)
      }
      animationFrame = requestAnimationFrame(schedule)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isPlaying, scheduler])

  const handleToggle = () => {
    initAudioContext()
    
    if (isPlaying) {
      setIsPlaying(false)
      beatNumberRef.current = 0
      setCurrentBeat(0)
    } else {
      setIsPlaying(true)
      nextNoteTimeRef.current = audioContextRef.current ? audioContextRef.current.currentTime : 0
      beatNumberRef.current = 0
    }
  }

  const handleBpmChange = (newBpm) => {
    setBpm(parseInt(newBpm))
  }

  return (
    <div className="metronome">
      <div className="metronome-display">
        <div className="bpm-display">{bpm} BPM</div>
        <div className="beat-indicator">
          {[0, 1, 2, 3].map((beat) => (
            <div
              key={beat}
              className={`beat-dot ${currentBeat === beat ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
      <div className="metronome-controls">
        <button onClick={handleToggle} className={isPlaying ? 'active' : ''}>
          {isPlaying ? 'Stop' : 'Start'}
        </button>
        <div className="bpm-control">
          <label>
            BPM:
            <input
              type="range"
              min="40"
              max="240"
              value={bpm}
              onChange={(e) => handleBpmChange(e.target.value)}
            />
          </label>
          <input
            type="number"
            min="40"
            max="240"
            value={bpm}
            onChange={(e) => handleBpmChange(e.target.value)}
            className="bpm-input"
          />
        </div>
      </div>
    </div>
  )
}

export default Metronome
