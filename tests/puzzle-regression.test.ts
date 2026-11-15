import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { generatePuzzle, type Board } from '../src/lib/sudoku.js';

const boardString = (board: Board): string => board.flat().join('');

test('seeded puzzle generation retains the fixed deterministic regression cases', async () => {
  const fixture: { cases: Array<{
    clues: number; seed: string; actualClueCount: number;
    puzzle: string; solution: string;
  }> } = JSON.parse(await readFile(new URL('./fixtures/puzzle-seed-golden.json', import.meta.url), 'utf8'));

  assert.ok(fixture.cases.length >= 20);
  for (const expected of fixture.cases) {
    const actual = generatePuzzle(expected.clues, expected.seed);
    assert.equal(actual.actualClueCount, expected.actualClueCount, `${expected.clues}/${expected.seed}: clue count`);
    assert.equal(boardString(actual.puzzleBoard), expected.puzzle, `${expected.clues}/${expected.seed}: puzzle`);
    assert.equal(boardString(actual.solutionBoard), expected.solution, `${expected.clues}/${expected.seed}: solution`);
  }
});
