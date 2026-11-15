import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const css = readFileSync('src/styles.css', 'utf8');
const html = readFileSync('src/index.html', 'utf8');

test('desktop viewport-fit uses dynamic viewport height without hiding the header', () => {
  assert.match(css, /100dvh/);
  assert.match(css, /max-height:\s*980px/);
  assert.doesNotMatch(css, /\.focus-mode/);
  assert.match(html, /class="hero"/);
  assert.match(html, /id="timer"/);
  assert.doesNotMatch(html, /id="focusToggle"|id="menuToggle"/);
});
