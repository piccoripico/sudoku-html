import { cloneBoard, createNotesBoard } from './history.js';
import { captureTimerSnapshot } from './timer.js';

export const SAVE_FILE_FORMAT = 'sudoku-html-save';
export const SAVE_FILE_VERSION = 1;

function assertValid(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isIntegerInRange(value, min, max) {
  return Number.isInteger(value) && value >= min && value <= max;
}

function normalizeBoard(board, name, minValue, maxValue) {
  assertValid(Array.isArray(board) && board.length === 9, `${name} must contain 9 rows.`);

  return board.map((row, rowIndex) => {
    assertValid(Array.isArray(row) && row.length === 9, `${name}[${rowIndex}] must contain 9 cells.`);

    return row.map((value, colIndex) => {
      const numericValue = Number(value);
      assertValid(
        isIntegerInRange(numericValue, minValue, maxValue),
        `${name}[${rowIndex}][${colIndex}] must be an integer between ${minValue} and ${maxValue}.`
      );
      return numericValue;
    });
  });
}

function serializeNotes(notesBoard) {
  return notesBoard.map((row) => row.map((noteMap) => (
    Array.from(noteMap.entries())
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([value, entry]) => ({
        value: Number(value),
        highlighted: Boolean(entry?.highlighted)
      }))
  )));
}

function deserializeNotes(notesBoard, name) {
  assertValid(Array.isArray(notesBoard) && notesBoard.length === 9, `${name} must contain 9 rows.`);

  const restored = createNotesBoard();

  for (let row = 0; row < 9; row += 1) {
    const rowData = notesBoard[row];
    assertValid(Array.isArray(rowData) && rowData.length === 9, `${name}[${row}] must contain 9 cells.`);

    for (let col = 0; col < 9; col += 1) {
      const cellData = rowData[col];
      assertValid(Array.isArray(cellData), `${name}[${row}][${col}] must be an array.`);

      const noteMap = new Map();
      for (const [index, entry] of cellData.entries()) {
        assertValid(entry && typeof entry === 'object', `${name}[${row}][${col}][${index}] must be an object.`);
        const value = Number(entry.value);
        assertValid(
          isIntegerInRange(value, 1, 9),
          `${name}[${row}][${col}][${index}].value must be an integer between 1 and 9.`
        );
        assertValid(!noteMap.has(value), `${name}[${row}][${col}] contains duplicate note values.`);
        noteMap.set(value, { highlighted: Boolean(entry.highlighted) });
      }

      restored[row][col] = noteMap;
    }
  }

  return restored;
}

function normalizeSelectedCell(selectedCell, name) {
  if (selectedCell == null) {
    return null;
  }

  assertValid(selectedCell && typeof selectedCell === 'object', `${name} must be null or an object.`);

  const row = Number(selectedCell.row);
  const col = Number(selectedCell.col);
  assertValid(isIntegerInRange(row, 0, 8), `${name}.row must be an integer between 0 and 8.`);
  assertValid(isIntegerInRange(col, 0, 8), `${name}.col must be an integer between 0 and 8.`);

  return { row, col };
}

function normalizeTimer(timerSnapshot, name) {
  assertValid(timerSnapshot && typeof timerSnapshot === 'object', `${name} must be an object.`);

  const elapsedMs = Number(timerSnapshot.elapsedMs);
  assertValid(Number.isFinite(elapsedMs) && elapsedMs >= 0, `${name}.elapsedMs must be a non-negative number.`);

  return {
    elapsedMs,
    running: Boolean(timerSnapshot.running)
  };
}

function normalizeNonNegativeInteger(value, name) {
  const numericValue = Number(value);
  assertValid(Number.isInteger(numericValue) && numericValue >= 0, `${name} must be a non-negative integer.`);
  return numericValue;
}

function normalizeSnapshot(snapshot, name) {
  assertValid(snapshot && typeof snapshot === 'object', `${name} must be an object.`);

  return {
    current: normalizeBoard(snapshot.current, `${name}.current`, 0, 9),
    notes: deserializeNotes(snapshot.notes, `${name}.notes`),
    hintCount: normalizeNonNegativeInteger(snapshot.hintCount, `${name}.hintCount`),
    solutionRevealed: Boolean(snapshot.solutionRevealed),
    noteMode: Boolean(snapshot.noteMode),
    highlightNoteMode: Boolean(snapshot.highlightNoteMode),
    selectedCell: normalizeSelectedCell(snapshot.selectedCell, `${name}.selectedCell`),
    timer: normalizeTimer(snapshot.timer, `${name}.timer`)
  };
}

