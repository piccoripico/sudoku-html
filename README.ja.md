# 数独 (Sudoku) HTML

数独 (Sudoku) HTML は、単一の `Sudoku.html` ファイル、オンラインページ、ブラウザ拡張機能のいずれでも遊べるブラウザ向け数独ゲームです。このリポジトリには、分割されたソースコード、拡張機能用パッケージ、テスト、ビルドスクリプト、ドキュメント、そしてオンライン公開やリリース配布に使う GitHub Actions workflow が含まれています。

| デスクトップ表示 | モバイル表示 |
| --- | --- |
| <img src="./docs/screenshot_desktop_ja.JPG" alt="デスクトップで見た数独画面" width="520" /> | <img src="./docs/screenshot_mobile_ja.jpeg" alt="モバイルで見た数独画面" width="160" /> |

## プレイ方法

遊び方は次の 3 つです。

- **HTML ファイルをダウンロードする**: [Sudoku.html](https://github.com/piccoripico/sudoku-html/releases/latest/download/Sudoku.html)  
  ダウンロードしたファイルをブラウザで直接開けば、オフラインで遊べます。
- **オンラインで遊ぶ**: <https://piccoripico.github.io/sudoku-html/>  
  同じゲームをオンラインで開けます。ページを開いた後は、そのセッション中、インターネット接続なしで遊べます。
- **Edge拡張機能をインストールする**: <https://microsoftedge.microsoft.com/addons/detail/cgcjekopfndblbbdokilihilppanmkpo>  
  インストールしておけば、ツールバーアイコンからワンクリックで「いつでも数独」を通常のブラウザタブに開き、インターネット接続なしで遊べます。

## 特徴

- **ポータブル**: アプリ全体が 1 つの `Sudoku.html` にまとまっているので、パソコンやスマホに保存しておけば、どこにでも持ち運べます。
- **オフライン**: プログラムはオフラインで動くので、 `Sudoku.html` をダウンロードした後や拡張機能をインストールした後は、インターネット接続なしで遊べます。
- **デスクトップ / モバイル UI**: 横幅の広いデスクトップ画面でも、縦長のモバイル画面でも使いやすいレイアウトです。
- **完成盤面の数**: 1つのテンプレート系統だけでも、変換によって少なくとも約6095億通りの完成盤面を生成できます。実際の実装では複数のテンプレート系統を使うため、全体のバリエーションはさらに多くなります。
- **盤面の再現**: 同じシード値を入力して盤面を作成すれば、ヒントの配置も含めて、同じ盤面を再現できます。
- **メモ、ヒント、Undo 履歴**: メモ、赤メモ、ヒント、解答表示、Undo/Redo を使いながら解けます。
- **途中保存と再開**: 現在の盤面、メモ、タイマー、Undo/Redo の履歴をローカル JSON ファイルとして保存できます。保存したファイルを読み込むと、同じ状態で再開できます。
- **アカウントや外部サービス不要**: 広告、課金、アカウント、分析、ゲームデータの外部送信、ユーザーデータの収集はありません。

## ドキュメント

- [Repository Guide (English)](./README.md)
- [ゲームガイド（英語）](./docs/GAME_GUIDE.md)
- [ゲームガイド（日本語）](./docs/GAME_GUIDE.ja.md)

## 開発

1. `npm ci` を実行します。
2. `npm test` を実行します。
3. `npm run build` を実行します。
4. ブラウザテストを初めて使うときは、`npm run test:e2e:install` を実行します。
5. ブラウザのスモークテストは `npm run test:e2e`、一連の確認は `npm run verify` で実行できます。

`npm run build` は `dist/Sudoku.html` と、展開済みの拡張機能パッケージ `dist/extension` を生成します。

## 自動化

GitHub Actions により、テスト、Pages 公開、Release asset 生成を自動化しています。

- CI: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) は `main` 向けの pull request で実行され、`Actions` タブから手動実行もできます。
- Pages: [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) は `main` への push で実行され、`dist/Sudoku.html` をビルドして GitHub Pages <https://piccoripico.github.io/sudoku-html/> に公開します。
- Release: [`.github/workflows/release.yml`](./.github/workflows/release.yml) は `v1.2.3` のようなバージョンタグ push で実行され、`Sudoku.html` を GitHub Release に自動添付します。
