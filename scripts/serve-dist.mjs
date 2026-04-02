import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distFile = path.resolve(__dirname, '../dist/Sudoku.html');
const port = Number(process.env.PORT || 4173);

async function readDistFile() {
  return fs.readFile(distFile);
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host || '127.0.0.1'}`);
  const pathname = requestUrl.pathname;

  if (pathname !== '/' && pathname !== '/Sudoku.html') {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not Found');
    return;
  }

  try {
    const body = await readDistFile();
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(body);
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(`Failed to read dist/Sudoku.html: ${error.message}`);
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Serving dist/Sudoku.html at http://127.0.0.1:${port}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
