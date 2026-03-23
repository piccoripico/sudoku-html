import { captureSnapshot, cloneBoard, createNotesBoard, restoreSnapshot } from './lib/history.js';
import { I18N, translate } from './lib/i18n.js';
import { isTypingTarget } from './lib/input.js';
import { generatePuzzle } from './lib/sudoku.js';
import { createTimerState, getElapsedMs, pauseTimer, startTimer } from './lib/timer.js';

const boardEl = document.getElementById('board');
const padEl = document.getElementById('pad');
const statusEl = document.getElementById('status');
const statsEl = document.getElementById('stats');
const timerEl = document.getElementById('timer');
const undoEl = document.getElementById('undo');
const redoEl = document.getElementById('redo');

const state = {
  puzzle: [],
  solution: [],
  current: [],
  notes: createNotesBoard(),
  givens: new Set(),
  selectedCell: null,
  noteMode: false,
  history: [],
  future: [],
  solutionDigitMap: new Map(),
  timer: createTimerState(),
  hintCount: 0,
  solutionRevealed: false,
  selectedClueCount: 32,
  selectedSeedRaw: '',
  selectedSeedWasRandom: true,
  currentLang: 'ja'
};

let noteToggleEl = null;
let timerInterval = null;

function t(key, vars = {}) {
  return translate(state.currentLang, key, vars);
}

function cellKey(row, col) {
  return `${row}-${col}`;
}

function formatSeedDisplay(seedValue, isRandom) {
  return isRandom ? t('randomSeed', { seed: seedValue }) : seedValue;
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function syncTimerInterval() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  if (state.timer.running) {
    timerInterval = setInterval(updateTimerDisplay, 1000);
  }
}

function updateTimerDisplay() {
  if (!state.current.length) {
    timerEl.textContent = '--:--';
    return;
  }

  timerEl.textContent = formatTime(getElapsedMs(state.timer));
}

function resetAndStartTimer() {
  startTimer(state.timer);
  syncTimerInterval();
  updateTimerDisplay();
}

function freezeTimer() {
  pauseTimer(state.timer);
  syncTimerInterval();
  updateTimerDisplay();
}

function getSelectedElement() {
  if (!state.selectedCell) return null;
  const index = state.selectedCell.row * 9 + state.selectedCell.col;
  return boardEl.children[index] || null;
}

function syncNoteModeButton() {
  if (!noteToggleEl) return;
  noteToggleEl.classList.toggle('active', state.noteMode);
  noteToggleEl.textContent = t('noteButton');
}

function toggleNoteMode(force) {
  state.noteMode = typeof force === 'boolean' ? force : !state.noteMode;
  syncNoteModeButton();
}

function recordStateForUndo() {
  state.history.push(captureSnapshot(state));
  if (state.history.length > 200) {
    state.history.shift();
  }
  state.future = [];
}

function restoreState(snapshot) {
  restoreSnapshot(state, snapshot);
  syncNoteModeButton();
  syncTimerInterval();
  updateTimerDisplay();
  renderBoard();
  updateStats();
  updateStatus();
}

function updateClueOptionLabels() {
  const select = document.getElementById('clueCount');
  const localized = I18N[state.currentLang].clueOptionLabels || {};

  for (const option of select.options) {
    const value = Number(option.value);
    option.textContent = localized[value] || String(value);
  }
}

function updateStats() {
  const hintText = t('statsHintUsed', { count: state.hintCount });
  const solutionText = t('statsSolutionShown', { state: state.solutionRevealed ? t('yes') : t('no') });
  const clueText = t('statsClues', { count: state.selectedClueCount });
  const seedText = t('statsSeed', { seed: formatSeedDisplay(state.selectedSeedRaw, state.selectedSeedWasRandom) });
  statsEl.textContent = `${hintText} / ${solutionText} / ${clueText} / ${seedText}`;
}

function setStatus(message, type = '') {
  statusEl.textContent = message;
  statusEl.className = `status ${type}`.trim();
}

