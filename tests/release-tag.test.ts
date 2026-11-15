import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const version = (JSON.parse(readFileSync('package.json', 'utf8')) as { version: string }).version;
const verifier = path.join('.build', 'tools', 'scripts', 'check-release-tag.js');

function verify(tag: string) {
  return spawnSync(process.execPath, [verifier, tag], { encoding: 'utf8' });
}

test('only a release tag matching package.json is accepted', () => {
  assert.equal(verify(`v${version}`).status, 0);
  for (const tag of ['v0.0.0', `Sudoku_v${version}`, 'v2.0.0', 'invalid']) {
    assert.notEqual(verify(tag).status, 0, `${tag} must be rejected`);
  }
});

test('release workflow enforces the same version check before publishing', () => {
  const workflow = readFileSync('.github/workflows/release.yml', 'utf8');
  assert.doesNotMatch(workflow, /'Sudoku_\*'/);
  assert.match(workflow, /check:release-tag/);
});
