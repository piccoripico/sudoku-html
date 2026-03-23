# 数独 (Sudoku) HTML

![数独盤面](./docs/screenshot_board_ja.JPG)

## ドキュメント

- [Repository Guide (English)](./README.md)
- [ゲームガイド（英語）](./docs/GAME_GUIDE.md)
- [ゲームガイド（日本語）](./docs/GAME_GUIDE.ja.md)

## 概要

このリポジトリには、ブラウザ向け数独ゲームのソースコード、テスト、ビルドスクリプト、リリース workflow が含まれています。
配布物は、`dist/Sudoku.html` として生成される単一 HTML ファイルです。

## リポジトリ構成

- [`src/`](./src): HTML / CSS / JavaScript のソース
- [`tests/`](./tests): 盤面生成や状態管理の自動テスト
- [`scripts/build.mjs`](./scripts/build.mjs): 分割したソースを単一ファイルの `dist/Sudoku.html` に変換するビルドスクリプト
- [`docs/`](./docs): スクリーンショットや利用者向けドキュメント
- [`.github/workflows/`](./.github/workflows): CI とリリース自動化

## 開発方法

1. `npm test` を実行します。
2. `npm run build` を実行します。
3. ビルド結果を試したい場合は、ローカルの `dist/Sudoku.html` を開きます。

## 配布方法

`dist/` は意図的に Git 管理対象から外しています。
ローカル確認では `dist/Sudoku.html` をビルドしてブラウザで直接開いてください。
実際の配布では、release workflow が生成した GitHub Release asset を使うか、ローカルで生成した `dist/Sudoku.html` を手動でアップロードします。

## リリース方法

1. `Sudoku_v1.1` や `v1.1.0` のようなリリース用タグを作成します。
2. そのタグを GitHub に push します。
3. GitHub Actions がテストを実行し、`dist/Sudoku.html` をビルドして GitHub Release に自動添付します。

## ゲームの説明

この README はリポジトリ説明に寄せています。
遊び方、操作方法、スクリーンショット、ゲーム機能の説明は別ドキュメントに切り出しています。

- [ゲームガイド（英語）](./docs/GAME_GUIDE.md)
- [ゲームガイド（日本語）](./docs/GAME_GUIDE.ja.md)
