# 数独 (Sudoku) HTML

数独 (Sudoku) HTML は、単一の `Sudoku.html` ファイルだけを使って遊べるブラウザ向け数独ゲームです。このリポジトリには、分割されたソースコード、テスト、ビルドスクリプト、ドキュメント、そしてオンライン公開やリリース配布に使う GitHub Actions workflow が含まれています。

| デスクトップ表示 | モバイル表示 |
| --- | --- |
| <img src="./docs/screenshot_desktop_ja.JPG" alt="デスクトップで見た数独画面" width="520" /> | <img src="./docs/screenshot_mobile_ja.jpeg" alt="モバイルで見た数独画面" width="160" /> |

## プレイ方法

**HTML ファイルをダウンロードする**: [Sudoku.html](https://github.com/piccoripico/sudoku-html/releases/latest/download/Sudoku.html)

- ダウンロードした `Sudoku.html` は、ブラウザで直接開けばオフラインで遊べます。

> **オンラインで遊ぶ**: <https://piccoripico.github.io/sudoku-html/>
>
> - `Sudoku.html` と同じプログラムを、オンラインで開くこともできます。
> - ページを開いた後は、そのセッション中、インターネット接続なしで遊べます。

## 特徴

- **ポータブル**: アプリ全体が 1 つの `Sudoku.html` にまとまっているので、パソコンやスマホに保存しておけば、どこにでも持ち運べます。
- **オフライン**: プログラムはオフラインで動くので、 `Sudoku.html` をダウンロードした後は、インターネット接続なしで遊べます。
- **デスクトップ / モバイル UI**: 横幅の広いデスクトップ画面でも、縦長のモバイル画面でも使いやすいレイアウトです。
- **完成盤面の数**: 1つのテンプレート系統だけでも、変換によって少なくとも約6095億通りの完成盤面を生成できます。実際の実装では複数のテンプレート系統を使うため、全体のバリエーションはさらに多くなります。
- **盤面の再現**: 同じシード値を入力して盤面を作成すれば、ヒントの配置も含めて、同じ盤面を再現できます。
- **途中保存と再開**: 現在の盤面、メモ、タイマー、Undo/Redo の履歴を保存できます。保存したファイルを読み込むと、同じ状態で再開できます。

## ドキュメント

- [Repository Guide (English)](./README.md)
- [ゲームガイド（英語）](./docs/GAME_GUIDE.md)
- [ゲームガイド（日本語）](./docs/GAME_GUIDE.ja.md)

## リポジトリ構成

- [`src/`](./src): HTML / CSS / JavaScript のソース
- [`tests/`](./tests): 盤面生成や状態管理の自動テスト
- [`scripts/build.mjs`](./scripts/build.mjs): 分割したソースを単一ファイルの `dist/Sudoku.html` に変換するビルドスクリプト
- [`docs/`](./docs): スクリーンショットや利用者向けドキュメント
- [`.github/workflows/`](./.github/workflows): CI、Pages、リリースの自動化

## 開発

1. `npm ci` を実行します。
2. `npm test` を実行します。
3. `npm run build` を実行します。
4. ブラウザテストを初めて使うときは、`npm run test:e2e:install` を実行します。
5. ブラウザのスモークテストは `npm run test:e2e`、一連の確認は `npm run verify` で実行できます。

`dist/Sudoku.html` は release workflow がソースから生成します。

## 自動化

GitHub Actions により、テスト、Pages 公開、Release asset 生成を自動化しています。

- CI: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) は `main` 向けの pull request で実行され、`Actions` タブから手動実行もできます。
- Pages: [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) は `main` への push で実行され、`dist/Sudoku.html` をビルドして GitHub Pages <https://piccoripico.github.io/sudoku-html/> に公開します。
- Release: [`.github/workflows/release.yml`](./.github/workflows/release.yml) は `v1.2.3` のようなバージョンタグ push で実行され、`Sudoku.html` を GitHub Release に自動添付します。
