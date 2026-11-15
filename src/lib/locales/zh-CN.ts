import type { LocaleDictionary } from './schema.js';

export const ZH_CN = {
  "title": "数独",
  "clueLabel": "提示数",
  "seedLabel": "种子（留空则随机）",
  "langLabel": "语言",
  "themeLabel": "主题",
  "themeSystem": "跟随系统",
  "themeLight": "浅色",
  "themeDark": "深色",
  "preferenceSaveLabel": "保存设置",
  "preferenceSaveTitle": "在此浏览器中保存提示数、种子、语言、主题和高亮选项",
  "seedPlaceholder": "可选（留空则随机）",
  "newGame": "新游戏",
  "reset": "重置棋盘",
  "hint": "填入提示",
  "solve": "显示答案",
  "saveGame": "保存",
  "loadGame": "读取",
  "helpButton": "帮助",
  "helpClose": "关闭",
  "highlightSettingsButton": "设置",
  "highlightSettingsTitle": "高亮设置",
  "highlightCompletedToggle": "高亮已完成的数字",
  "highlightDuplicateToggle": "高亮重复数字",
  "padTitle": "数字键盘",
  "undo": "↩️ 撤销",
  "redo": "↪️ 重做",
  "noteButton": "✏️ 笔记",
  "redNoteButton": "🔴 红色笔记",
  "clearButton": "清除",
  "boardAriaLabel": "数独棋盘",
  "padHelpLine1": "1–9：填入数字。",
  "padHelpLine2": "✏️ 笔记：添加候选数。（🔴 红色笔记或右键：添加红色候选数。）",
  "statusLoading": "加载中…",
  "statusGenerating": "生成中…",
  "statusInputPrompt": "输入数字以完成数独。",
  "statusNoHint": "没有可填入提示的空格。",
  "statusSolved": "恭喜！数独已完成。（用时：{time}）",
  "statusSolutionShown": "已显示答案。",
  "statusSaveSuccess": "已保存当前状态。",
  "statusSaveError": "无法保存当前状态。",
  "statusSaveUnavailable": "没有可保存的棋盘。",
  "statusLoadSuccess": "已读取保存状态。",
  "statusLoadError": "无法读取存档文件。",
  "statsHintUsed": "已填提示：{count}",
  "statsSolutionShown": "显示答案：{state}",
  "statsClues": "提示数：{count}",
  "statsSeed": "种子：{seed}",
  "yes": "是",
  "no": "否",
  "randomSeed": "随机（{seed}）",
  "helpTitle": "游戏帮助",
  "helpSections": [
    {
      "items": [
        {
          "label": "开始",
          "text": "选择一个格子，输入1到9的数字。"
        },
        {
          "label": "目标",
          "text": "每行、每列及每个3×3宫格都必须恰好包含1到9。"
        },
        {
          "label": "唯一解",
          "text": "每道生成的题目都有唯一答案。"
        },
        {
          "label": "高亮",
          "text": "重复数字和九个位置全部正确的数字默认高亮，可分别关闭。"
        },
        {
          "label": "离线",
          "text": "无需联网即可游玩；游戏过程不发送网络请求。"
        }
      ]
    },
    {
      "title": "棋盘上方的设置与按钮",
      "items": [
        {
          "label": "提示数",
          "text": "设置新题目的初始数字数量。"
        },
        {
          "label": "种子",
          "text": "相同的种子和提示数会生成相同的题目；留空则随机。"
        },
        {
          "label": "语言",
          "text": "切换界面语言。"
        },
        {
          "label": "主题",
          "text": "选择系统、浅色或深色；系统模式跟随设备设置。"
        },
        {
          "label": "保存设置",
          "text": "开启后保存提示数、种子、语言、主题和两项高亮；默认关闭，关闭后清除保存的设置。"
        },
        {
          "label": "新游戏",
          "text": "按当前设置生成新题目。"
        },
        {
          "label": "重置棋盘",
          "text": "回到初始棋盘并重新计时。"
        },
        {
          "label": "填入提示",
          "text": "在一个空格中填入正确数字。"
        },
        {
          "label": "显示答案",
          "text": "显示完整答案。"
        },
        {
          "label": "设置",
          "text": "打开两项高亮开关。"
        },
        {
          "label": "帮助",
          "text": "打开离线帮助。"
        },
        {
          "label": "保存",
          "text": "将棋盘、笔记、计时和撤销/重做历史保存为JSON文件。"
        },
        {
          "label": "读取",
          "text": "读取保存的JSON并恢复游戏状态。"
        }
      ]
    },
    {
      "title": "鼠标与触控",
      "items": [
        {
          "label": "选择格子",
          "text": "点击棋盘中的格子。"
        },
        {
          "label": "输入数字",
          "text": "点击数字键盘中的数字。"
        },
        {
          "label": "清除",
          "text": "清除当前格子。"
        },
        {
          "label": "✏️ 笔记",
          "text": "切换候选数输入模式。"
        },
        {
          "label": "🔴 红色笔记",
          "text": "切换红色候选数；在笔记模式下右键点击数字也可输入。"
        },
        {
          "label": "↩️ 撤销",
          "text": "撤销最近一次操作。"
        },
        {
          "label": "↪️ 重做",
          "text": "恢复已撤销的操作。"
        }
      ]
    },
    {
      "title": "键盘操作",
      "items": [
        {
          "label": "方向键",
          "text": "在格子之间移动。"
        },
        {
          "label": "1–9",
          "text": "输入数字。"
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "清除当前格子。"
        },
        {
          "label": "Enter",
          "text": "切换笔记模式。"
        },
        {
          "label": "Shift+1–9",
          "text": "输入红色笔记。"
        },
        {
          "label": "Ctrl+Z",
          "text": "撤销。"
        },
        {
          "label": "Ctrl+Y 或 Ctrl+Shift+Z",
          "text": "重做。"
        }
      ]
    },
    {
      "title": "更多信息",
      "items": [
        {
          "label": "GitHub 仓库（需要互联网连接）",
          "href": "https://github.com/piccoripico/sudoku-html",
          "linkText": "https://github.com/piccoripico/sudoku-html"
        }
      ]
    }
  ],
  "clueOptionLabels": {
    "17": "17 (最难)",
    "24": "24 (很难)",
    "28": "28 (较难)",
    "32": "32 (标准)",
    "38": "38 (简单)",
    "44": "44 (很简单)"
  }
} as const satisfies LocaleDictionary;
