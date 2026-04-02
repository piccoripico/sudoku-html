import test from 'node:test';
import assert from 'node:assert/strict';

import { captureSnapshot, cloneBoard, createNotesBoard } from '../src/lib/history.js';
import { createSaveData, parseSaveText, SAVE_FILE_FORMAT, SAVE_FILE_VERSION } from '../src/lib/persistence.js';
import { generatePuzzle } from '../src/lib/sudoku.js';
import { createTimerState, startTimer } from '../src/lib/timer.js';

function findEmptyCells(board, count) {
  const cells = [];

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (board[row][col] === 0) {
        cells.push({ row, col });
      }
    }
  }

  return cells.slice(0, count);
}

test('save files round-trip the board, notes, timer, and history state', () => {
  const { puzzleBoard, solutionBoard, actualClueCount } = generatePuzzle(24, 'save-roundtrip');
  const [valueCell, noteCell] = findEmptyCells(puzzleBoard, 2);

  const state = {
    puzzle: cloneBoard(puzzleBoard),
    solution: cloneBoard(solutionBoard),
    current: cloneBoard(puzzleBoard),
    notes: createNotesBoard(),
    history: [],
    future: [],
    timer: createTimerState(),
    hintCount: 0,
    solutionRevealed: false,
    noteMode: false,
    highlightNoteMode: false,
    selectedCell: { ...valueCell },
    selectedClueCount: actualClueCount,
    selectedSeedRaw: 'save-roundtrip',
    selectedSeedWasRandom: false
  };

  startTimer(state.timer, 1000);
  state.history.push(captureSnapshot(state, 1300));

  state.current[valueCell.row][valueCell.col] = solutionBoard[valueCell.row][valueCell.col];
  state.notes[noteCell.row][noteCell.col].set(4, { highlighted: true });
  state.hintCount = 2;
  state.noteMode = true;
  state.highlightNoteMode = true;
  state.selectedCell = { ...noteCell };
  state.future.push(captureSnapshot(state, 1600));

  const saveData = createSaveData(state, 1900);
  const restored = parseSaveText(JSON.stringify(saveData));

  assert.equal(restored.format, SAVE_FILE_FORMAT);
  assert.equal(restored.version, SAVE_FILE_VERSION);
  assert.deepEqual(restored.game.puzzle, state.puzzle);
  assert.deepEqual(restored.game.solution, state.solution);
  assert.deepEqual(restored.game.current, state.current);
  assert.equal(restored.game.notes[noteCell.row][noteCell.col].get(4).highlighted, true);
  assert.equal(restored.game.hintCount, 2);
  assert.equal(restored.game.noteMode, true);
  assert.equal(restored.game.highlightNoteMode, true);
  assert.deepEqual(restored.game.selectedCell, noteCell);
  assert.equal(restored.game.selectedClueCount, actualClueCount);
  assert.equal(restored.game.selectedSeedRaw, 'save-roundtrip');
  assert.equal(restored.game.selectedSeedWasRandom, false);
  assert.equal(restored.game.timer.elapsedMs, 900);
  assert.equal(restored.game.timer.running, true);
  assert.equal(restored.game.history.length, 1);
  assert.equal(restored.game.history[0].timer.elapsedMs, 300);
  assert.equal(restored.game.future.length, 1);
  assert.equal(restored.game.future[0].notes[noteCell.row][noteCell.col].get(4).highlighted, true);
});

test('save files reject invalid fixed clue values', () => {
  const { puzzleBoard, solutionBoard, actualClueCount } = generatePuzzle(24, 'invalid-save');

  const state = {
    puzzle: cloneBoard(puzzleBoard),
    solution: cloneBoard(solutionBoard),
    current: cloneBoard(puzzleBoard),
    notes: createNotesBoard(),
    history: [],
    future: [],
    timer: createTimerState(),
    hintCount: 0,
    solutionRevealed: false,
    noteMode: false,
    highlightNoteMode: false,
    selectedCell: null,
    selectedClueCount: actualClueCount,
    selectedSeedRaw: 'invalid-save',
    selectedSeedWasRandom: false
  };

  const invalidSave = createSaveData(state, 2000);

  outer:
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (invalidSave.game.puzzle[row][col] !== 0) {
        invalidSave.game.current[row][col] = 0;
        break outer;
      }
    }
  }

  assert.throws(
    () => parseSaveText(JSON.stringify(invalidSave)),
    /fixed clue value/
  );
});
