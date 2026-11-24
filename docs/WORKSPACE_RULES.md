# Music Man Workspace Rules

This document defines the development standards, conventions, and processes for the Music Man project.

## React Component/File Naming Conventions

### Component Files
- **File Naming:** PascalCase (e.g., `AudioPlayer.jsx`, `SongLibrary.jsx`)
- **Location:** All components in `src/components/` directory
- **Component Naming:** PascalCase (e.g., `AudioPlayer`, `SongLibrary`)
- **CSS Files:** Same name as component (e.g., `AudioPlayer.css`)
- **Test Files:** Same name as component with `.test.jsx` suffix (e.g., `AudioPlayer.test.jsx`)

### Directory Structure
```
src/
├── components/          # React components
│   ├── ComponentName.jsx
│   ├── ComponentName.css
│   └── ComponentName.test.jsx
├── test/               # Test files and setup
│   └── setup.js
├── App.jsx             # Main application component
├── App.css             # Global styles
└── index.css           # Base styles
```

### Component Organization
- One component per file
- Keep components focused and single-purpose
- Component name should match its primary function
- Use descriptive names that reflect the feature (e.g., `SetlistManager` not `List`)

## JavaScript Naming Conventions

### Variables and Functions
- **Variables:** camelCase (e.g., `currentSong`, `handlePlayPause`)
- **Functions:** camelCase (e.g., `importSong`, `updateSong`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_TEMPO`, `MIN_BPM`)
- **Booleans:** Prefix with `is`, `has`, `should` (e.g., `isPlaying`, `hasLoop`, `shouldSave`)

### React Hooks
- **State Variables:** camelCase (e.g., `songs`, `currentSong`)
- **Setters:** camelCase with `set` prefix (e.g., `setSongs`, `setCurrentSong`)
- **Refs:** camelCase with `Ref` suffix (e.g., `audioContextRef`, `sourceNodeRef`)
- **Callbacks:** camelCase with `handle` prefix (e.g., `handlePlayPause`, `handleImport`)

### Component Props
- **Prop Names:** camelCase (e.g., `onSelectSong`, `onDeleteSong`)
- **Event Handlers:** Prefix with `on` (e.g., `onClick`, `onChange`)
- **Callback Props:** Prefix with `on` (e.g., `onImportSong`, `onUpdateSong`)

### File Exports
- **Default Export:** Main component (e.g., `export default AudioPlayer`)
- **Named Exports:** Utilities, constants, helpers (e.g., `export const MAX_TEMPO = 1.5`)

## Branching Strategy

### Main Branch
- **master** - Production-ready code
- Only merge to master after review and testing
- Must pass CI/CD checks before merge

### Feature Branches
- **Naming Convention:** `feature/story-name` or `feature/task-description`
- Examples:
  - `feature/audio-import`
  - `feature/section-looping`
  - `feature/tempo-control`
- Create one branch per user story or major task
- Branch from master
- Merge back to master via pull request

### Bugfix Branches
- **Naming Convention:** `bugfix/description-of-bug`
- Examples:
  - `bugfix/loop-timing-error`
  - `bugfix/metronome-sync`
- Branch from master
- Merge back to master via pull request

### Branch Rules
- Never commit directly to master
- Keep branches focused on a single feature or bugfix
- Delete branches after merging
- Keep branch names descriptive and concise

## Commit Message Guidelines

### Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

### Types
- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style changes (formatting, no logic change)
- **refactor:** Code refactoring (no feature change)
- **test:** Adding or updating tests
- **chore:** Build process or auxiliary tool changes

### Examples
```
feat(audio): add tempo control slider
fix(loop): correct loop end point boundary
docs(readme): update installation instructions
test(metronome): add BPM adjustment tests
refactor(setlist): simplify song reordering logic
```

### Commit Message Rules
- Use imperative mood ("add" not "added" or "adds")
- Limit subject line to 50 characters
- Capitalize subject line
- Do not end subject line with period
- Wrap body at 72 characters
- Reference issue/PR numbers in footer if applicable

### Bad Examples
```
Added the thing
fix bug
updated stuff
wip
```

### Good Examples
```
feat(audio): implement audio file import
fix(loop): resolve infinite loop when start equals end
docs(readme): add deployment instructions
```

## Pull Request and Review Process

### Creating a Pull Request
1. Ensure branch is up to date with master
2. Run tests locally (`npm test`)
3. Run build locally (`npm run build`)
4. Create PR with descriptive title
5. Reference related user story in description
6. Link to any relevant issues

### PR Description Template
```markdown
## User Story
[Link to or describe the user story this PR addresses]

## Changes
- [ ] List major changes
- [ ] Include scope of work

## Testing
- [ ] Manual testing completed
- [ ] Automated tests added/updated
- [ ] All tests passing

## Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2
- [ ] All criteria met

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows workspace rules
- [ ] Tests pass locally
- [ ] Build succeeds locally
- [ ] No new warnings/errors
- [ ] Documentation updated
```

### Review Process
1. **Self-Review:** Review your own changes before requesting review
2. **Peer Review:** At least one team member must review
3. **CI Checks:** All CI checks must pass
4. **Approval:** At least one approval required
5. **Merge:** Squash and merge to master

### Review Guidelines
- Review for code quality and adherence to conventions
- Verify acceptance criteria are met
- Check for unintended side effects
- Test the changes if possible
- Provide clear, constructive feedback
- Approve only when ready to merge

## Testing Expectations

### Unit Tests
- Test individual components in isolation
- Test component rendering
- Test user interactions
- Test state changes
- Mock external dependencies (audio, localStorage)

### Integration Tests
- Test component interactions
- Test data flow between components
- Test localStorage persistence
- Test audio playback integration

### Test Coverage
- Aim for reasonable coverage of core functionality
- Prioritize testing critical paths (audio playback, persistence)
- Test error handling where applicable
- Tests should be added for new features

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests once
npm test -- --run
```

### Test Quality
- Tests should be independent (no order dependencies)
- Tests should be fast
- Tests should be descriptive (clear what they test)
- Use descriptive test names
- Test both happy path and error cases

## Acceptance Criteria Verification

### Before Marking a Task Complete
1. **Review Acceptance Criteria:** Review all acceptance criteria in TASK_LIST.md
2. **Manual Testing:** Perform manual testing for the feature
3. **Automated Testing:** Ensure automated tests pass
4. **Documentation:** Update README with implementation status
5. **No Extra Features:** Confirm no features outside scope were added
6. **Product Decisions:** Verify no undefined product decisions were made

### Acceptance Criteria Checklist
For each task, verify:
- [ ] All acceptance criteria in TASK_LIST.md are met
- [ ] Manual testing completed successfully
- [ ] Automated tests pass
- [ ] No features outside the user story were added
- [ ] No product decisions were invented
- [ ] README updated with completion status
- [ ] Any blockers or clarifications are documented

### Blocked Stories
If a story is blocked by missing product decisions:
- Implement only what is clearly defined
- Do not invent behavior to complete the story
- Clearly document what is blocked
- Clearly document what clarification is needed
- Mark story as "PARTIAL" or "BLOCKED" in README

## Requirement Interpretation Rules

### Do Not Invent Requirements
- **Rule:** Never add features not specified in the Level 1 user stories
- **Rule:** Never add features "just because they seem useful"
- **Rule:** Never implement rejected user stories
- **Rule:** Never add social networking, commerce, or other out-of-scope features

### Example Violations
- Adding user profiles (not in specification)
- Adding social sharing to external platforms (not in specification)
- Adding advanced audio effects (not in specification)
- Adding AI features (not in specification)
- Adding commerce features (not in specification)

### Correct Approach
- Implement only what is explicitly stated in the user story
- Keep implementation minimal for ambiguous requirements
- When in doubt, ask for clarification rather than guessing

### Ambiguous Requirements Must Be Clarified
- **Rule:** When a requirement is ambiguous, do not silently choose an answer
- **Rule:** Identify the ambiguity clearly
- **Rule:** Document what clarification is needed
- **Rule:** Return to Client/Analyst for decision
- **Rule:** Implement only the clearly defined parts

### Examples of Ambiguities Requiring Clarification
- "Control the transition" - What specific control?
- "Good user experience" - What makes it good?
- "Appropriate error handling" - What errors? How to handle?
- "Efficient performance" - What metrics? What thresholds?

### Process for Ambiguous Requirements
1. Identify the ambiguous requirement
2. Document what is unclear
3. List possible interpretations
4. Implement only the clearly defined parts
5. Flag the story as requiring clarification
6. Bring question to Client/Analyst
7. Wait for decision before proceeding with ambiguous parts

### Decision Record
When a product decision is made by Client/Analyst:
- Document the decision in the code (comments)
- Document the decision in README
- Update TASK_LIST.md with the decision
- Update PRD.md if it affects requirements
- Reference the decision in related commits

## Code Quality Standards

### Code Style
- Follow ESLint configuration
- Use Prettier formatting (if configured)
- Keep functions small and focused
- Avoid deeply nested code
- Use meaningful variable names
- Add comments for complex logic only

### Performance
- Avoid unnecessary re-renders
- Use React.memo for expensive components
- Use useCallback and useMemo appropriately
- Optimize audio operations
- Don't store large data in component state

### Accessibility
- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Provide visual feedback for interactions
- Use sufficient color contrast

### Security
- Never commit secrets or credentials
- Never store passwords in localStorage
- Validate user inputs
- Sanitize data from external sources
- Use HTTPS in production (when deployed)

## Deployment Rules

### Current Status
- **No Deployment:** Application is not deployed yet
- **No AWS:** AWS Amplify deployment not configured
- **No Credentials:** No AWS credentials added
- **Local Only:** Development and testing only

### Future Deployment
- AWS Amplify deployment will be added separately
- Deployment will be configured by Client/Analyst
- Do not add deployment configuration now
- Do not add AWS credentials now

### Build Verification
- Production build must succeed: `npm run build`
- Build artifacts should be tested
- No build warnings (if possible)
- No build errors

## Violation Consequences

### Minor Violations
- Style violations: Fix in next commit
- Naming violations: Fix in next commit
- Minor process violations: Document and improve

### Major Violations
- Inventing requirements: Revert changes, clarify with Client/Analyst
- Adding out-of-scope features: Revert changes
- Breaking CI: Fix before merge
- Committing secrets: Revert immediately, rotate credentials

### Process Improvements
- If a rule is unclear, discuss with team
- If a rule doesn't work, propose change
- Update this document when rules change
- Keep rules aligned with project needs
