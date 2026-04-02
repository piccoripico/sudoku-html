import test from 'node:test';
import assert from 'node:assert/strict';

import { captureSnapshot, createNotesBoard, restoreSnapshot } from '../src/lib/history.js';
import { isTypingTarget } from '../src/lib/input.js';
import { PUZZLE_TEMPLATES } from '../src/lib/puzzle-templates.js';
import { countSolutions, createRng, generatePuzzle } from '../src/lib/sudoku.js';
import { createTimerState, getElapsedMs, startTimer } from '../src/lib/timer.js';

test('createRng is deterministic for composite string seeds', () => {
  const rngA = createRng('123:attempt:0');
  const rngB = createRng('123:attempt:0');
  const rngC = createRng('123:attempt:1');

  const valuesA = Array.from({ length: 5 }, () => rngA());
  const valuesB = Array.from({ length: 5 }, () => rngB());
  const valuesC = Array.from({ length: 5 }, () => rngC());

  assert.deepEqual(valuesA, valuesB);
  assert.notDeepEqual(valuesA, valuesC);
});

test('generatePuzzle stays reproducible and unique for low clue seeds', () => {
  const first = generatePuzzle(17, '0');
  const second = generatePuzzle(17, '0');

  assert.deepEqual(first.puzzleBoard, second.puzzleBoard);
  assert.deepEqual(first.solutionBoard, second.solutionBoard);
  assert.ok(first.actualClueCount >= 17);
  assert.equal(countSolutions(first.puzzleBoard.map((row) => [...row]), 3), 1);
});

test('generatePuzzle returns exact requested clue counts across supported options', () => {
  for (const clues of [17, 18, 20, 22, 24, 26, 28, 32, 48]) {
    const result = generatePuzzle(clues, '7');
    assert.equal(result.actualClueCount, clues);
    assert.equal(countSolutions(result.puzzleBoard.map((row) => [...row]), 3), 1);
  }
});

test('puzzle templates provide multiple unique 17-clue starting points', () => {
  assert.ok(PUZZLE_TEMPLATES.length >= 16);

  for (const template of PUZZLE_TEMPLATES) {
    const clueCount = Array.from(template.puzzle).filter((value) => value !== '0').length;
    const board = Array.from({ length: 9 }, (_, row) => (
      template.puzzle.slice(row * 9, row * 9 + 9).split('').map(Number)
    ));

    assert.equal(clueCount, 17);
    assert.equal(countSolutions(board, 3), 1);
    assert.equal(template.solution.includes('0'), false);
  }
});

test('isTypingTarget ignores interactive elements', () => {
  assert.equal(isTypingTarget({ tagName: 'input' }), true);
  assert.equal(isTypingTarget({ tagName: 'SELECT' }), true);
  assert.equal(isTypingTarget({ tagName: 'div', isContentEditable: true }), true);
  assert.equal(isTypingTarget({ tagName: 'div', isContentEditable: false }), false);
});

test('history snapshots preserve meta state and resume timers correctly', () => {
  const originalState = {
    current: Array.from({ length: 9 }, () => Array(9).fill(0)),
    notes: createNotesBoard(),
    hintCount: 2,
    solutionRevealed: true,
    noteMode: true,
    highlightNoteMode: true,
    selectedCell: { row: 4, col: 5 },
    timer: createTimerState()
  };

  originalState.current[1][2] = 7;
  originalState.notes[0][0].set(3, { highlighted: true });
  startTimer(originalState.timer, 1000);

  const snapshot = captureSnapshot(originalState, 1600);

  const restoredState = {
    current: Array.from({ length: 9 }, () => Array(9).fill(9)),
    notes: createNotesBoard(),
    hintCount: 0,
    solutionRevealed: false,
    noteMode: false,
    highlightNoteMode: false,
    selectedCell: null,
    timer: createTimerState()
  };

  restoreSnapshot(restoredState, snapshot, 5000);

  assert.deepEqual(restoredState.current, originalState.current);
  assert.equal(restoredState.notes[0][0].get(3).highlighted, true);
  assert.equal(restoredState.hintCount, 2);
  assert.equal(restoredState.solutionRevealed, true);
  assert.equal(restoredState.noteMode, true);
  assert.equal(restoredState.highlightNoteMode, true);
  assert.deepEqual(restoredState.selectedCell, { row: 4, col: 5 });
  assert.equal(getElapsedMs(restoredState.timer, 5300), 900);
});