function applyLanguage(lang) {
  state.currentLang = I18N[lang] ? lang : 'ja';
  document.documentElement.lang = state.currentLang;
  document.title = t('title');

  const langSelect = document.getElementById('lang');
  if (langSelect.value !== state.currentLang) {
    langSelect.value = state.currentLang;
  }

  document.getElementById('title').textContent = t('title');
  document.getElementById('clueCountLabel').textContent = t('clueLabel');
  document.getElementById('seedLabel').textContent = t('seedLabel');
  document.getElementById('langLabel').textContent = t('langLabel');
  document.getElementById('seed').placeholder = t('seedPlaceholder');
  document.getElementById('newGame').textContent = t('newGame');
  document.getElementById('reset').textContent = t('reset');
  document.getElementById('hint').textContent = t('hint');
  document.getElementById('solve').textContent = t('solve');
  document.getElementById('padTitle').textContent = t('padTitle');
  document.getElementById('hintText').textContent = t('hintText');
  boardEl.setAttribute('aria-label', t('boardAriaLabel'));
  undoEl.textContent = t('undo');
  redoEl.textContent = t('redo');

  updateClueOptionLabels();
  syncNoteModeButton();

  const clearButton = padEl.querySelector('button.secondary');
  if (clearButton) {
    clearButton.textContent = t('clearButton');
  }

  updateStats();
  updateStatus();
}

function initLanguage() {
  const savedLang = localStorage.getItem('sudoku_lang');
  const browserLang = (navigator.language || '').toLowerCase().startsWith('ja') ? 'ja' : 'en';
  const preferred = savedLang && I18N[savedLang] ? savedLang : browserLang;

  applyLanguage(preferred);

  document.getElementById('lang').addEventListener('change', (event) => {
    applyLanguage(event.target.value);
    localStorage.setItem('sudoku_lang', state.currentLang);
  });
}

function buildBoard() {
  boardEl.innerHTML = '';

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', () => selectCell(row, col));
      boardEl.appendChild(cell);
    }
  }
}

function buildPad() {
  padEl.innerHTML = '';

  for (let value = 1; value <= 9; value += 1) {
    const button = document.createElement('button');
    button.textContent = value;
    button.className = 'num';
    button.addEventListener('click', () => applyValue(value));
    button.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      applyValue(value, { highlightNote: true });
    });
    padEl.appendChild(button);
  }

  noteToggleEl = document.createElement('button');
  noteToggleEl.className = 'pad-action';
  noteToggleEl.addEventListener('click', () => toggleNoteMode());
  padEl.appendChild(noteToggleEl);

  const clearButton = document.createElement('button');
  clearButton.classList.add('secondary');
  clearButton.addEventListener('click', () => applyValue(0));
  padEl.appendChild(clearButton);

  syncNoteModeButton();
  clearButton.textContent = t('clearButton');
}

function selectCell(row, col) {
  const previous = getSelectedElement();
  if (previous) {
    previous.classList.remove('selected');
  }

  state.selectedCell = { row, col };

  const current = getSelectedElement();
  if (current) {
    current.classList.add('selected');
  }
}

function ensureSelection() {
  if (!state.selectedCell) {
    selectCell(0, 0);
  }
}

function moveSelection(rowDelta, colDelta) {
  ensureSelection();

  const nextRow = (state.selectedCell.row + rowDelta + 9) % 9;
  const nextCol = (state.selectedCell.col + colDelta + 9) % 9;
  selectCell(nextRow, nextCol);
}

function applyValue(value, options = {}) {
  const { highlightNote = false } = options;
  if (!state.selectedCell) return;

  const { row, col } = state.selectedCell;
  if (state.givens.has(cellKey(row, col))) return;

  if (highlightNote && !state.noteMode) {
    return applyValue(value, { highlightNote: false });
  }

  if (state.noteMode) {
    const noteMap = state.notes[row][col];

    if (value === 0) {
      if (!noteMap.size) return;
      recordStateForUndo();
      noteMap.clear();
    } else if (highlightNote) {
      const existing = noteMap.get(value);
      if (existing && existing.highlighted) return;
      recordStateForUndo();
      noteMap.set(value, { highlighted: true });
    } else {
      const existing = noteMap.get(value);
      recordStateForUndo();
      if (existing) {
        noteMap.delete(value);
      } else {
        noteMap.set(value, { highlighted: false });
      }
    }
  } else {
    const currentValue = state.current[row][col];
    const nextValue = value === currentValue ? 0 : value;
    if (nextValue === currentValue) return;

    recordStateForUndo();
    state.current[row][col] = nextValue;
    state.notes[row][col].clear();
  }

  renderBoard();
  updateStatus();
}

