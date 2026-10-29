# Music Man Development Task List

This document breaks down the 10 selected Level 1 user stories into specific development tasks with clear acceptance criteria.

## Task 1: Import Audio
**User Story:** As a practicing musician, I want to import an audio file into Music Man so that I can practice with the recording I need.

### Subtasks
1.1 Create file input component for audio file selection
1.2 Implement file reading and audio data handling
1.3 Create song data structure to store imported audio
1.4 Add song to library UI component
1.5 Implement audio file validation (format checking)

### Acceptance Criteria
- [ ] User can select an audio file from their device
- [ ] Selected audio file is processed and stored
- [ ] Song appears in the song library
- [ ] Song name is derived from filename
- [ ] Audio can be played after import
- [ ] No YouTube downloading or scraping is implemented
- [ ] Only local file import is supported

---

## Task 2: Section Looping
**User Story:** As a practicing musician, I want to select a start and end point and loop that section so that I can repeatedly practice a difficult passage without stopping to rewind.

### Subtasks
2.1 Create loop enable/disable toggle control
2.2 Implement loop start point slider (0 to song duration)
2.3 Implement loop end point slider (0 to song duration)
2.4 Add visual indicator of current loop state
2.5 Implement audio looping logic using Web Audio API
2.6 Display loop start/end times in readable format (MM:SS)

### Acceptance Criteria
- [ ] User can enable/disable looping
- [ ] User can set loop start point
- [ ] User can set loop end point
- [ ] Loop state is clearly visible in the UI
- [ ] Audio loops continuously between start and end points when enabled
- [ ] Loop can be disabled to play full song
- [ ] Loop settings are saved with song configuration

---

## Task 3: Tempo Control
**User Story:** As a practicing musician, I want to change the playback tempo of a song so that I can practice difficult music slowly and increase the speed as I improve.

### Subtasks
3.1 Create tempo adjustment slider (50% to 150%)
3.2 Implement tempo change using Web Audio API playbackRate
3.3 Add visual display of current tempo percentage
3.4 Ensure tempo can be adjusted during playback
3.5 Persist tempo setting with song configuration

### Acceptance Criteria
- [ ] User can adjust tempo between 50% and 150%
- [ ] Tempo change takes effect immediately
- [ ] Current tempo is displayed as percentage
- [ ] Tempo can be changed while audio is playing
- [ ] Tempo setting is saved with song configuration
- [ ] No advanced audio-processing features beyond basic tempo adjustment

---

## Task 4: Metronome
**User Story:** As a practicing musician, I want to use a metronome while practicing so that I can maintain a consistent beat while playing.

### Subtasks
4.1 Create metronome component with BPM control
4.2 Implement adjustable BPM (40-240 range)
4.3 Add audio click on each beat using Web Audio API
4.4 Create visual beat indicator
4.5 Add start/stop controls
4.6 Position metronome for easy access while practicing

### Acceptance Criteria
- [ ] User can set BPM between 40 and 240
- [ ] Metronome produces audible click on each beat
- [ ] Visual indicator shows current beat
- [ ] Metronome can be started and stopped
- [ ] Metronome is always accessible while using the app
- [ ] Beat timing is accurate
- [ ] Implementation is minimal (no unnecessary features)

---

## Task 5: Count-In
**User Story:** As a practicing musician, I want to use a count-in before playback begins so that I have time to prepare my instrument before the music starts.

### Subtasks
5.1 Implement count-in logic before playback starts
5.2 Create visual count display (4, 3, 2, 1)
5.3 Configure count-in to trigger only when starting from beginning
5.4 Add configurable count-in beats (default: 4)
5.5 Integrate count-in with audio player play button

### Acceptance Criteria
- [ ] Count-in occurs before audio playback begins
- [ ] Visual count is displayed (4, 3, 2, 1)
- [ ] Audio starts automatically after count-in completes
- [ ] Count-in only triggers when starting from beginning of song
- [ ] Count-in can be configured (number of beats)
- [ ] No complex configuration beyond basic count-in functionality

---

## Task 6: Save / Modify Songs
**User Story:** As a practicing musician, I want to save changes I make to a song so that my practice setup is available the next time I use the song.

### Subtasks
6.1 Implement localStorage persistence for song data
6.2 Save song configuration on every change
6.3 Load saved configurations on application start
6.4 Implement modify/edit functionality for song settings
6.5 Document exactly what data is being persisted

### Acceptance Criteria
- [ ] Song name is saved
- [ ] Tempo setting is saved
- [ ] Loop start point is saved
- [ ] Loop end point is saved
- [ ] Loop enabled state is saved
- [ ] Configuration persists across browser sessions
- [ ] User can modify saved configurations
- [ ] No user accounts are required
- [ ] Browser-side persistence is used (localStorage)
- [ ] Persisted data is documented in README

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

---

## Task 7: Setlists
**User Story:** As a performing musician, I want to create and organize a setlist so that I can keep songs in the order I plan to perform them.

