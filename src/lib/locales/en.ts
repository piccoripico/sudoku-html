export const EN = {
    title: 'Sudoku',
    clueLabel: 'Clues',
    seedLabel: 'Seed (blank for random)',
    langLabel: 'Language',
    themeLabel: 'Theme',
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
    preferenceSaveLabel: 'Save settings',
    preferenceSaveTitle: 'Save clues, seed, language, and theme in this browser',
    seedPlaceholder: 'Optional (blank for random)',
    newGame: 'New Puzzle',
    reset: 'Reset to Start',
    hint: 'Fill a Hint',
    solve: 'Show Solution',
    saveGame: 'Save',
    loadGame: 'Load',
    helpButton: 'Help',
    helpClose: 'Close',
    highlightSettingsButton: 'Settings',
    highlightSettingsTitle: 'Highlight Settings',
    highlightCompletedToggle: 'Highlight completed numbers',
    highlightDuplicateToggle: 'Highlight duplicate numbers',
    padTitle: 'Number Pad',
    undo: '↩️ Undo',
    redo: '↪️ Redo',
    noteButton: '✏️ Note',
    redNoteButton: '🔴 Red Note',
    clearButton: 'Clear',
    boardAriaLabel: 'Sudoku board',
    padHelpLine1: '1–9: Enter a number.',
    padHelpLine2: '✏️ Note: Add notes. (🔴 Red Note or right-click: Add red notes.)',
    statusLoading: 'Loading...',
    statusGenerating: 'Generating...',
    statusInputPrompt: 'Enter numbers to solve the puzzle.',
    statusNoHint: 'No empty cell is available for a hint.',
    statusSolved: 'Congratulations! Puzzle solved. (Time: {time})',
    statusSolutionShown: 'Solution displayed.',
    statusSaveSuccess: 'The current state has been saved.',
    statusSaveError: 'The current state could not be saved.',
    statusSaveUnavailable: 'There is no puzzle state to save.',
    statusLoadSuccess: 'The saved state has been loaded.',
    statusLoadError: 'The save file could not be loaded.',
    statsHintUsed: 'Hints filled: {count}',
    statsSolutionShown: 'Solution shown: {state}',
    statsClues: 'Clues: {count}',
    statsSeed: 'Seed: {seed}',
    yes: 'yes',
    no: 'no',
    randomSeed: 'random({seed})',
    helpTitle: 'How to Play',
    helpSections: [
      {
        items: [
          { label: 'Getting started', text: 'Select a cell and enter a number from 1 to 9.' },
          { label: 'Goal', text: 'The puzzle is complete when every row, column, and 3x3 block outlined by the thick lines contains each number from 1 to 9 exactly once.' },
          { label: 'Unique solution', text: 'Every generated puzzle has exactly one solution.' },
          { label: 'Highlighting', text: 'Duplicate numbers and numbers that have been correctly completed in all nine positions are highlighted.' },
          { label: 'Offline', text: 'You can play offline. Gameplay itself does not require any internet connection.' }
        ]
      },
      {
        title: 'Controls and Buttons Above the Board',
        items: [
          { label: 'Clues', text: 'Sets the number of starting clues for the next puzzle.' },
          { label: 'Seed', text: 'Enter the same seed to recreate the same puzzle. Leave it blank for a random puzzle.' },
          { label: 'Language', text: 'Switches the interface language.' },
          { label: 'Theme', text: 'Choose System, Light, or Dark. System follows the color preference of your operating system or browser.' },
          { label: 'Save settings', text: 'When enabled, the clue count, seed, language, theme, and two highlight options are saved in this browser and restored the next time you open the app. It is off by default. Turning it off removes the saved preferences.' },
          { label: 'New Puzzle', text: 'Generates a fresh puzzle with the current settings.' },
          { label: 'Reset to Start', text: 'Returns the board to its initial state. The timer also starts over.' },
          { label: 'Fill a Hint', text: 'Reveals one correct value in an empty cell.' },
          { label: 'Show Solution', text: 'Displays the completed solution.' },
          { label: 'Settings', text: 'Opens the two highlight display options.' },
          { label: 'Help', text: 'Opens the help dialog. It is available offline.' },
          { label: 'Save', text: 'Saves the current board, notes, timer, and Undo/Redo history as a JSON file.' },
          { label: 'Load', text: 'Loads a saved JSON file and resumes from the same state.' }
        ]
      },
      {
        title: 'Controls (Mouse / Tap)',
        items: [
          { label: 'Select a cell', text: 'Select a cell on the board.' },
          { label: 'Enter a number', text: 'Use the number pad to enter a number.' },
          { label: 'Clear', text: 'Clears the selected cell.' },
          { label: '✏️ Note', text: 'Switches to note input mode. When note input mode is on, entering a number adds a note.' },
          { label: '🔴 Red Note', text: 'Switches note input to red notes. While note input mode is on, you can also right-click a number with the mouse to enter a red note.' },
          { label: '↩️ Undo', text: 'Undoes the most recent input or note.' },
          { label: '↪️ Redo', text: 'Reapplies an undone input or note.' }
        ]
      },
      {
        title: 'Controls (Keyboard)',
        items: [
          { label: 'Arrow keys', text: 'Move between cells.' },
          { label: '1-9', text: 'Enter a number.' },
          { label: '0 / Backspace / Delete', text: 'Clear the selected cell.' },
          { label: 'Enter', text: 'Switch to note input mode.' },
          { label: 'Shift+1-9', text: 'Enter a red note.' },
          { label: 'Ctrl+Z', text: 'Undo.' },
          { label: 'Ctrl+Y or Ctrl+Shift+Z', text: 'Redo.' }
        ]
      },
      {
        title: 'More Information',
        items: [
          {
            label: 'GitHub Repository (Internet connection required)',
            href: 'https://github.com/piccoripico/sudoku-html',
            linkText: 'https://github.com/piccoripico/sudoku-html'
          }
        ]
      }
    ],
    clueOptionLabels: {
      17: '17 (hardest)',
      24: '24 (very hard)',
      28: '28 (hard)',
      32: '32 (normal)',
      38: '38 (easy)',
      44: '44 (very easy)'
    }
} as const;
