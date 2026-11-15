import { readFile } from 'node:fs/promises';

const packageJson: { version: string } = JSON.parse(await readFile('package.json', 'utf8'));
const expected = `v${packageJson.version}`;
const actual = process.argv[2];
if (actual !== expected) {
  throw new Error(`Release tag must match package.json: expected ${expected}, received ${actual ?? '(missing)'}.`);
}
console.log(`Release tag matches package.json: ${actual}`);
