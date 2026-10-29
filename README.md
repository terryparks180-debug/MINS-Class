# Music Man

A React application for musicians to practice along with recorded audio, reducing interruptions during practice sessions.

## Project Purpose

Music Man solves the primary problem of reducing interruptions while a musician practices along with recorded audio. The interface prioritizes the controls a musician needs while actively holding or playing an instrument: current song, playback state, loop state, and tempo.

## Documentation

- [Product Requirements Document (PRD)](./docs/PRD.md) - Project overview, user stories, architecture, and unresolved requirements
- [Task List](./docs/TASK_LIST.md) - Detailed breakdown of user stories into development tasks with acceptance criteria
- [Workspace Rules](./docs/WORKSPACE_RULES.md) - Development conventions, branching strategy, commit guidelines, and testing standards

## Technology

- **Frontend Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.0
- **Audio Processing:** Web Audio API
- **Persistence:** localStorage (browser-side)
- **Testing:** Vitest, React Testing Library
- **CI/CD:** GitHub Actions

## Installation

1. Clone the repository:
```bash
git clone https://github.com/terryparks180-debug/MINS-Class.git
cd MINS-Class
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Running Tests

Run automated tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Level 1 User Stories

### 1. IMPORT AUDIO ✅ COMPLETE
**As a practicing musician, I want to import an audio file into Music Man so that I can practice with the recording I need.**

**Implementation:**
- File import via standard HTML file input
- Supports all audio formats accepted by the browser
- Audio files are stored as base64 data URLs in localStorage
- No YouTube downloading or scraping implemented (per requirements)

**Component:** `SongLibrary.jsx`

---

### 2. SECTION LOOPING ✅ COMPLETE
**As a practicing musician, I want to select a start and end point and loop that section so that I can repeatedly practice a difficult passage without stopping to rewind.**

**Implementation:**
- Loop enable/disable toggle
- Loop start point slider (0 to song duration)
- Loop end point slider (0 to song duration)
- Visual display of current loop state
- Automatic looping when enabled

**Component:** `AudioPlayer.jsx`

---

### 3. TEMPO CONTROL ✅ COMPLETE
**As a practicing musician, I want to change the playback tempo of a song so that I can practice difficult music slowly and increase the speed as I improve.**

**Implementation:**
- Tempo slider (50% to 150%)
- Real-time tempo adjustment during playback
- Visual display of current tempo percentage
- Uses Web Audio API playbackRate

**Component:** `AudioPlayer.jsx`

---

### 4. METRONOME ✅ COMPLETE
**As a practicing musician, I want to use a metronome while practicing so that I can maintain a consistent beat while playing.**

**Implementation:**
- Adjustable BPM (40-240)
- Visual beat indicator (4 beats per measure)
- Audio click on each beat
- Start/Stop control
- Always visible in top-right corner

**Component:** `Metronome.jsx`

---

### 5. COUNT-IN ✅ COMPLETE
**As a practicing musician, I want to use a count-in before playback begins so that I have time to prepare my instrument before the music starts.**

**Implementation:**
- Configurable count-in beats (default: 4)
- Visual count display
- Automatic start after count-in completes
- Only triggers when starting from beginning of song

**Component:** `AudioPlayer.jsx`

---

### 6. SAVE / MODIFY SONGS ✅ COMPLETE
**As a practicing musician, I want to save changes I make to a song so that my practice setup is available the next time I use the song.**

**Implementation:**
- Automatic persistence to localStorage
- Saves: song name, tempo, loop start/end, loop enabled state
- No user accounts (per requirements)
- Data persists across browser sessions

**Persisted Data:**
```javascript
{
  id: string,
  name: string,
  audioData: string (base64),
  tempo: number (0.5-1.5),
  loopStart: number | null,
  loopEnd: number | null,
  loopEnabled: boolean,
  createdAt: string (ISO timestamp)
}
```

**Component:** `App.jsx` (state management)

---

### 7. SETLISTS ✅ COMPLETE
**As a performing musician, I want to create and organize a setlist so that I can keep songs in the order I plan to perform them.**

**Implementation:**
- Create named setlists
- Add songs to setlists
- Reorder songs with up/down arrows
- Remove songs from setlists
- Delete entire setlists
- Display song count per setlist

**Component:** `SetlistManager.jsx`

---

### 8. SONG TRANSITIONS ⚠️ PARTIAL - REQUIRES CLARIFICATION
**As a performing musician, I want to control the transition from one song to the next in a setlist so that I can move through a performance or rehearsal smoothly.**

**Implementation:**
- "Play Next Song" button in setlist view
- Manual song selection from setlist
- Reorder capability

**Limitation:**
The specification "control the transition" is ambiguous. Current implementation provides manual navigation through setlists. The following require product decisions:
- Crossfade between songs?
- Automatic transition timing?
- Custom transition points?
- Gapless playback?

**Component:** `SetlistManager.jsx`

---

### 9. SEARCH / BROWSE ⚠️ PARTIAL - BLOCKED BY PRODUCT DECISION
**As a musician, I want to search and browse available songs so that I can quickly locate music I want to practice.**

**Implementation:**
- Search/browse UI created
- Search filters local song library
- Grid view of songs
- Clear messaging about current limitation

**Blocker:**
The source of the available-song catalog has NOT been decided. Per requirements:
- No Spotify integration
- No YouTube integration
- No Apple Music integration
- No music API selected
- No external song database
- No web scraping

**Current Behavior:**
Search/Browse only shows locally imported songs. To connect to an external music service, a product decision is needed from the Client/Analyst.

**Component:** `SongBrowser.jsx`

---

### 10. SHARING ⚠️ PARTIAL - BLOCKED BY PRODUCT DECISION
**As a musician, I want to share a saved song or practice setup so that I can give another musician the same practice material.**

**Implementation:**
- "Share Config" button copies song configuration to clipboard
- Exports as JSON (name, tempo, loop settings)
- Does NOT include audio file (too large for clipboard)

**Limitation:**
The exact sharing mechanism is not defined. Per requirements:
- No user accounts
- No cloud storage
- No social networking
- No public profiles
- No third-party integrations

**Current Behavior:**
Clipboard-based configuration sharing. To implement full sharing (e.g., file export/import, cloud sync, etc.), a product decision is needed from the Client/Analyst.

**Component:** `SongLibrary.jsx`

---

## Project Structure

```
src/
├── App.jsx                    # Main application component
├── App.css                    # Global styles
├── index.css                  # Base styles
├── main.jsx                   # React entry point
├── components/
│   ├── AudioPlayer.jsx        # Audio playback with loop, tempo, count-in
│   ├── AudioPlayer.css
│   ├── SongLibrary.jsx        # Song import and management
│   ├── SongLibrary.css
│   ├── SetlistManager.jsx     # Setlist creation and management
│   ├── SetlistManager.css
│   ├── SongBrowser.jsx        # Search/browse UI
│   ├── SongBrowser.css
│   └── Metronome.jsx          # Metronome component
│   └── Metronome.css
└── test/
    ├── setup.js               # Test configuration
    ├── App.test.jsx           # App component tests
    ├── SongLibrary.test.jsx   # Song library tests
    ├── SetlistManager.test.jsx # Setlist manager tests
    └── SongBrowser.test.jsx   # Song browser tests