### Subtasks
7.1 Create setlist creation UI (name input)
7.2 Implement add song to setlist functionality
7.3 Create setlist management UI (view, edit, delete)
7.4 Implement song reordering within setlist (up/down controls)
7.5 Implement remove song from setlist
7.6 Persist setlists using localStorage
7.7 Display song count per setlist

### Acceptance Criteria
- [ ] User can create a named setlist
- [ ] User can add songs to a setlist
- [ ] User can view all setlists
- [ ] User can delete a setlist
- [ ] User can reorder songs within a setlist
- [ ] User can remove songs from a setlist
- [ ] Setlist order is preserved
- [ ] Setlists persist across browser sessions
- [ ] No unrelated playlist/social features are included
- [ ] Song count is displayed per setlist

---

## Task 8: Song Transitions
**User Story:** As a performing musician, I want to control the transition from one song to the next in a setlist so that I can move through a performance or rehearsal smoothly.

### Subtasks
8.1 **BLOCKED - REQUIRES CLARIFICATION**
   - Implement only what can be supported by literal user story
   - Do not invent crossfade, custom timing, or other advanced features

### Acceptance Criteria
- [ ] **BLOCKED:** Client/Analyst must clarify what "control the transition" means
- [ ] Basic navigation between songs in setlist is implemented
- [ ] Manual song selection from setlist is available
- [ ] Reorder capability exists (from Task 7)

**Pending Clarification:**
- Should transitions be manual or automatic?
- Should there be crossfade between songs?
- Should there be custom transition timing?
- Should there be gapless playback?
- What specific "control" is required?

**Current Implementation (Pending Clarification):**
- Manual song selection from setlist
- "Play Next Song" button for basic navigation
- No automatic transitions
- No crossfade

---

## Task 9: Search / Browse
**User Story:** As a musician, I want to search and browse available songs so that I can quickly locate music I want to practice.

### Subtasks
9.1 Create search/browse UI component
9.2 Implement search input field
9.3 Implement filtering of local song library
9.4 Create grid/list view of songs
9.5 **BLOCKED** - External catalog integration requires product decision

### Acceptance Criteria
- [ ] Search input field is available
- [ ] User can search by song name
- [ ] Search filters local song library
- [ ] Songs are displayed in browsable format
- [ ] Clear messaging about current limitation (local only)
- [ ] **BLOCKED:** External catalog source not decided
- [ ] No Spotify integration is implemented
- [ ] No YouTube integration is implemented
- [ ] No Apple Music integration is implemented
- [ ] No music API is selected
- [ ] No external song database is connected
- [ ] No web scraping is implemented

**Current Implementation (Pending Catalog Source Decision):**
- Search/browse UI created
- Filters local imported songs only
- Clear messaging about limitation
- Architecture ready for external catalog when source is decided

**Pending Clarification:**
- What should be the source of the song catalog?
- Local only (current implementation)?
- Specific music service (which one)?
- File-based catalog?
- Other approach?

---

## Task 10: Sharing
**User Story:** As a musician, I want to share a saved song or practice setup so that I can give another musician the same practice material.

### Subtasks
10.1 Create share button in song library
10.2 Implement configuration export (JSON format)
10.3 **BLOCKED** - Full sharing mechanism requires product decision
10.4 Do not implement accounts, cloud storage, or social features

### Acceptance Criteria
- [ ] Share button is available for each song
- [ ] Song configuration can be exported
- [ ] Exported configuration includes: name, tempo, loop settings
- [ ] **BLOCKED:** Exact sharing mechanism not defined
- [ ] No user accounts are implemented
- [ ] No cloud storage is implemented
- [ ] No social networking features are implemented
- [ ] No public profiles are implemented
- [ ] No third-party integrations are implemented

**Current Implementation (Pending Sharing Mechanism Decision):**
- Clipboard-based configuration export
- Exports JSON (name, tempo, loop settings)
- Does not include audio file (too large for clipboard)
- Basic sharing capability

**Pending Clarification:**
- What sharing mechanism should be implemented?
- File export/import of configuration?
- Cloud-based sharing (requires backend)?
- Email/link sharing (requires backend)?
- Other mechanism?

---

## General Requirements

### Testing
- Each task must include appropriate tests
- Tests must verify core behavior
- Manual testing checklist must be created
- Automated tests should be added where practical

### Documentation
- README must be updated with implementation status
- Each user story's completion status must be documented
- Blocked stories must be clearly marked with required clarifications
- Implementation decisions must be documented

### Verification
- Production build must succeed
- CI workflow must pass
- No deployment to AWS (per project requirements)
- No AWS credentials added
- No backend added
- No authentication added

### Constraints
- Do not invent requirements not in Level 1 specification
- Do not add features just because they seem useful
- Do not implement rejected user stories
- Return ambiguous requirements to Client/Analyst for clarification
- Do not silently choose answers for undefined product decisions
