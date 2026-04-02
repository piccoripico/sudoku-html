import { PUZZLE_TEMPLATES } from './puzzle-templates.js';

function parseBoard(rows) {
  return rows.map((row) => row.split('').map(Number));
}

const TEMPLATE_BOARDS = PUZZLE_TEMPLATES.map(({ puzzle, solution }) => ({
  puzzleBoard: parseBoard(Array.from({ length: 9 }, (_, index) => puzzle.slice(index * 9, index * 9 + 9))),
  solutionBoard: parseBoard(Array.from({ length: 9 }, (_, index) => solution.slice(index * 9, index * 9 + 9)))
}));

function hashSeed(seedInput) {
  const seed = String(seedInput);
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) || 1;
}

export function createRng(seedInput) {
  if (seedInput === '' || seedInput === null || seedInput === undefined) {
    return Math.random;
  }

  let state = hashSeed(seedInput);
  return () => {
    state ^= state << 13;
    state >>>= 0;
    state ^= state >> 17;
    state >>>= 0;
    state ^= state << 5;
    state >>>= 0;
    return (state >>> 0) / 0x100000000;
  };
}

export function shuffle(array, rand) {
  for (let index = array.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rand() * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }
}

function isSafe(board, row, col, value) {
  for (let index = 0; index < 9; index += 1) {
    if (board[row][index] === value || board[index][col] === value) {
      return false;
    }
  }

  const startRow = 3 * Math.floor(row / 3);
  const startCol = 3 * Math.floor(col / 3);
  for (let currentRow = startRow; currentRow < startRow + 3; currentRow += 1) {
    for (let currentCol = startCol; currentCol < startCol + 3; currentCol += 1) {
      if (board[currentRow][currentCol] === value) {
        return false;
      }
    }
  }

  return true;
}

export function countSolutions(board, limit = 2, budget = null) {
  const rowMask = Array(9).fill(0);
  const colMask = Array(9).fill(0);
  const boxMask = Array(9).fill(0);
  const empties = [];

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const value = board[row][col];
      if (value === 0) {
        empties.push([row, col]);
        continue;
      }

      const bit = 1 << value;
      const box = 3 * Math.floor(row / 3) + Math.floor(col / 3);
      rowMask[row] |= bit;
      colMask[col] |= bit;
      boxMask[box] |= bit;
    }
  }

  function popcount(number) {
    let count = 0;
    let remaining = number;

    while (remaining) {
      remaining &= remaining - 1;
      count += 1;
    }

    return count;
  }

  function solve(index = 0) {
    if (budget) {
      budget.calls += 1;
      if (budget.calls > budget.maxCalls) return 0;
    }

    let bestIndex = -1;
    let bestCandidates = 0;
    let bestCount = 10;

    for (let searchIndex = index; searchIndex < empties.length; searchIndex += 1) {
      const [row, col] = empties[searchIndex];
      if (board[row][col] !== 0) continue;

      const box = 3 * Math.floor(row / 3) + Math.floor(col / 3);
      const used = rowMask[row] | colMask[col] | boxMask[box];
      const candidates = (~used) & 0x3FE;
      const count = popcount(candidates);

      if (count === 0) return 0;
      if (count < bestCount) {
        bestCount = count;
        bestCandidates = candidates;
        bestIndex = searchIndex;
        if (count === 1) break;
      }
    }

    if (bestIndex === -1) return 1;

    [empties[index], empties[bestIndex]] = [empties[bestIndex], empties[index]];
    const [row, col] = empties[index];
    const box = 3 * Math.floor(row / 3) + Math.floor(col / 3);

    let solutions = 0;
    for (let value = 1; value <= 9; value += 1) {
      const bit = 1 << value;
      if ((bestCandidates & bit) === 0) continue;

      board[row][col] = value;
      rowMask[row] |= bit;
      colMask[col] |= bit;
      boxMask[box] |= bit;

      solutions += solve(index + 1);

      rowMask[row] &= ~bit;
      colMask[col] &= ~bit;
      boxMask[box] &= ~bit;
      board[row][col] = 0;

      if (solutions >= limit) break;
      if (budget && budget.calls > budget.maxCalls) break;
    }

    [empties[index], empties[bestIndex]] = [empties[bestIndex], empties[index]];
    return solutions;
  }

  return solve(0);
}

export function generateFullBoard(rand) {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function backtrack(cell = 0) {
    if (cell === 81) return true;

    const row = Math.floor(cell / 9);
    const col = cell % 9;
    const shuffled = [...numbers];

    shuffle(shuffled, rand);
    for (const value of shuffled) {
      if (!isSafe(board, row, col, value)) continue;

      board[row][col] = value;
      if (backtrack(cell + 1)) return true;
      board[row][col] = 0;
    }

    return false;
  }

  backtrack();
  return board;
}

export function clampClues(value) {
  return Math.max(17, Math.min(81, value));
}

function createDigitMap(rand) {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffle(digits, rand);

  const digitMap = [0];
  for (const digit of digits) {
    digitMap.push(digit);
  }

  return digitMap;
}

function createAxisOrder(rand) {
  const groups = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ].map((group) => [...group]);

  shuffle(groups, rand);

  return groups.flatMap((group) => {
    shuffle(group, rand);
    return group;
  });
}

function transposeBoard(board) {
  return board[0].map((_, col) => board.map((row) => row[col]));
}

function transformBoard(board, digitMap, rowOrder, colOrder, shouldTranspose = false) {
  const sourceBoard = shouldTranspose ? transposeBoard(board) : board;

  return rowOrder.map((row) => colOrder.map((col) => {
    const value = sourceBoard[row][col];
    return value === 0 ? 0 : digitMap[value];
  }));
}

function countClues(board) {
  let clueCount = 0;

  for (const row of board) {
    for (const value of row) {
      if (value !== 0) {
        clueCount += 1;
      }
    }
  }

  return clueCount;
}

function addCluesToMatch(puzzleBoard, solutionBoard, clueCount, rand) {
  const filledCells = [];

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (puzzleBoard[row][col] === 0) {
        filledCells.push([row, col]);
      }
    }
  }

  shuffle(filledCells, rand);

  let actualClueCount = countClues(puzzleBoard);
  for (const [row, col] of filledCells) {
    if (actualClueCount >= clueCount) break;
    puzzleBoard[row][col] = solutionBoard[row][col];
    actualClueCount += 1;
  }

  return actualClueCount;
}

export function generatePuzzle(clues, seedValue) {
  const clueCount = clampClues(clues);
  const templateRand = createRng(`${seedValue}:template`);
  const templateIndex = Math.floor(templateRand() * TEMPLATE_BOARDS.length);
  const shouldTranspose = templateRand() < 0.5;
  const template = TEMPLATE_BOARDS[templateIndex];
  const transformRand = createRng(`${seedValue}:transform:${templateIndex}:${shouldTranspose ? 't' : 'n'}`);
  const fillRand = createRng(`${seedValue}:fill:${clueCount}`);
  const digitMap = createDigitMap(transformRand);
  const rowOrder = createAxisOrder(transformRand);
  const colOrder = createAxisOrder(transformRand);

  const solutionBoard = transformBoard(template.solutionBoard, digitMap, rowOrder, colOrder, shouldTranspose);
  const puzzleBoard = transformBoard(template.puzzleBoard, digitMap, rowOrder, colOrder, shouldTranspose);
  const actualClueCount = addCluesToMatch(puzzleBoard, solutionBoard, clueCount, fillRand);

  return {
    puzzleBoard,
    solutionBoard,
    actualClueCount
  };
}
