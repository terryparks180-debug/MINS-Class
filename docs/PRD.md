# Music Man Product Requirements Document

## Project Information

- **Project Name:** Music Man
- **Client:** Hunter S. La Rocque
- **Analyst:** William R. Nitto
- **Builder:** Terry Parks
- **Course:** MINS 350 Business Analyst / Agile Class

## Project Description

Music Man is a web application designed to help musicians practice along with recorded audio. The primary problem the application solves is reducing interruptions while a musician practices along with recorded audio. The interface prioritizes the controls a musician needs while actively holding or playing an instrument: current song, playback state, loop state, and tempo.

## Problem Statement

Musicians need to practice along with recorded audio, but existing tools often require frequent interruptions to adjust playback settings, find specific sections, or manage practice materials. These interruptions break practice flow and reduce practice effectiveness.

## Solution

Music Man provides a streamlined interface with large, obvious playback controls that can be easily operated while holding or playing an instrument. The application allows musicians to import audio, loop difficult sections, adjust tempo, use a metronome, and organize songs into setlists—all with minimal interruption to practice sessions.

## Selected Level 1 User Stories

### 1. IMPORT AUDIO
**As a practicing musician, I want to import an audio file into Music Man so that I can practice with the recording I need.**

- Import audio files from local storage
- Support common audio formats (MP3, WAV, etc.)
- No YouTube downloading or scraping
- Audio files are stored for use within the application

### 2. SECTION LOOPING
**As a practicing musician, I want to select a start and end point and loop that section so that I can repeatedly practice a difficult passage without stopping to rewind.**

- Identify loop start point
- Identify loop end point
- Enable/disable looping
- Repeatedly play the identified section
- Clear visual indication of loop state

### 3. TEMPO CONTROL
**As a practicing musician, I want to change the playback tempo of a song so that I can practice difficult music slowly and increase the speed as I improve.**

- Adjust playback tempo
- Clear way to modify tempo during playback
- Visual display of current tempo
- No advanced audio-processing requirements beyond basic tempo adjustment

### 4. METRONOME
**As a practicing musician, I want to use a metronome while practicing so that I can maintain a consistent beat while playing.**

- Provide a usable metronome feature
- Adjustable beats per minute (BPM)
- Visual and/or audio beat indication
- Start/stop functionality

### 5. COUNT-IN
**As a practicing musician, I want to use a count-in before playback begins so that I have time to prepare my instrument before the music starts.**

- Implement count-in associated with starting playback
- Clear visual indication of count
- Automatic start after count-in completes
- No complex configuration unless required for basic story

### 6. SAVE / MODIFY SONGS
**As a practicing musician, I want to save changes I make to a song so that my practice setup is available the next time I use the song.**

- Retain practice configuration associated with a song
- Modify saved configurations
- No user accounts
- Browser-side persistence approach

**Persisted Information:**
- Song name
- Tempo setting
- Loop start/end points
- Loop enabled state

### 7. SETLISTS
**As a performing musician, I want to create and organize a setlist so that I can keep songs in the order I plan to perform them.**

- Create setlists
- Add songs to setlists
- Organize song order within setlists
- No unrelated playlist/social features

### 8. SONG TRANSITIONS
**As a performing musician, I want to control the transition from one song to the next in a setlist so that I can move through a performance or rehearsal smoothly.**

- Implement only what can be supported by the literal user story
- **REQUIRES CLARIFICATION:** Exact meaning of "control the transition" is not defined in specification

### 9. SEARCH / BROWSE
**As a musician, I want to search and browse available songs so that I can quickly locate music I want to practice.**

- Search and browse functionality
- **BLOCKED:** Source of available-song catalog has NOT been decided

**Explicitly NOT included:**
- Spotify integration
- YouTube integration
- Apple Music integration
- Music API selection
- External song database
- Web scraping from music websites

### 10. SHARING
**As a musician, I want to share a saved song or practice setup so that I can give another musician the same practice material.**

- Share saved song or practice setup
- **REQUIRES CLARIFICATION:** Exact sharing mechanism is not defined

**Explicitly NOT included:**
- User accounts
- Cloud storage
- Social networking
- Public profiles
- Third-party integrations

## Technical Architecture

### Frontend
- **Framework:** React
- **Build Tool:** Vite
- **Language:** JavaScript/JSX

### Audio Functionality
- **Audio API:** Web Audio API
- **Audio Processing:** Browser-native
- **No Backend:** All audio processing occurs client-side

### Persistence
- **Storage:** Browser localStorage
- **No Database:** No backend database
- **No User Accounts:** Authentication not required
- **Scope:** Practice configurations only (not full audio files if too large)

### Deployment
- **Current Status:** Local development only
- **AWS Amplify:** NOT configured yet (intentional per project requirements)
- **No AWS Credentials:** Not added
- **No Deployment:** Not deployed

## Known Constraints

### Technical Constraints
- Browser localStorage size limits (~5-10MB)
- Browser audio format support varies
- Web Audio API compatibility with older browsers
- No backend server or database
- No cloud storage integration

### Product Constraints
- No user accounts or authentication
- No social networking features
- No commerce or purchasing
- No AI composition features
- No recording studio features
- No messaging
- No public profiles
- No external music service integrations (Spotify, YouTube, Apple Music)

### Specification Constraints
- Must not invent requirements not in Level 1 specification
- Must not add features just because they seem useful
- Must not implement rejected user stories

## Unresolved Requirements

### Story 8: Song Transitions
**Ambiguity:** The phrase "control the transition" is not defined in the specification.

**Clarification Needed:**
- What specific transition control is required?
- Should transitions be manual or automatic?
- Should there be crossfade between songs?
- Should there be custom transition timing?
- Should there be gapless playback?

**Current Status:** Awaiting Client/Analyst decision before implementation beyond basic navigation.

### Story 9: Search / Browse
**Blocker:** The source of the available-song catalog has not been decided.

**Clarification Needed:**
- What should be the source of songs for search/browse?
- Should it be limited to locally imported songs only?
- Should it connect to a specific music service?
- Should it use a specific music API?
- Should it use a file-based catalog?

**Current Status:** UI structure created, but full implementation blocked pending catalog source decision.

### Story 10: Sharing
**Ambiguity:** The exact sharing mechanism is not defined in the specification.

**Clarification Needed:**
- What sharing mechanism should be implemented?
- File export/import of configuration?
- Cloud-based sharing (requires backend)?
- Email/link sharing (requires backend)?
- Other mechanism?

**Current Status:** Basic clipboard-based configuration export implemented. Full sharing mechanism requires Client/Analyst decision.

## Out of Scope Features

The following features are explicitly OUT OF SCOPE based on rejected Level 1 candidate stories:

- Custom user profiles or avatars
- Public status updates
- Following musicians
- Private chat
- Instrument purchasing
- Live performance streaming
- Studio audio effects
- Multitrack recording
- Automatic sheet-music generation
- AI song composition
- Concert-ticket purchasing
- Rehearsal-studio booking
- Merchandise sales
- Band payroll
- Public fan pages
- Public music-video hosting
- Unrelated music news
- Ordering physical sheet music
- Concert-venue lighting controls

## User Experience Priorities

The application is intended to be used while musicians practice. The interface prioritizes:

1. Large, obvious playback controls
2. Clear song information
3. Visible playback state
4. Visible loop state
5. Visible tempo state
6. Minimal interruption while practicing
7. Simple navigation between major Music Man features

Decorative design is secondary to functionality and usability.
