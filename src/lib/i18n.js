export const I18N = {
  ja: {
    title: '数独 (Sudoku)',
    clueLabel: 'ヒント数',
    seedLabel: 'シード',
    langLabel: '言語',
    seedPlaceholder: 'オプション',
    newGame: '新しい盤面を作成',
    reset: '最初の状態に戻す',
    hint: 'ヒントを埋める',
    solve: '答えを表示',
    padTitle: '数字パッド',
    undo: '↩️ １つ戻す',
    redo: '↪️ １つ進める',
    noteButton: '✏️ メモ',
    clearButton: '消去',
    boardAriaLabel: '数独盤面',
    hintText: 'キーボードの 1-9 で入力、0 / Delete / Backspace で削除、矢印で移動、Enter でメモモード切替ができます。メモモード時は右クリックまたは Shift+1〜9 で赤色メモにできます。',
    statusLoading: '読み込み中...',
    statusGenerating: '生成中...',
    statusInputPrompt: '数字を入力してください。',
    statusNoHint: 'ヒントを出せるマスがありません。',
    statusSolved: 'おめでとうございます！すべて正解です。（タイム: {time}）',
    statusSolutionShown: '解答を表示しました。',
    statsHintUsed: 'ヒント使用: {count}回',
    statsSolutionShown: '解答表示: {state}',
    statsClues: '実ヒント数: {count}',
    statsSeed: 'シード: {seed}',
    yes: 'あり',
    no: 'なし',
    randomSeed: 'ランダム({seed})',
    clueOptionLabels: {
      17: '17 (最難関)',
      24: '24 (かなり難しい)',
      28: '28 (難しめ)',
      32: '32 (標準)',
      38: '38 (易しめ)',
      44: '44 (かなり易しい)'
    }
  },
  en: {
    title: 'Sudoku',
    clueLabel: 'Clues',
    seedLabel: 'Seed',
    langLabel: 'Language',
    seedPlaceholder: 'Optional',
    newGame: 'New Puzzle',
    reset: 'Reset to Start',
    hint: 'Fill a Hint',
    solve: 'Show Solution',
    padTitle: 'Number Pad',
    undo: '↩️ Undo',
    redo: '↪️ Redo',
    noteButton: '✏️ Note',
    clearButton: 'Clear',
    boardAriaLabel: 'Sudoku board',
    hintText: 'Use 1-9 to input, 0 / Delete / Backspace to clear, arrow keys to move, and Enter to toggle note mode. In note mode, right-click or Shift+1-9 creates red notes.',
    statusLoading: 'Loading...',
    statusGenerating: 'Generating...',
    statusInputPrompt: 'Enter numbers to solve the puzzle.',
    statusNoHint: 'No empty cell is available for a hint.',
    statusSolved: 'Congratulations! Puzzle solved. (Time: {time})',
    statusSolutionShown: 'Solution displayed.',
    statsHintUsed: 'Hints used: {count}',
    statsSolutionShown: 'Solution shown: {state}',
    statsClues: 'Actual clues: {count}',
    statsSeed: 'Seed: {seed}',
    yes: 'yes',
    no: 'no',
    randomSeed: 'random({seed})',
    clueOptionLabels: {
      17: '17 (hardest)',
      24: '24 (very hard)',
      28: '28 (hard)',
      32: '32 (normal)',
      38: '38 (easy)',
      44: '44 (very easy)'
    }
  }
};

export function translate(lang, key, vars = {}) {
  const dict = I18N[lang] || I18N.ja;
  const template = dict[key] ?? I18N.ja[key] ?? '';
  return String(template).replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
}
