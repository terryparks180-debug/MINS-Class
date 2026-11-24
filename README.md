
# Music Man

A React application for musicians to practice along with recorded audio, reducing interruptions during practice sessions.

## Project Purpose

Music Man solves the primary problem of reducing interruptions while a musician practices along with recorded audio. The interface prioritizes the controls a musician needs while actively holding or playing an instrument: current song, playback state, loop state, and tempo.

## Documentation

- [Product Requirements Document (PRD)](./docs/PRD.md)
- [Task List](./docs/TASK_LIST.md)
- [Workspace Rules](./docs/WORKSPACE_RULES.md)

These documents were created during the scaffolding phase and should be reviewed against the Analyst's latest specification.

## Technology

### Prototype 1

- **Frontend Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.0
- **Audio Processing:** Web Audio API
- **Persistence:** localStorage (browser-side)
- **Testing:** Vitest, React Testing Library
- **CI/CD:** GitHub Actions
- **Node.js:** Version 22

### Prototype 2

The Prototype 2 assignment introduces:

- **Database:** Supabase PostgreSQL
- **Backend:** Local Node.js/Express API (planned)
- **Frontend Integration:** React client communicating with the local API (planned)
- **API Documentation:** OpenAPI 3.0 (pending)
- **API Testing:** cURL smoke tests (pending)

The database schema and sample data have been created in Supabase. Backend implementation and integration have not yet been verified.

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

Use Node.js 22 for development.

## Running the Application

Start the development server:

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Running Tests

Run automated tests:

```bash
npm test
```

Run tests once without watch mode:

```bash
npm test -- --run
```

Run the linter:

```bash
npm run lint
```

Passing results have not yet been verified for the current merged project.

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

The following ten user stories were selected for Music Man and carried forward into the Analyst's Level 2 Specification.

The implementation descriptions below reflect the Prototype 1 design. They should not be interpreted as additional client requirements.

### 1. Import Audio

**User Story:** As a practicing musician, I want to import an audio file so that I can practice with the recording I need.

**Prototype 1 Implementation:**

- File import using a browser file input
- Browser-supported audio formats
- Audio data stored locally using base64 data URLs
- No YouTube downloading or scraping

**Component:** `SongLibrary.jsx`

### 2. Section Looping

**User Story:** As a practicing musician, I want to select loop start and end points so that I can repeat a difficult passage without stopping to rewind.

**Prototype 1 Implementation:**

- Loop enable/disable toggle
- Loop start and end controls
- Visual loop status
- Repeated playback of the selected section

**Component:** `AudioPlayer.jsx`

### 3. Tempo Control

**User Story:** As a practicing musician, I want to adjust playback tempo so that I can start slowly and increase speed as I improve.

**Prototype 1 Implementation:**

- Playback speed adjustment from 50% to 150%
- Real-time playback rate changes
- Visual tempo percentage display
- Browser audio playback functionality

**Component:** `AudioPlayer.jsx`

### 4. Metronome

**User Story:** As a practicing musician, I want to use a metronome so that I can keep a consistent beat.

**Prototype 1 Implementation:**

- Adjustable BPM
- Audio click on each beat
- Visual beat indicator
- Start and stop controls

**Component:** `Metronome.jsx`

### 5. Count-In

**User Story:** As a practicing musician, I want a count-in before playback so that I have time to prepare.

**Prototype 1 Implementation:**

- Configurable count-in beats
- Visual countdown
- Playback begins after the count-in
- Default count-in settings selected during implementation

**Component:** `AudioPlayer.jsx`

The exact count-in behavior and defaults are Builder implementation decisions unless confirmed by the Client or Analyst.

### 6. Save / Modify Songs

**User Story:** As a practicing musician, I want to save song settings so that I can reuse my practice setup.

**Prototype 1 Implementation:**

- Browser localStorage persistence
- Saved song names
- Saved tempo settings
- Saved loop start and end points
- Saved loop enabled state

**Component:** `App.jsx`

Prototype 2 introduces database persistence, which will require additional integration work.

### 7. Setlists

**User Story:** As a performing musician, I want to create and reorder setlists so that songs follow my intended performance order.

**Prototype 1 Implementation:**

- Create named setlists
- Add songs
- Reorder songs
- Remove songs
- Delete setlists
- Display song counts

**Component:** `SetlistManager.jsx`

### 8. Song Transitions

**User Story:** As a performing musician, I want to advance between setlist songs so that rehearsal flows smoothly.

**Prototype 1 Implementation:**

- Manual song selection
- Play Next Song control
- Setlist navigation

**Status:** Partially implemented; exact transition behavior requires clarification.

Unresolved possibilities include:

- Automatic transitions
- Crossfading
- Gapless playback
- Custom transition timing

These behaviors are not automatically required.

**Component:** `SetlistManager.jsx`

### 9. Search / Browse

**User Story:** As a musician, I want to find songs by searching or browsing so that I can quickly locate practice material.

**Prototype 1 Implementation:**

- Search interface
- Search of locally imported songs
- Song browsing interface

**Status:** Partially implemented.

The source of the song catalog has not been fully specified. No external music API has been approved.

**Component:** `SongBrowser.jsx`

