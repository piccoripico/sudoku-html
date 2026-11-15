import assert from 'node:assert/strict';
import test from 'node:test';

import { createNotesBoard } from '../src/lib/history.js';
import { createSaveData, parseSaveText, SAVE_FILE_VERSION, type SaveState } from '../src/lib/persistence.js';
import { generatePuzzle } from '../src/lib/sudoku.js';
import { createTimerState } from '../src/lib/timer.js';

function validSave(): Record<string, any> {
  const generated = generatePuzzle(24, 'strict-save');
  const state: SaveState = {
    puzzle: generated.puzzleBoard,
    solution: generated.solutionBoard,
    current: generated.puzzleBoard.map((row) => [...row]),
    notes: createNotesBoard(),
    hintCount: 0,
    solutionRevealed: false,
    noteMode: false,
    highlightNoteMode: false,
    selectedCell: null,
    timer: createTimerState(),
    selectedClueCount: generated.actualClueCount,
    selectedSeedRaw: 'strict-save',
    selectedSeedWasRandom: false,
    history: [],
    future: []
  };
  return JSON.parse(JSON.stringify(createSaveData(state, 1700000000000))) as Record<string, any>;
}

function parse(save: unknown): void {
  parseSaveText(JSON.stringify(save));
}

test('the only current save-file format is version 2', () => {
  assert.equal(SAVE_FILE_VERSION, 2);
  const save = validSave();
  assert.doesNotThrow(() => parse(save));
  save.version = 1;
  assert.throws(() => parse(save), /version is not supported/);
});

test('required game histories and flags cannot be omitted or silently coerced', () => {
  for (const key of ['history', 'future']) {
    const save = validSave();
    delete save.game[key];
    assert.throws(() => parse(save), new RegExp(key));
  }
  for (const key of ['solutionRevealed', 'noteMode', 'highlightNoteMode', 'selectedSeedWasRandom']) {
    const save = validSave();
    save.game[key] = 'false';
    assert.throws(() => parse(save), new RegExp(key));
  }
  const save = validSave();
  delete save.game.selectedCell;
  assert.throws(() => parse(save), /selectedCell/);
});

test('save metadata and numeric/board fields require exact types', () => {
  for (const [key, value] of Object.entries({ hintCount: '0', selectedClueCount: '24', selectedSeedRaw: 24 })) {
    const save = validSave();
    save.game[key] = value;
    assert.throws(() => parse(save), new RegExp(key));
  }
  const board = validSave();
  board.game.current[0][0] = String(board.game.current[0][0]);
  assert.throws(() => parse(board), /current/);
  const timestamp = validSave();
  delete timestamp.savedAt;
  assert.throws(() => parse(timestamp), /savedAt/);
});

test('notes, timer and undo snapshots do not accept coerced values', () => {
  const notes = validSave();
  notes.game.notes[0][0] = [{ value: '3', highlighted: false }];
  assert.throws(() => parse(notes), /value/);
  const flags = validSave();
  flags.game.notes[0][0] = [{ value: 3, highlighted: 'false' }];
  assert.throws(() => parse(flags), /highlighted/);
  const timer = validSave();
  timer.game.timer.running = 'false';
  assert.throws(() => parse(timer), /running/);
  const snapshot = validSave();
  snapshot.game.history = [{
    current: snapshot.game.current,
    notes: snapshot.game.notes,
    hintCount: 0,
    solutionRevealed: false,
    noteMode: 'false',
    highlightNoteMode: false,
    selectedCell: null,
    timer: { elapsedMs: 0, running: false }
  }];
  assert.throws(() => parse(snapshot), /history\[0\]\.noteMode/);
});
