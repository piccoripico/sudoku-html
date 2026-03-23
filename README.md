# Sudoku (数独)

## English

### Quick Start

Open [`dist/Sudoku.html`](dist/Sudoku.html) directly in your browser and start playing right away.

### Screenshot

![screenshot_board_en](docs/screenshot_board_en.JPG)

### Overview

This is a browser-based Sudoku game distributed as a **single HTML file**.
You can switch between **Japanese / English** using the language selector.

### Getting Started

1. Clone or download this repository.
2. Open [`dist/Sudoku.html`](dist/Sudoku.html) in Chrome, Edge, or another browser.
3. Start playing immediately.

### Repository Structure

- [`src/`](src): Source files for HTML, CSS, and JavaScript
- [`dist/`](dist): Distribution files
- [`tests/`](tests): Automated tests for puzzle generation and state handling
- [`scripts/build.mjs`](scripts/build.mjs): Builds the split source into a single-file `dist/Sudoku.html`
- [`docs/`](docs): Screenshots and supplementary documentation assets

### Development

1. Run `npm run build`.
2. Open [`dist/Sudoku.html`](dist/Sudoku.html).
3. Run `npm test` when changing puzzle generation or state logic.

### Controls (Mouse)

- **Enter a number**: Click `1` to `9` on the number pad
- **Clear**: Click `Clear` on the number pad
- **Move to a cell**: Click the cell on the board where you want to enter a number
- **Toggle note mode**: Click the `✏️ Note` button on the number pad
- **Red notes**: While in note mode, **right-click** `1` to `9` on the number pad
- **Undo / Redo**: Click the `↩️ Undo` / `↪️ Redo` buttons

### Controls (Keyboard)

- **Enter a number**: `1` to `9`
- **Clear**: `0` / `Backspace` / `Delete`
- **Move between cells**: Arrow keys
- **Toggle note mode**: `Enter`
- **Red notes**: `Shift+1` to `9`
- **Undo / Redo**: `Ctrl+Z` / `Ctrl+Y` (`Ctrl+Shift+Z`)

### Main Features

- **Clues**: The selected clue count is used exactly for new puzzles.
- **Unique solution**: Every generated puzzle keeps a unique solution.
- **Seed**: Entering the same seed value generates the same puzzle.
- **Timer**: Measures the time from puzzle generation until completion.
- **Duplicate number warning**: Highlights duplicate numbers.
- **Highlight completed numbers**: Highlights numbers that have been fully completed.
- **Reset to Start**: Resets the puzzle to its original starting state.
- **Fill a Hint**: Adds another hint during play.
- **Show Solution**: Displays the solution.

---

## 日本語

### はじめかた

[`dist/Sudoku.html`](dist/Sudoku.html) を直接ブラウザで開けば、そのままプレイできます。

### スクリーンショット

![screenshot_board_ja](docs/screenshot_board_ja.JPG)

### 概要

ブラウザ向けの数独ゲームです。配布物は **単一 HTML ファイル** で、言語セレクタで **Japanese / English** を切り替えできます。

### 遊び方

1. このリポジトリを clone またはダウンロードします。
2. [`dist/Sudoku.html`](dist/Sudoku.html) を Chrome や Edge などのブラウザで開きます。
3. すぐに数独をはじめられます。

### リポジトリ構成

- [`src/`](src): HTML / CSS / JavaScript のソース
- [`dist/`](dist): 配布用ファイル
- [`tests/`](tests): 盤面生成や状態管理の自動テスト
- [`scripts/build.mjs`](scripts/build.mjs): 分割したソースを単一ファイルの `dist/Sudoku.html` に変換するビルドスクリプト
- [`docs/`](docs): スクリーンショットなどの補助資料

### 開発方法

1. `npm run build` を実行します。
2. [`dist/Sudoku.html`](dist/Sudoku.html) を開きます。
3. 盤面生成や状態管理を変更したときは `npm test` を実行します。

### 操作方法（マウス）

- **数字入力**: 数字パッドの `1`〜`9` をクリック
- **消去**: 数字パッドの `消去` をクリック
- **セル移動**: 盤面の入力したいマスをクリック
- **メモ切替**: 数字パッドの `✏️ メモ` ボタンをクリック
- **赤色メモ**: メモモード時に数字パッドの `1`〜`9` を**右クリック**
- **1つ戻る / 1つ進める**: `↩️ １つ戻す` / `↪️ １つ進める` ボタンをクリック

### 操作方法（キーボード）

- **数字入力**: `1`〜`9`
- **消去**: `0` / `Backspace` / `Delete`
- **セル移動**: 矢印キー
- **メモ切替**: `Enter`
- **赤色メモ**: `Shift+1`〜`9`
- **1つ戻る / 1つ進める**: `Ctrl+Z` / `Ctrl+Y`（`Ctrl+Shift+Z`）

### 主な機能

- **ヒント数**: 選択したヒント数どおりに新しい盤面を生成します。
- **一意解**: 生成される盤面は常に一意解です。
- **シード**: 同じシード値を入力すると、同じ盤面を生成できます。
- **タイマー**: 盤面を作成してから解答するまでの時間を計測します。
- **重複数字の警告**: 重複する数字をハイライト表示します。
- **完成数字の強調**: 完成した数字をハイライト表示します。
- **最初の状態に戻す**: 盤面を最初の状態にリセットします。
- **ヒントを埋める**: プレイ中にヒントを増やせます。
- **答えを表示**: 解答を表示します。
