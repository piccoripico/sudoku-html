import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

const importPattern = /^\s*import\s+[^'"]+['"](.+)['"];\s*$/gm;

function normalizeLineEndings(source) {
  return source.replace(/\r\n/g, '\n');
}

function escapeInlineScript(source) {
  return source.replace(/<\/script/gi, '<\\/script');
}

function escapeInlineStyle(source) {
  return source.replace(/<\/style/gi, '<\\/style');
}

async function bundleJavaScript(entryFile) {
  const visited = new Set();
  const chunks = [];

  async function visit(modulePath) {
    const absolutePath = path.resolve(modulePath);
    if (visited.has(absolutePath)) {
      return;
    }
    visited.add(absolutePath);

    const source = normalizeLineEndings(await readFile(absolutePath, 'utf8'));
    const imports = [...source.matchAll(importPattern)].map((match) => match[1]);

    for (const dependency of imports) {
      if (!dependency.startsWith('.')) {
        throw new Error(`Only relative imports are supported in the build script: ${dependency}`);
      }
      await visit(path.resolve(path.dirname(absolutePath), dependency));
    }

    const withoutImports = source.replace(importPattern, '');
    const withoutExports = withoutImports.replace(/^\s*export\s+/gm, '');
    const label = path.relative(rootDir, absolutePath).replace(/\\/g, '/');
    chunks.push(`// ${label}\n${withoutExports.trim()}\n`);
  }

  await visit(entryFile);

  return [
    '(() => {',
    '\'use strict\';',
    '',
    ...chunks,
    '})();',
    ''
  ].join('\n');
}

async function build() {
  const htmlTemplate = normalizeLineEndings(await readFile(path.join(srcDir, 'index.html'), 'utf8'));
  const cssSource = normalizeLineEndings(await readFile(path.join(srcDir, 'styles.css'), 'utf8'));
  const jsSource = await bundleJavaScript(path.join(srcDir, 'main.js'));

  const output = htmlTemplate
    .replace('<link rel="stylesheet" href="./styles.css" />', `<style>\n${escapeInlineStyle(cssSource)}\n</style>`)
    .replace('<script type="module" src="./main.js"></script>', `<script>\n${escapeInlineScript(jsSource)}\n</script>`);

  await mkdir(distDir, { recursive: true });
  await writeFile(path.join(distDir, 'Sudoku.html'), output, 'utf8');
}

await build();
