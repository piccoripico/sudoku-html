# 数独 (Sudoku) HTML

<p align="center">
  <img src="./docs/screenshot_pc_ja.JPG" alt="PCで見た数独画面" width="68%" />
  <img src="./docs/screenshot_smartphone_ja.png" alt="スマホで見た数独画面" width="18%" />
</p>

## ドキュメント

- [Repository Guide (English)](./README.md)
- [ゲームガイド（英語）](./docs/GAME_GUIDE.md)
- [ゲームガイド（日本語）](./docs/GAME_GUIDE.ja.md)

## 概要

このリポジトリには、ブラウザ向け数独ゲームのソースコード、テスト、ビルドスクリプト、GitHub Actions workflow が含まれています。
配布物は、`dist/Sudoku.html` として生成される単一 HTML ファイルです。

## リポジトリ構成

- [`src/`](./src): HTML / CSS / JavaScript のソース
- [`tests/`](./tests): 盤面生成や状態管理の自動テスト
- [`scripts/build.mjs`](./scripts/build.mjs): 分割したソースを単一ファイルの `dist/Sudoku.html` に変換するビルドスクリプト
- [`docs/`](./docs): スクリーンショットや利用者向けドキュメント
- [`.github/workflows/`](./.github/workflows): CI、Pages、リリースの自動化

## 開発方法

1. `npm test` を実行します。
2. `npm run build` を実行します。
3. ビルド結果を試したい場合は、ローカルの `dist/Sudoku.html` を開きます。

## CI

[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) の CI workflow は、`main` 向けの pull request で実行されます。
必要なら `Actions` タブから `workflow_dispatch` で手動実行することもできます。

## 配布方法

`dist/` は意図的に Git 管理対象から外しています。
ローカル確認では `dist/Sudoku.html` をビルドしてブラウザで直接開いてください。
オンライン公開には、GitHub Actions から GitHub Pages へ自動デプロイする方法が使えます。
ダウンロード配布では、release workflow が生成した GitHub Release asset を使うか、ローカルで生成した `dist/Sudoku.html` を手動でアップロードします。

## GitHub Pages

このリポジトリには [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) という Pages 専用 workflow を追加しています。
`main` に push すると、GitHub Actions がテストを実行し、`dist/Sudoku.html` をビルドし、`public/index.html` にコピーして GitHub Pages にデプロイします。
つまり、pull request の段階では CI が確認を行い、マージ後に `main` へ入った変更は Pages workflow が公開します。
公開 URL: <https://piccoripico.github.io/sudoku-html/>

有効化するには、リポジトリ設定で次を行ってください。

1. `Settings -> Pages` を開きます。
2. `Build and deployment` の `Source` を `GitHub Actions` にします。
3. `main` に push するか、`Actions` タブから `Pages` workflow を手動実行します。

## リリース方法

1. `Sudoku_v1.1` や `v1.1.0` のようなリリース用タグを作成します。
2. そのタグを GitHub に push します。
3. GitHub Actions がテストを実行し、`dist/Sudoku.html` をビルドして GitHub Release に自動添付します。

## ゲームの説明

この README はリポジトリ説明に寄せています。
遊び方、操作方法、スクリーンショットの説明は別ドキュメントに切り出しています。

- [ゲームガイド（英語）](./docs/GAME_GUIDE.md)
- [ゲームガイド（日本語）](./docs/GAME_GUIDE.ja.md)