### 10. Sharing

**User Story:** As a musician, I want to share a saved song or practice setup so that another musician can use the same material.

**Prototype 1 Implementation:**

- Clipboard-based configuration sharing
- JSON containing practice settings
- Audio files are not included in clipboard exports

**Status:** Partially implemented.

The sharing mechanism, permissions, and account requirements still need clarification.

**Component:** `SongLibrary.jsx`

## Project Structure

The Prototype 1 React application includes:

```text
src/
  App.jsx
  App.css
  index.css
  main.jsx
  components/
    AudioPlayer.jsx
    AudioPlayer.css
    SongLibrary.jsx
    SongLibrary.css
    SetlistManager.jsx
    SetlistManager.css
    SongBrowser.jsx
    SongBrowser.css
    Metronome.jsx
    Metronome.css
  test/
    setup.js
    App.test.jsx
    SongLibrary.test.jsx
    SetlistManager.test.jsx
    SongBrowser.test.jsx
```

Project documentation:

```text
docs/
  PRD.md
  TASK_LIST.md
  WORKSPACE_RULES.md
```

Prototype 2 database scripts:

```text
db/
  01_schema.sql
  02_seed.sql
```

The local API and related testing files are required for Prototype 2 but have not yet been completed or verified.

## Prototype 2 Database

The Analyst's Level 2 Specification proposes six database entities:

1. User
2. Song
3. PracticeSetting
4. Setlist
5. SetlistSong
6. ShareRecord

The schema and seed scripts are stored in:

- `db/01_schema.sql`
- `db/02_seed.sql`

The scripts create the tables and insert three fictional test records per table.

The scripts were executed successfully in Supabase, and the records were verified.

The scripts still need to be verified together on a clean database project to fully satisfy the reproducibility requirement.

### Database Design Notes

The Analyst describes the six entities as a proposed implementation model.

The User table does not automatically require user authentication.

The current database contains fictional sample users for testing. Account registration, login, authorization, and sharing permissions require further clarification.

## Prototype 2 Backend Requirements

The Prototype 2 assignment requires a local backend API.

Planned implementation:

- Local Node.js/Express server
- Supabase database connection
- At least three GET endpoints
- At least one write endpoint
- React client communicates with the local API
- No direct client-to-Supabase communication
- Environment variables for database credentials
- OpenAPI 3.0 documentation
- cURL smoke tests

Required repository artifacts:

```text
api/
  openapi.yaml
  README.md

tests/
  smoke.sh
```

The backend must use the Supabase service role key only in the server environment.

Secrets must never be committed to GitHub or exposed in frontend code.

## Major Implementation Decisions

### Prototype 1

1. **Audio Storage:** Browser localStorage with base64 audio data.
2. **Frontend:** React and Vite.
3. **Audio Processing:** Browser audio functionality.
4. **Persistence:** Local browser storage.
5. **Count-In:** Prototype-specific timing and default values.
6. **Sharing:** Clipboard-based JSON configuration export.

These are implementation decisions and should not automatically be interpreted as Analyst or Client requirements.

### Prototype 2

1. **Database:** Supabase PostgreSQL, required by the Prototype 2 assignment.
2. **Schema:** Based on the Analyst's Level 2 proposed data model.
3. **Backend:** Local API required by the assignment.
4. **API Architecture:** Frontend communicates with the local API rather than directly with Supabase.
5. **Testing:** API smoke tests and existing frontend verification.

## Known Limitations

- Browser localStorage has limited storage capacity.
- Audio playback depends on browser-supported formats.
- External music catalog integration has not been specified.
- Song transition behavior requires clarification.
- Sharing mechanisms and permissions require clarification.
- Prototype 2 backend integration is not yet verified.
- Current lint, automated test, and production build results need verification.

## CI/CD

GitHub Actions is configured to:

1. Check out the repository.
2. Set up Node.js 22.
3. Install dependencies using `npm ci`.
4. Run ESLint using `npm run lint`.
5. Run automated tests using `npm test -- --run`.
6. Build the application using `npm run build`.
7. Upload build artifacts.

Required verification steps must fail when errors occur.

The current pipeline's passing status has not been verified.

## Deployment Status

**Not deployed to AWS.**

AWS Amplify deployment has not been configured.

The application is currently being developed and tested locally.

## Questions for Client / Analyst

### Story 8 — Song Transitions

What exact transition behavior is required?

Manual navigation exists in the prototype, but automatic transitions, crossfading, and other timing behaviors have not been confirmed.

### Story 9 — Search / Browse

What is the intended source of the searchable song catalog?

The current prototype searches locally imported songs.

### Story 10 — Sharing

What sharing mechanism and permissions are required?

The current prototype uses clipboard-based configuration sharing.

### User Accounts

The Level 2 database schema proposes a User entity.

Does this represent actual user accounts, or is it only a database ownership model for the prototype?

Authentication and account management should not be implemented without clarification.

## Development Team

- **Client:** Hunter S. La Rocque
- **Analyst:** William R. Nitto
- **Builder:** Terry Parks

## Course

MINS 350 — Fall 2026

## Repository

https://github.com/terryparks180-debug/MINS-Class
