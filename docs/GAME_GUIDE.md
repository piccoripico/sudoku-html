# Sudoku Game Guide

## Documents

- [Repository Guide (English)](../README.md)
- [Repository Guide (Japanese)](../README.ja.md)
- [Game Guide (Japanese)](./GAME_GUIDE.ja.md)

## Screenshot

![Sudoku board](./screenshot_board_en.JPG)

## Getting Started

1. Download the release asset or build `dist/Sudoku.html` locally.
2. Open `Sudoku.html` directly in Chrome, Edge, or another browser.
3. Start playing immediately.

## Controls (Mouse)

- **Enter a number**: Click `1` to `9` on the number pad
- **Clear**: Click `Clear` on the number pad
- **Move to a cell**: Click the cell on the board where you want to enter a number
- **Toggle note mode**: Click the `✏️ Note` button on the number pad
- **Red notes**: While in note mode, **right-click** `1` to `9` on the number pad
- **Undo / Redo**: Click the `↩️ Undo` / `↪️ Redo` buttons

## Controls (Keyboard)

- **Enter a number**: `1` to `9`
- **Clear**: `0` / `Backspace` / `Delete`
- **Move between cells**: Arrow keys
- **Toggle note mode**: `Enter`
- **Red notes**: `Shift+1` to `9`
- **Undo / Redo**: `Ctrl+Z` / `Ctrl+Y` (`Ctrl+Shift+Z`)

## Main Features

- **Clues**: The selected clue count is used exactly for new puzzles.
- **Unique solution**: Every generated puzzle keeps a unique solution.
- **Seed**: Entering the same seed value generates the same puzzle.
- **Timer**: Measures the time from puzzle generation until completion.
- **Duplicate number warning**: Highlights duplicate numbers.
- **Highlight completed numbers**: Highlights numbers that have been fully completed.
- **Reset to Start**: Resets the puzzle to its original starting state.
- **Fill a Hint**: Adds another hint during play.
- **Show Solution**: Displays the solution.
