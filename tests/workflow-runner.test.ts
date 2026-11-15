import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const playwrightJobs = [
  ['pages.yml', 'build'],
  ['ci.yml', 'verify'],
  ['screenshots.yml', 'capture'],
  ['release.yml', 'release']
] as const;

test('workflows running Playwright use the supported Ubuntu 24.04 runner', () => {
  for (const [file, jobName] of playwrightJobs) {
    const lines = readFileSync(`.github/workflows/${file}`, 'utf8').split(/\r?\n/);
    const start = lines.indexOf(`  ${jobName}:`);
    assert.notEqual(start, -1, `${file}: missing ${jobName} job`);
    const next = lines.slice(start + 1).findIndex((line) => /^  [\w-]+:$/.test(line));
    const job = lines.slice(start + 1, next < 0 ? undefined : start + 1 + next);
    assert.ok(job.some((line) => line.includes('npx playwright install --with-deps chromium')), `${file}: missing Playwright installer`);
    assert.ok(job.includes('    runs-on: ubuntu-24.04'), `${file}: Playwright job must use ubuntu-24.04`);
  }
});
