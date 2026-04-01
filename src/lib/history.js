import { captureTimerSnapshot, restoreTimerFromSnapshot } from './timer.js';

export function createNotesBoard() {
  return Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Map()));
}

export function cloneBoard(board) {
  return board.map((row) => [...row]);
}

export function cloneNotes(notesBoard) {
  return notesBoard.map((row) => row.map((noteMap) => new Map(noteMap)));
}

export function captureSnapshot(state, now = Date.now()) {
  return {
    current: cloneBoard(state.current),
    notes: cloneNotes(state.notes),
    hintCount: state.hintCount,
    solutionRevealed: state.solutionRevealed,
    noteMode: state.noteMode,
    highlightNoteMode: state.highlightNoteMode,
    selectedCell: state.selectedCell ? { ...state.selectedCell } : null,
    timer: captureTimerSnapshot(state.timer, now)
  };
}

export function restoreSnapshot(state, snapshot, now = Date.now()) {
  state.current = cloneBoard(snapshot.current);
  state.notes = cloneNotes(snapshot.notes);
  state.hintCount = snapshot.hintCount;
  state.solutionRevealed = snapshot.solutionRevealed;
  state.noteMode = snapshot.noteMode;
  state.highlightNoteMode = snapshot.highlightNoteMode ?? false;
  state.selectedCell = snapshot.selectedCell ? { ...snapshot.selectedCell } : null;
  restoreTimerFromSnapshot(state.timer, snapshot.timer, now);
}
