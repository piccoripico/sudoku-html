import type { LocaleDictionary } from './schema.js';

export const ZH_TW = {
  "title": "數獨",
  "clueLabel": "提示數",
  "seedLabel": "種子（留空為隨機）",
  "langLabel": "語言",
  "themeLabel": "主題",
  "themeSystem": "系統設定",
  "themeLight": "淺色",
  "themeDark": "深色",
  "preferenceSaveLabel": "儲存設定",
  "preferenceSaveTitle": "在此瀏覽器儲存提示數、種子、語言、主題與醒目提示",
  "seedPlaceholder": "選填（留空為隨機）",
  "newGame": "新遊戲",
  "reset": "重新開始",
  "hint": "填入提示",
  "solve": "顯示解答",
  "saveGame": "儲存",
  "loadGame": "載入",
  "helpButton": "說明",
  "helpClose": "關閉",
  "highlightSettingsButton": "設定",
  "highlightSettingsTitle": "醒目提示設定",
  "highlightCompletedToggle": "標示已完成的數字",
  "highlightDuplicateToggle": "標示重複的數字",
  "padTitle": "數字鍵盤",
  "undo": "↩️ 復原",
  "redo": "↪️ 重做",
  "noteButton": "✏️ 筆記",
  "redNoteButton": "🔴 紅色筆記",
  "clearButton": "清除",
  "boardAriaLabel": "數獨棋盤",
  "padHelpLine1": "1–9：輸入數字。",
  "padHelpLine2": "✏️ 筆記：加入候選數字。（🔴 紅色筆記或按滑鼠右鍵：加入紅色筆記。）",
  "statusLoading": "載入中…",
  "statusGenerating": "產生中…",
  "statusInputPrompt": "輸入數字來解開數獨。",
  "statusNoHint": "沒有空格可供填入提示。",
  "statusSolved": "恭喜！已完成數獨。（時間：{time}）",
  "statusSolutionShown": "已顯示解答。",
  "statusSaveSuccess": "遊戲已儲存。",
  "statusSaveError": "無法儲存遊戲。",
  "statusSaveUnavailable": "沒有可儲存的遊戲。",
  "statusLoadSuccess": "遊戲已載入。",
  "statusLoadError": "無法載入檔案。",
  "statsHintUsed": "已填提示：{count}",
  "statsSolutionShown": "顯示解答：{state}",
  "statsClues": "提示數：{count}",
  "statsSeed": "種子：{seed}",
  "yes": "是",
  "no": "否",
  "randomSeed": "隨機（{seed}）",
  "helpTitle": "玩法說明",
  "helpSections": [
    {
      "items": [
        {
          "label": "開始遊戲",
          "text": "選取一個空格並輸入1到9的數字。"
        },
        {
          "label": "目標",
          "text": "每一列、每一行及每個3×3區塊都必須恰好包含1到9各一次。"
        },
        {
          "label": "唯一解答",
          "text": "每道產生的數獨題目都只有一個解答。"
        },
        {
          "label": "醒目提示",
          "text": "重複的數字，以及九個正確位置均已填滿的數字會醒目標示。"
        },
        {
          "label": "離線",
          "text": "可離線遊玩，遊戲期間不需要網路連線。"
        }
      ]
    },
    {
      "title": "設定與按鈕",
      "items": [
        {
          "label": "提示數",
          "text": "設定下一題預先填入的數字數量。"
        },
        {
          "label": "種子（留空為隨機）",
          "text": "相同的種子與提示數會產生相同題目；留空則隨機。"
        },
        {
          "label": "語言",
          "text": "切換介面語言。"
        },
        {
          "label": "主題",
          "text": "選擇系統設定、淺色或深色；系統設定會跟隨裝置。"
        },
        {
          "label": "儲存設定",
          "text": "僅啟用時在瀏覽器儲存偏好，停用時會刪除。"
        },
        {
          "label": "新遊戲",
          "text": "依目前設定產生新題目。"
        },
        {
          "label": "重新開始",
          "text": "還原初始棋盤並重新計時。"
        },
        {
          "label": "填入提示",
          "text": "在一個空格填入正確數字。"
        },
        {
          "label": "顯示解答",
          "text": "顯示完整解答。"
        },
        {
          "label": "設定",
          "text": "開啟兩項醒目提示設定。"
        },
        {
          "label": "說明",
          "text": "開啟可離線閱讀的說明。"
        },
        {
          "label": "儲存",
          "text": "將棋盤、筆記、計時與歷史記錄儲存為JSON。"
        },
        {
          "label": "載入",
          "text": "從JSON檔案載入已儲存的遊戲。"
        }
      ]
    },
    {
      "title": "滑鼠與觸控",
      "items": [
        {
          "label": "選取空格",
          "text": "選取一個空格並輸入1到9的數字。"
        },
        {
          "label": "輸入數字",
          "text": "1–9：輸入數字。"
        },
        {
          "label": "清除",
          "text": "清除"
        },
        {
          "label": "✏️ 筆記",
          "text": "✏️ 筆記：加入候選數字。（🔴 紅色筆記或按滑鼠右鍵：加入紅色筆記。）"
        },
        {
          "label": "🔴 紅色筆記",
          "text": "✏️ 筆記：加入候選數字。（🔴 紅色筆記或按滑鼠右鍵：加入紅色筆記。）"
        },
        {
          "label": "↩️ 復原",
          "text": "↩️ 復原"
        },
        {
          "label": "↪️ 重做",
          "text": "↪️ 重做"
        }
      ]
    },
    {
      "title": "鍵盤",
      "items": [
        {
          "label": "↑ ↓ ← →",
          "text": "在格子之間移動。"
        },
        {
          "label": "1–9",
          "text": "1–9：輸入數字。"
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "清除"
        },
        {
          "label": "Enter",
          "text": "✏️ 筆記"
        },
        {
          "label": "Shift+1–9",
          "text": "🔴 紅色筆記"
        },
        {
          "label": "Ctrl+Z",
          "text": "↩️ 復原"
        },
        {
          "label": "Ctrl+Y / Ctrl+Shift+Z",
          "text": "↪️ 重做"
        }
      ]
    },
    {
      "title": "更多資訊",
      "items": [
        {
          "label": "GitHub 專案（需網際網路連線）",
          "href": "https://github.com/piccoripico/sudoku-html",
          "linkText": "https://github.com/piccoripico/sudoku-html"
        }
      ]
    }
  ],
  "clueOptionLabels": {
    "17": "17 (最困難)",
    "24": "24 (非常困難)",
    "28": "28 (困難)",
    "32": "32 (一般)",
    "38": "38 (簡單)",
    "44": "44 (非常簡單)"
  }
} satisfies LocaleDictionary;
