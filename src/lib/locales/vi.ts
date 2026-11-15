import type { LocaleDictionary } from './schema.js';

export const VI = {
  "title": "Sudoku",
  "clueLabel": "Số gợi ý",
  "seedLabel": "Hạt giống (trống = ngẫu nhiên)",
  "langLabel": "Ngôn ngữ",
  "themeLabel": "Giao diện",
  "themeSystem": "Hệ thống",
  "themeLight": "Sáng",
  "themeDark": "Tối",
  "preferenceSaveLabel": "Lưu cài đặt",
  "preferenceSaveTitle": "Lưu số gợi ý, hạt giống, ngôn ngữ, giao diện và đánh dấu trên trình duyệt",
  "seedPlaceholder": "Tùy chọn (trống = ngẫu nhiên)",
  "newGame": "Ván mới",
  "reset": "Đặt lại",
  "hint": "Điền gợi ý",
  "solve": "Hiện lời giải",
  "saveGame": "Lưu",
  "loadGame": "Tải",
  "helpButton": "Trợ giúp",
  "helpClose": "Đóng",
  "highlightSettingsButton": "Cài đặt",
  "highlightSettingsTitle": "Cài đặt đánh dấu",
  "highlightCompletedToggle": "Đánh dấu số đã đủ",
  "highlightDuplicateToggle": "Đánh dấu số trùng",
  "padTitle": "Bàn phím số",
  "undo": "↩️ Hoàn tác",
  "redo": "↪️ Làm lại",
  "noteButton": "✏️ Ghi chú",
  "redNoteButton": "🔴 Ghi chú đỏ",
  "clearButton": "Xóa",
  "boardAriaLabel": "Bảng Sudoku",
  "padHelpLine1": "1–9: Nhập một số.",
  "padHelpLine2": "✏️ Ghi chú: Thêm số ứng viên. (🔴 Ghi chú đỏ hoặc nhấp chuột phải: ghi chú đỏ.)",
  "statusLoading": "Đang tải…",
  "statusGenerating": "Đang tạo…",
  "statusInputPrompt": "Nhập các số để giải Sudoku.",
  "statusNoHint": "Không còn ô trống cho gợi ý.",
  "statusSolved": "Chúc mừng! Đã giải xong Sudoku. (Thời gian: {time})",
  "statusSolutionShown": "Đã hiển thị lời giải.",
  "statusSaveSuccess": "Đã lưu ván chơi.",
  "statusSaveError": "Không thể lưu ván chơi.",
  "statusSaveUnavailable": "Không có ván chơi để lưu.",
  "statusLoadSuccess": "Đã tải ván chơi.",
  "statusLoadError": "Không thể tải tệp.",
  "statsHintUsed": "Số gợi ý đã điền: {count}",
  "statsSolutionShown": "Đã hiện lời giải: {state}",
  "statsClues": "Số gợi ý: {count}",
  "statsSeed": "Hạt giống: {seed}",
  "yes": "có",
  "no": "không",
  "randomSeed": "ngẫu nhiên ({seed})",
  "helpTitle": "Cách chơi",
  "helpSections": [
    {
      "items": [
        {
          "label": "Bắt đầu",
          "text": "Chọn một ô rồi nhập số từ 1 đến 9."
        },
        {
          "label": "Mục tiêu",
          "text": "Mỗi hàng, cột và khối 3×3 phải có đủ các số từ 1 đến 9, không lặp."
        },
        {
          "label": "Lời giải duy nhất",
          "text": "Mỗi câu đố được tạo chỉ có một lời giải."
        },
        {
          "label": "Đánh dấu",
          "text": "Các số bị trùng và các số đúng ở cả chín vị trí đều được đánh dấu."
        },
        {
          "label": "Ngoại tuyến",
          "text": "Có thể chơi ngoại tuyến; không cần internet khi chơi."
        }
      ]
    },
    {
      "title": "Cài đặt và nút bấm",
      "items": [
        {
          "label": "Số gợi ý",
          "text": "Quy định số ô cho sẵn ở ván tiếp theo."
        },
        {
          "label": "Hạt giống (trống = ngẫu nhiên)",
          "text": "Cùng hạt giống và số gợi ý sẽ tạo cùng một bàn; để trống thì ngẫu nhiên."
        },
        {
          "label": "Ngôn ngữ",
          "text": "Đổi ngôn ngữ giao diện."
        },
        {
          "label": "Giao diện",
          "text": "Chọn Hệ thống, Sáng hoặc Tối; Hệ thống theo thiết bị."
        },
        {
          "label": "Lưu cài đặt",
          "text": "Chỉ lưu lựa chọn khi bật; tắt sẽ xóa dữ liệu đã lưu."
        },
        {
          "label": "Ván mới",
          "text": "Tạo một Sudoku mới với cài đặt hiện tại."
        },
        {
          "label": "Đặt lại",
          "text": "Khôi phục bàn ban đầu và bắt đầu lại đồng hồ."
        },
        {
          "label": "Điền gợi ý",
          "text": "Điền số đúng vào một ô trống."
        },
        {
          "label": "Hiện lời giải",
          "text": "Hiện toàn bộ lời giải."
        },
        {
          "label": "Cài đặt",
          "text": "Mở hai tùy chọn đánh dấu."
        },
        {
          "label": "Trợ giúp",
          "text": "Mở trợ giúp có thể dùng ngoại tuyến."
        },
        {
          "label": "Lưu",
          "text": "Lưu bàn, ghi chú, thời gian và lịch sử vào JSON."
        },
        {
          "label": "Tải",
          "text": "Tải ván đã lưu từ tệp JSON."
        }
      ]
    },
    {
      "title": "Chuột và cảm ứng",
      "items": [
        {
          "label": "Chọn ô",
          "text": "Chọn một ô rồi nhập số từ 1 đến 9."
        },
        {
          "label": "Nhập số",
          "text": "1–9: Nhập một số."
        },
        {
          "label": "Xóa",
          "text": "Xóa"
        },
        {
          "label": "✏️ Ghi chú",
          "text": "✏️ Ghi chú: Thêm số ứng viên. (🔴 Ghi chú đỏ hoặc nhấp chuột phải: ghi chú đỏ.)"
        },
        {
          "label": "🔴 Ghi chú đỏ",
          "text": "✏️ Ghi chú: Thêm số ứng viên. (🔴 Ghi chú đỏ hoặc nhấp chuột phải: ghi chú đỏ.)"
        },
        {
          "label": "↩️ Hoàn tác",
          "text": "↩️ Hoàn tác"
        },
        {
          "label": "↪️ Làm lại",
          "text": "↪️ Làm lại"
        }
      ]
    },
    {
      "title": "Bàn phím",
      "items": [
        {
          "label": "↑ ↓ ← →",
          "text": "Di chuyển giữa các ô."
        },
        {
          "label": "1–9",
          "text": "1–9: Nhập một số."
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "Xóa"
        },
        {
          "label": "Enter",
          "text": "✏️ Ghi chú"
        },
        {
          "label": "Shift+1–9",
          "text": "🔴 Ghi chú đỏ"
        },
        {
          "label": "Ctrl+Z",
          "text": "↩️ Hoàn tác"
        },
        {
          "label": "Ctrl+Y / Ctrl+Shift+Z",
          "text": "↪️ Làm lại"
        }
      ]
    },
    {
      "title": "Thông tin thêm",
      "items": [
        {
          "label": "Kho GitHub (cần internet)",
          "href": "https://github.com/piccoripico/sudoku-html",
          "linkText": "https://github.com/piccoripico/sudoku-html"
        }
      ]
    }
  ],
  "clueOptionLabels": {
    "17": "17 (khó nhất)",
    "24": "24 (rất khó)",
    "28": "28 (khó)",
    "32": "32 (bình thường)",
    "38": "38 (dễ)",
    "44": "44 (rất dễ)"
  }
} satisfies LocaleDictionary;
