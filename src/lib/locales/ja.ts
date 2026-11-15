export const JA = {
    title: '数独 (Sudoku)',
    clueLabel: 'ヒント数',
    seedLabel: 'シード（空白でランダム）',
    langLabel: '言語',
    themeLabel: '表示',
    themeSystem: 'システム設定',
    themeLight: 'ライト',
    themeDark: 'ダーク',
    preferenceSaveLabel: '設定保存',
    preferenceSaveTitle: 'ヒント数、シード、言語、表示をこのブラウザに保存',
    seedPlaceholder: 'オプション（空白でランダム）',
    newGame: '新しい盤面を作成',
    reset: '最初の状態に戻す',
    hint: 'ヒントを埋める',
    solve: '答えを表示',
    saveGame: '保存',
    loadGame: '読込',
    helpButton: 'ヘルプ',
    helpClose: '閉じる',
    highlightSettingsButton: '設定',
    highlightSettingsTitle: 'ハイライト設定',
    highlightCompletedToggle: 'そろった数字をハイライト',
    highlightDuplicateToggle: '重複した数字をハイライト',
    padTitle: '数字パッド',
    undo: '↩️ １つ戻す',
    redo: '↪️ １つ進める',
    noteButton: '✏️ メモ',
    redNoteButton: '🔴 赤メモ',
    clearButton: 'クリア',
    boardAriaLabel: '数独盤面',
    padHelpLine1: '1〜9：選択マスに数字を入力。',
    padHelpLine2: '✏️ メモ：候補を入力。（🔴 赤メモ／右クリック：赤い候補。）',
    statusLoading: '読み込み中...',
    statusGenerating: '生成中...',
    statusInputPrompt: '数字を入力してください。',
    statusNoHint: 'ヒントを出せるマスがありません。',
    statusSolved: 'おめでとうございます！すべて正解です。（タイム: {time}）',
    statusSolutionShown: '解答を表示しました。',
    statusSaveSuccess: '現在の状態を保存しました。',
    statusSaveError: '状態を保存できませんでした。',
    statusSaveUnavailable: '保存できる盤面がありません。',
    statusLoadSuccess: '保存した状態を読み込みました。',
    statusLoadError: '保存ファイルを読み込めませんでした。',
    statsHintUsed: 'ヒントを埋めた数: {count}',
    statsSolutionShown: '解答表示: {state}',
    statsClues: 'ヒント数: {count}',
    statsSeed: 'シード: {seed}',
    yes: 'あり',
    no: 'なし',
    randomSeed: 'ランダム({seed})',
    helpTitle: '遊び方',
    helpSections: [
      {
        items: [
          { label: 'はじめに', text: '盤面のマスを選んで、1から9までの数字を入力してください。' },
          { label: 'ゴール', text: 'タテ、ヨコ、太線で囲まれた3x3のブロックのどれにも、1から9までの数字が1つずつ入れば完成です。' },
          { label: '正解は1つ', text: '生成される盤面はすべて、正解は1つのみです。' },
          { label: 'ハイライト', text: '重複する数字と、9個すべて正しく埋まった数字は、ハイライト表示されます。' },
          { label: 'オフライン', text: 'オフラインで遊べます。ゲームプレイ中の操作はインターネット通信を生じさせません。' }
        ]
      },
      {
        title: '盤面上部にあるコントロールとボタン',
        items: [
          { label: 'ヒント数', text: '新しい盤面を作るときの初期ヒント数を選びます。' },
          { label: 'シード', text: '同じ値を入れると、同じ盤面を再生成できます。空欄ならランダムです。' },
          { label: '言語', text: '画面表示の言語を切り替えます。' },
          { label: '表示', text: 'システム設定、ライト、ダークから画面の配色を選びます。システム設定ではOSやブラウザの配色設定に追従します。' },
          { label: '設定保存', text: 'ONにすると、ヒント数、シード、言語、表示、ハイライト2項目をこのブラウザに保存し、次回起動時に復元します。初期状態はOFFです。OFFにすると保存済みの設定を削除します。' },
          { label: '新しい盤面を作成', text: '現在の設定で新しい数独を生成します。' },
          { label: '最初の状態に戻す', text: '開始時点の盤面に戻します。タイマーも最初からやり直します。' },
          { label: 'ヒントを埋める', text: '空いているマスを 1 つだけ正解で埋めます。' },
          { label: '答えを表示', text: '完成した解答を表示します。' },
          { label: '設定', text: 'ハイライト2項目の表示切替を開きます。' },
          { label: 'ヘルプ', text: 'ヘルプを開きます。オフラインで読めます。' },
          { label: '保存', text: '現在の盤面、メモ、タイマー、Undo/Redo の履歴を JSON ファイルとして保存します。' },
          { label: '読込', text: '保存した JSON ファイルを読み込み、同じ状態から再開します。' }
        ]
      },
      {
        title: '操作方法（マウス/タップ）',
        items: [
          { label: 'マスを選ぶ', text: '盤面のマスを選びます。' },
          { label: '数字入力', text: '数字パッドで数字を入力します。' },
          { label: 'クリア', text: '選択中のマスを消去します。' },
          { label: '✏️ メモ', text: 'メモ入力モードに切り替えます。メモ入力モード中に数字を入力するとメモを入れられます。' },
          { label: '🔴 赤メモ', text: 'メモ入力を赤色メモに切り替えます。メモ入力モード中に数字をマウスで右クリックしても赤色メモを入れられます。' },
          { label: '↩️ １つ戻す', text: '直前の入力やメモを取り消します。' },
          { label: '↪️ １つ進める', text: '取り消した入力やメモをやり直します。' }
        ]
      },
      {
        title: '操作方法（キーボード）',
        items: [
          { label: '矢印キー', text: '盤面のマスを移動します。' },
          { label: '1〜9', text: '数字を入力します。' },
          { label: '0 / Backspace / Delete', text: '選択中のマスを消去します。' },
          { label: 'Enter', text: 'メモ入力モードに切り替えます。' },
          { label: 'Shift+1〜9', text: '赤色メモを入力します。' },
          { label: 'Ctrl+Z', text: '1つ戻します。' },
          { label: 'Ctrl+Y または Ctrl+Shift+Z', text: '1つ進めます。' }
        ]
      },
      {
        title: '詳細情報',
        items: [
          {
            label: 'GitHub レポジトリ（インターネット接続が必要）',
            href: 'https://github.com/piccoripico/sudoku-html',
            linkText: 'https://github.com/piccoripico/sudoku-html'
          }
        ]
      }
    ],
    clueOptionLabels: {
      17: '17 (最難関)',
      24: '24 (かなり難しい)',
      28: '28 (難しめ)',
      32: '32 (標準)',
      38: '38 (易しめ)',
      44: '44 (かなり易しい)'
    }
} as const;