```

## Major Implementation Decisions

1. **Audio Storage:** Audio files stored as base64 in localStorage due to no backend requirement. This limits file size but allows persistence without authentication.

2. **No Backend:** All functionality implemented client-side per requirements. No database, no server, no authentication.

3. **Web Audio API:** Used for audio playback, tempo control, and metronome. Provides precise timing and tempo adjustment.

4. **localStorage:** Chosen for persistence as it requires no authentication and works entirely client-side.

5. **Count-in Timing:** Fixed at 120 BPM for count-in (simple implementation). Could be made configurable if needed.

6. **Sharing:** Clipboard-based JSON export only. Audio files not included due to size limitations.

## Known Limitations

1. **File Size:** localStorage has limits (~5-10MB). Large audio files may fail to save.

2. **Browser Compatibility:** Web Audio API support varies. Modern browsers (Chrome, Firefox, Safari, Edge) supported.

3. **No External Music:** Cannot access Spotify, YouTube, etc. (blocked by requirements).

4. **Song Transitions:** Manual only. No crossfade or automatic transitions (requires product decision).

5. **Audio Format Support:** Limited to formats supported by the user's browser.

6. **Metronome:** Fixed 4/4 time signature visualization.

## CI/CD

GitHub Actions workflow configured for:
- Checkout repository
- Setup Node.js 18.x
- Install dependencies (npm ci)
- Run linter (npm run lint)
- Run tests (npm test -- --run)
- Build application (npm run build)
- Upload build artifacts

**Note:** AWS Amplify deployment has intentionally NOT been configured yet. This will be added separately later per project requirements.

## Deployment Status

⚠️ **NOT DEPLOYED**

AWS Amplify deployment has not been configured. The application is currently for local development and testing only.

## Questions for Client/Analyst

1. **Story 8 (Song Transitions):** What specific transition control is required? Options include:
   - Crossfade between songs?
   - Automatic timing rules?
   - Custom transition points?
   - Gapless playback?

2. **Story 9 (Search/Browse):** What should be the source of the song catalog? Options include:
   - Local only (current implementation)
   - Specific music API (which one?)
   - File-based catalog
   - Other approach?

3. **Story 10 (Sharing):** What sharing mechanism should be implemented? Options include:
   - File export/import (JSON config)
   - Cloud storage (requires backend/infrastructure)
   - Email/link sharing (requires backend)
   - Other approach?

## Development Team

- **Client:** Hunter S. La Rocque
- **Analyst:** William R. Nitto
- **Builder:** Terry Parks

## Course

MINS 350 Business Analyst / Agile Class Project