function calculateConflicts() {
  const conflicts = new Set();

  for (let index = 0; index < 9; index += 1) {
    const rowMap = new Map();
    const colMap = new Map();

    for (let inner = 0; inner < 9; inner += 1) {
      const rowValue = state.current[index][inner];
      const colValue = state.current[inner][index];

      if (rowValue) {
        const positions = rowMap.get(rowValue) || [];
        positions.push([index, inner]);
        rowMap.set(rowValue, positions);
      }

      if (colValue) {
        const positions = colMap.get(colValue) || [];
        positions.push([inner, index]);
        colMap.set(colValue, positions);
      }
    }

    for (const positions of [...rowMap.values(), ...colMap.values()]) {
      if (positions.length > 1) {
        positions.forEach(([row, col]) => conflicts.add(cellKey(row, col)));
      }
    }
  }

  for (let blockRow = 0; blockRow < 3; blockRow += 1) {
    for (let blockCol = 0; blockCol < 3; blockCol += 1) {
      const blockMap = new Map();

      for (let row = blockRow * 3; row < blockRow * 3 + 3; row += 1) {
        for (let col = blockCol * 3; col < blockCol * 3 + 3; col += 1) {
          const value = state.current[row][col];
          if (!value) continue;

          const positions = blockMap.get(value) || [];
          positions.push([row, col]);
          blockMap.set(value, positions);
        }
      }

      for (const positions of blockMap.values()) {
        if (positions.length > 1) {
          positions.forEach(([row, col]) => conflicts.add(cellKey(row, col)));
        }
      }
    }
  }

  return conflicts;
}

function calculateCompletedNumbers() {
  const completed = new Set();

  for (let value = 1; value <= 9; value += 1) {
    const positions = state.solutionDigitMap.get(value) || [];
    if (positions.length === 9 && positions.every(([row, col]) => state.current[row][col] === value)) {
      completed.add(value);
    }
  }

  return completed;
}

function renderCell(row, col, conflicts, completedNumbers) {
  const value = state.current[row][col];
  const cell = boardEl.children[row * 9 + col];
  const isSelected = state.selectedCell
    && state.selectedCell.row === row
    && state.selectedCell.col === col;

  cell.classList.toggle('selected', Boolean(isSelected));
  cell.classList.toggle('given', state.givens.has(cellKey(row, col)));
  cell.classList.toggle('completed-number', value && completedNumbers.has(value) && value === state.solution[row][col]);
  cell.classList.toggle('conflict', conflicts.has(cellKey(row, col)));

  cell.innerHTML = '';
  if (value) {
    cell.textContent = value;
    return;
  }

  const noteMap = state.notes[row][col];
  if (!noteMap.size) return;

  const notesGrid = document.createElement('div');
  notesGrid.className = 'notes';

  for (let noteValue = 1; noteValue <= 9; noteValue += 1) {
    const span = document.createElement('span');
    const entry = noteMap.get(noteValue);
    if (entry) {
      span.textContent = noteValue;
      if (entry.highlighted) {
        span.classList.add('highlighted');
      }
    }
    notesGrid.appendChild(span);
  }

  cell.appendChild(notesGrid);
}

function renderBoard() {
  const conflicts = calculateConflicts();
  const completedNumbers = calculateCompletedNumbers();

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      renderCell(row, col, conflicts, completedNumbers);
    }
  }
}

function isSolved() {
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (state.current[row][col] !== state.solution[row][col]) {
        return false;
      }
    }
  }

  return true;
}

function updateStatus() {
  if (!state.current.length || !state.solution.length) {
    setStatus(t('statusLoading'));
    return;
  }

  let filled = true;
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (state.current[row][col] === 0) {
        filled = false;
      }
    }
  }

  if (filled && isSolved()) {
    freezeTimer();
    if (state.solutionRevealed) {
      setStatus(t('statusSolutionShown'), 'success');
    } else {
      setStatus(t('statusSolved', { time: formatTime(getElapsedMs(state.timer)) }), 'success');
    }
    return;
  }

  setStatus(t('statusInputPrompt'));
}

function resetBoard(pushHistory = true, restartTimer = false) {
  if (pushHistory) {
    recordStateForUndo();
  }

  state.current = cloneBoard(state.puzzle);
  state.notes = createNotesBoard();
  state.hintCount = 0;
  state.solutionRevealed = false;
  toggleNoteMode(false);
  ensureSelection();

  if (restartTimer) {
    resetAndStartTimer();
  } else {
    updateTimerDisplay();
  }

  renderBoard();
  updateStats();
  updateStatus();
}

