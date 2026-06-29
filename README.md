# Sudoku HTML

Sudoku HTML is a browser-based Sudoku game that you can play as a single `Sudoku.html` file, from the online page, or as a browser extension. This repository contains the split source code, extension packaging files, tests, build script, documentation, and GitHub Actions workflows used for online publishing and release distribution.

| Desktop view | Mobile view |
| --- | --- |
| <img src="./docs/screenshot_desktop_en.JPG" alt="Sudoku on desktop" width="520" /> | <img src="./docs/screenshot_mobile_en.jpeg" alt="Sudoku on mobile" width="160" /> |

## Play the Game

Choose the version that fits how you want to play:

- **Download the HTML file**: [Sudoku.html](https://github.com/piccoripico/sudoku-html/releases/latest/download/Sudoku.html)  
  Open the downloaded file directly in your browser to play offline.
- **Play online**: <https://piccoripico.github.io/sudoku-html/>  
  Open the same game online. After the page has loaded, you can continue playing without an internet connection during that session.
- **Install the Edge extension**: <https://microsoftedge.microsoft.com/addons/detail/cgcjekopfndblbbdokilihilppanmkpo>  
  Once installed, click the toolbar icon to open Anytime Sudoku in a regular browser tab and play without an internet connection.

## Highlights

- **Portable**: The entire app is packaged into a single `Sudoku.html` file, so you can keep it on your computer or phone and take it anywhere.
- **Offline**: The app runs offline, so you can play without an internet connection after downloading `Sudoku.html` or installing the extension.
- **Desktop / mobile UI**: The layout is designed to work comfortably on both wide desktop screens and tall mobile screens.
- **Number of completed boards**: A single template family alone can generate more than about 609.5 billion transformed completed boards. The app uses multiple template families, so the overall variety is even larger.
- **Board reproducibility**: Enter the same seed value with the same clue count to recreate the same puzzle, including the clue layout.
- **Notes, hints, and undo history**: Use notes, red notes, hints, solution display, and Undo/Redo while solving.
- **Save and resume later**: You can save your current board, notes, timer, and Undo/Redo history as a local JSON file. Loading the saved file lets you resume from the same state.
- **No account or external service**: There are no ads, payments, accounts, analytics, gameplay data uploads, or user data collection.

## Documents

- [Repository Guide (Japanese)](./README.ja.md)
- [Game Guide (English)](./docs/GAME_GUIDE.md)
- [Game Guide (Japanese)](./docs/GAME_GUIDE.ja.md)

## Development

1. Run `npm ci`.
2. Run `npm test`.
3. Run `npm run build`.
4. The first time you use browser tests, run `npm run test:e2e:install`.
5. Run `npm run test:e2e` for browser smoke tests, or `npm run verify` for the full local check.

`npm run build` generates `dist/Sudoku.html` and the unpacked extension package at `dist/extension`.

## Automation

GitHub Actions automates testing, Pages deployment, and release asset generation.

- CI: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) runs for pull requests targeting `main`, and you can also start it manually from the `Actions` tab.
- Pages: [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) runs on pushes to `main`, builds `dist/Sudoku.html`, and publishes it to GitHub Pages at <https://piccoripico.github.io/sudoku-html/>.
- Release: [`.github/workflows/release.yml`](./.github/workflows/release.yml) runs when you push a version tag such as `v1.2.3` and automatically attaches `Sudoku.html` to the GitHub Release.