function serializeSnapshot(snapshot) {
  return {
    current: cloneBoard(snapshot.current),
    notes: serializeNotes(snapshot.notes),
    hintCount: snapshot.hintCount,
    solutionRevealed: Boolean(snapshot.solutionRevealed),
    noteMode: Boolean(snapshot.noteMode),
    highlightNoteMode: Boolean(snapshot.highlightNoteMode),
    selectedCell: snapshot.selectedCell ? { ...snapshot.selectedCell } : null,
    timer: {
      elapsedMs: Number(snapshot.timer.elapsedMs),
      running: Boolean(snapshot.timer.running)
    }
  };
}

function validatePuzzleAgainstSolution(puzzle, solution, name) {
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const puzzleValue = puzzle[row][col];
      if (puzzleValue !== 0) {
        assertValid(
          puzzleValue === solution[row][col],
          `${name}.puzzle[${row}][${col}] must match the solution when it is not empty.`
        );
      }
    }
  }
}

function validateCurrentAgainstPuzzle(current, puzzle, name) {
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const puzzleValue = puzzle[row][col];
      if (puzzleValue !== 0) {
        assertValid(
          current[row][col] === puzzleValue,
          `${name}.current[${row}][${col}] must match the fixed clue value.`
        );
      }
    }
  }
}

export function createSaveData(state, now = Date.now()) {
  return {
    format: SAVE_FILE_FORMAT,
    version: SAVE_FILE_VERSION,
    savedAt: new Date(now).toISOString(),
    game: {
      puzzle: cloneBoard(state.puzzle),
      solution: cloneBoard(state.solution),
      current: cloneBoard(state.current),
      notes: serializeNotes(state.notes),
      hintCount: state.hintCount,
      solutionRevealed: Boolean(state.solutionRevealed),
      noteMode: Boolean(state.noteMode),
      highlightNoteMode: Boolean(state.highlightNoteMode),
      selectedCell: state.selectedCell ? { ...state.selectedCell } : null,
      timer: captureTimerSnapshot(state.timer, now),
      selectedClueCount: state.selectedClueCount,
      selectedSeedRaw: String(state.selectedSeedRaw ?? ''),
      selectedSeedWasRandom: Boolean(state.selectedSeedWasRandom),
      history: state.history.map(serializeSnapshot),
      future: state.future.map(serializeSnapshot)
    }
  };
}

export function parseSaveText(text) {
  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error('The save file is not valid JSON.', { cause: error });
  }

  assertValid(parsed && typeof parsed === 'object', 'The save file must contain an object.');
  assertValid(parsed.format === SAVE_FILE_FORMAT, 'The save file format is not supported.');
  assertValid(parsed.version === SAVE_FILE_VERSION, 'The save file version is not supported.');

  const game = parsed.game;
  assertValid(game && typeof game === 'object', 'The save file must contain a game object.');

  const puzzle = normalizeBoard(game.puzzle, 'game.puzzle', 0, 9);
  const solution = normalizeBoard(game.solution, 'game.solution', 1, 9);
  validatePuzzleAgainstSolution(puzzle, solution, 'game');
  const current = normalizeBoard(game.current, 'game.current', 0, 9);
  validateCurrentAgainstPuzzle(current, puzzle, 'game');

  return {
    format: parsed.format,
    version: parsed.version,
    savedAt: typeof parsed.savedAt === 'string' ? parsed.savedAt : '',
    game: {
      puzzle,
      solution,
      current,
      notes: deserializeNotes(game.notes, 'game.notes'),
      hintCount: normalizeNonNegativeInteger(game.hintCount, 'game.hintCount'),
      solutionRevealed: Boolean(game.solutionRevealed),
      noteMode: Boolean(game.noteMode),
      highlightNoteMode: Boolean(game.highlightNoteMode),
      selectedCell: normalizeSelectedCell(game.selectedCell, 'game.selectedCell'),
      timer: normalizeTimer(game.timer, 'game.timer'),
      selectedClueCount: normalizeNonNegativeInteger(game.selectedClueCount, 'game.selectedClueCount'),
      selectedSeedRaw: String(game.selectedSeedRaw ?? ''),
      selectedSeedWasRandom: Boolean(game.selectedSeedWasRandom),
      history: Array.isArray(game.history)
        ? game.history.map((snapshot, index) => normalizeSnapshot(snapshot, `game.history[${index}]`))
        : [],
      future: Array.isArray(game.future)
        ? game.future.map((snapshot, index) => normalizeSnapshot(snapshot, `game.future[${index}]`))
        : []
    }
  };
}

export function createSaveFilename(now = new Date()) {
  const pad = (value) => String(value).padStart(2, '0');
  const timestamp = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate())
  ].join('') + '-' + [
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds())
  ].join('');

  return `sudoku-save-${timestamp}.json`;
}