function loadNewPuzzle() {
  const clues = Number(document.getElementById('clueCount').value);
  const seedInput = document.getElementById('seed');
  const seedValueRaw = seedInput.value.trim();
  const seedWasRandom = seedValueRaw === '';
  const seedValue = seedWasRandom
    ? Math.floor(Math.random() * 1_000_000_000).toString()
    : seedValueRaw;

  setStatus(t('statusGenerating'));

  const { puzzleBoard, solutionBoard, actualClueCount } = generatePuzzle(clues, seedValue);

  state.puzzle = puzzleBoard;
  state.solution = solutionBoard;
  state.current = cloneBoard(state.puzzle);
  state.notes = createNotesBoard();
  state.givens = new Set();
  state.solutionDigitMap = new Map();
  state.history = [];
  state.future = [];
  state.hintCount = 0;
  state.solutionRevealed = false;
  state.selectedClueCount = actualClueCount;
  state.selectedSeedRaw = seedValue;
  state.selectedSeedWasRandom = seedWasRandom;

  for (let value = 1; value <= 9; value += 1) {
    state.solutionDigitMap.set(value, []);
  }

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (state.puzzle[row][col]) {
        state.givens.add(cellKey(row, col));
      }
      state.solutionDigitMap.get(state.solution[row][col]).push([row, col]);
    }
  }

  toggleNoteMode(false);
  state.selectedCell = { row: 0, col: 0 };
  renderBoard();
  updateStats();
  resetAndStartTimer();
  updateStatus();
}

function revealHint() {
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (state.current[row][col] !== 0) continue;

      recordStateForUndo();
      state.current[row][col] = state.solution[row][col];
      state.notes[row][col].clear();
      state.hintCount += 1;

      renderBoard();
      updateStats();
      updateStatus();
      return;
    }
  }

  setStatus(t('statusNoHint'), 'warning');
}

function showSolution() {
  recordStateForUndo();
  state.current = cloneBoard(state.solution);
  state.notes = createNotesBoard();
  state.solutionRevealed = true;

  renderBoard();
  updateStats();
  updateStatus();
}

function undoAction() {
  if (!state.history.length) return;

  state.future.push(captureSnapshot(state));
  const previous = state.history.pop();
  restoreState(previous);
}

function redoAction() {
  if (!state.future.length) return;

  state.history.push(captureSnapshot(state));
  const next = state.future.pop();
  restoreState(next);
}

function handleKey(event) {
  if (isTypingTarget(event.target)) {
    return;
  }

  if (event.key === 'ArrowUp') {
    moveSelection(-1, 0);
    event.preventDefault();
    return;
  }

  if (event.key === 'ArrowDown') {
    moveSelection(1, 0);
    event.preventDefault();
    return;
  }

  if (event.key === 'ArrowLeft') {
    moveSelection(0, -1);
    event.preventDefault();
    return;
  }

  if (event.key === 'ArrowRight') {
    moveSelection(0, 1);
    event.preventDefault();
    return;
  }

  if (event.key === 'Enter') {
    toggleNoteMode();
    return;
  }

  if (event.ctrlKey && event.key.toLowerCase() === 'z') {
    event.preventDefault();
    undoAction();
    return;
  }

  if (event.ctrlKey && (event.key.toLowerCase() === 'y' || (event.shiftKey && event.key.toLowerCase() === 'z'))) {
    event.preventDefault();
    redoAction();
    return;
  }

  ensureSelection();

  const digitMatch = /^(?:Digit|Numpad)([1-9])$/.exec(event.code);
  if (digitMatch) {
    const value = Number(digitMatch[1]);
    applyValue(value, { highlightNote: state.noteMode && event.shiftKey });
    event.preventDefault();
    return;
  }

  if (event.key === 'Backspace' || event.key === 'Delete' || event.key === '0') {
    applyValue(0);
    event.preventDefault();
  }
}

document.getElementById('newGame').addEventListener('click', loadNewPuzzle);
document.getElementById('reset').addEventListener('click', () => resetBoard(true, true));
document.getElementById('hint').addEventListener('click', revealHint);
document.getElementById('solve').addEventListener('click', showSolution);
undoEl.addEventListener('click', undoAction);
redoEl.addEventListener('click', redoAction);
document.addEventListener('keydown', handleKey);

buildBoard();
buildPad();
initLanguage();
setStatus(t('statusLoading'));
updateTimerDisplay();
loadNewPuzzle();
