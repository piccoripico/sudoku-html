export function createTimerState() {
  return {
    elapsedMs: 0,
    startedAt: null,
    running: false
  };
}

export function getElapsedMs(timer, now = Date.now()) {
  if (!timer.running || timer.startedAt === null) {
    return timer.elapsedMs;
  }
  return timer.elapsedMs + (now - timer.startedAt);
}

export function startTimer(timer, now = Date.now()) {
  timer.elapsedMs = 0;
  timer.startedAt = now;
  timer.running = true;
}

export function pauseTimer(timer, now = Date.now()) {
  if (!timer.running || timer.startedAt === null) return;
  timer.elapsedMs += now - timer.startedAt;
  timer.startedAt = null;
  timer.running = false;
}

export function captureTimerSnapshot(timer, now = Date.now()) {
  return {
    elapsedMs: getElapsedMs(timer, now),
    running: timer.running
  };
}

export function restoreTimerFromSnapshot(timer, snapshot, now = Date.now()) {
  timer.elapsedMs = snapshot.elapsedMs;
  timer.running = Boolean(snapshot.running);
  timer.startedAt = timer.running ? now : null;
}
