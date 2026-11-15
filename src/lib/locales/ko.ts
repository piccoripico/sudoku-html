import type { LocaleDictionary } from './schema.js';

export const KO = {
  "title": "스도쿠",
  "clueLabel": "힌트 수",
  "seedLabel": "시드 (빈칸 = 무작위)",
  "langLabel": "언어",
  "themeLabel": "테마",
  "themeSystem": "시스템",
  "themeLight": "라이트",
  "themeDark": "다크",
  "preferenceSaveLabel": "설정 저장",
  "preferenceSaveTitle": "힌트 수, 시드, 언어, 테마, 강조 표시를 브라우저에 저장",
  "seedPlaceholder": "선택 사항 (빈칸 = 무작위)",
  "newGame": "새 퍼즐",
  "reset": "처음으로",
  "hint": "힌트 채우기",
  "solve": "정답 보기",
  "saveGame": "저장",
  "loadGame": "불러오기",
  "helpButton": "도움말",
  "helpClose": "닫기",
  "highlightSettingsButton": "설정",
  "highlightSettingsTitle": "강조 표시 설정",
  "highlightCompletedToggle": "완성된 숫자 강조",
  "highlightDuplicateToggle": "중복 숫자 강조",
  "padTitle": "숫자 패드",
  "undo": "↩️ 실행 취소",
  "redo": "↪️ 다시 실행",
  "noteButton": "✏️ 메모",
  "redNoteButton": "🔴 빨간 메모",
  "clearButton": "지우기",
  "boardAriaLabel": "스도쿠 보드",
  "padHelpLine1": "1–9: 숫자를 입력하세요.",
  "padHelpLine2": "✏️ 메모: 후보 숫자를 입력하세요. (🔴 빨간 메모 또는 마우스 오른쪽 버튼: 빨간 메모.)",
  "statusLoading": "불러오는 중…",
  "statusGenerating": "생성 중…",
  "statusInputPrompt": "숫자를 입력하여 스도쿠를 풀어 보세요.",
  "statusNoHint": "힌트를 넣을 빈칸이 없습니다.",
  "statusSolved": "축하합니다! 스도쿠를 풀었습니다. (시간: {time})",
  "statusSolutionShown": "정답을 표시했습니다.",
  "statusSaveSuccess": "게임을 저장했습니다.",
  "statusSaveError": "게임을 저장하지 못했습니다.",
  "statusSaveUnavailable": "저장할 게임이 없습니다.",
  "statusLoadSuccess": "게임을 불러왔습니다.",
  "statusLoadError": "파일을 불러오지 못했습니다.",
  "statsHintUsed": "채운 힌트: {count}",
  "statsSolutionShown": "정답 표시: {state}",
  "statsClues": "힌트 수: {count}",
  "statsSeed": "시드: {seed}",
  "yes": "예",
  "no": "아니요",
  "randomSeed": "무작위 ({seed})",
  "helpTitle": "게임 방법",
  "helpSections": [
    {
      "items": [
        {
          "label": "시작하기",
          "text": "칸을 선택하고 1부터 9까지의 숫자를 입력하세요."
        },
        {
          "label": "목표",
          "text": "각 행, 열, 3×3 상자에는 1부터 9까지의 숫자가 한 번씩 들어가야 합니다."
        },
        {
          "label": "유일한 정답",
          "text": "생성되는 모든 퍼즐에는 정답이 하나뿐입니다."
        },
        {
          "label": "강조 표시",
          "text": "중복 숫자와 아홉 위치에 모두 정확히 채워진 숫자가 강조됩니다."
        },
        {
          "label": "오프라인",
          "text": "인터넷 없이 플레이할 수 있으며 게임 중 네트워크가 필요하지 않습니다."
        }
      ]
    },
    {
      "title": "설정과 버튼",
      "items": [
        {
          "label": "힌트 수",
          "text": "다음 퍼즐의 시작 힌트 숫자 개수를 정합니다."
        },
        {
          "label": "시드 (빈칸 = 무작위)",
          "text": "시드와 힌트 수가 같으면 같은 퍼즐이 생성됩니다. 비우면 무작위입니다."
        },
        {
          "label": "언어",
          "text": "화면의 언어를 바꿉니다."
        },
        {
          "label": "테마",
          "text": "시스템·라이트·다크 중 선택하세요. 시스템은 기기 설정을 따릅니다."
        },
        {
          "label": "설정 저장",
          "text": "활성화한 경우에만 브라우저에 설정을 저장하며, 끄면 삭제합니다."
        },
        {
          "label": "새 퍼즐",
          "text": "현재 설정으로 새 퍼즐을 만듭니다."
        },
        {
          "label": "처음으로",
          "text": "시작 상태로 되돌리고 시간을 초기화합니다."
        },
        {
          "label": "힌트 채우기",
          "text": "빈칸 하나에 정답을 채웁니다."
        },
        {
          "label": "정답 보기",
          "text": "전체 정답을 표시합니다."
        },
        {
          "label": "설정",
          "text": "두 가지 강조 설정을 엽니다."
        },
        {
          "label": "도움말",
          "text": "오프라인에서 도움말을 엽니다."
        },
        {
          "label": "저장",
          "text": "보드, 메모, 시간, 작업 기록을 JSON 파일로 저장합니다."
        },
        {
          "label": "불러오기",
          "text": "JSON 파일에서 저장된 게임을 불러옵니다."
        }
      ]
    },
    {
      "title": "마우스·터치",
      "items": [
        {
          "label": "칸 선택",
          "text": "칸을 선택하고 1부터 9까지의 숫자를 입력하세요."
        },
        {
          "label": "숫자 입력",
          "text": "1–9: 숫자를 입력하세요."
        },
        {
          "label": "지우기",
          "text": "지우기"
        },
        {
          "label": "✏️ 메모",
          "text": "✏️ 메모: 후보 숫자를 입력하세요. (🔴 빨간 메모 또는 마우스 오른쪽 버튼: 빨간 메모.)"
        },
        {
          "label": "🔴 빨간 메모",
          "text": "✏️ 메모: 후보 숫자를 입력하세요. (🔴 빨간 메모 또는 마우스 오른쪽 버튼: 빨간 메모.)"
        },
        {
          "label": "↩️ 실행 취소",
          "text": "↩️ 실행 취소"
        },
        {
          "label": "↪️ 다시 실행",
          "text": "↪️ 다시 실행"
        }
      ]
    },
    {
      "title": "키보드",
      "items": [
        {
          "label": "↑ ↓ ← →",
          "text": "칸 사이를 이동합니다."
        },
        {
          "label": "1–9",
          "text": "1–9: 숫자를 입력하세요."
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "지우기"
        },
        {
          "label": "Enter",
          "text": "✏️ 메모"
        },
        {
          "label": "Shift+1–9",
          "text": "🔴 빨간 메모"
        },
        {
          "label": "Ctrl+Z",
          "text": "↩️ 실행 취소"
        },
        {
          "label": "Ctrl+Y / Ctrl+Shift+Z",
          "text": "↪️ 다시 실행"
        }
      ]
    },
    {
      "title": "추가 정보",
      "items": [
        {
          "label": "GitHub 저장소 (인터넷 필요)",
          "href": "https://github.com/piccoripico/sudoku-html",
          "linkText": "https://github.com/piccoripico/sudoku-html"
        }
      ]
    }
  ],
  "clueOptionLabels": {
    "17": "17 (가장 어려움)",
    "24": "24 (매우 어려움)",
    "28": "28 (어려움)",
    "32": "32 (보통)",
    "38": "38 (쉬움)",
    "44": "44 (매우 쉬움)"
  }
} satisfies LocaleDictionary;
