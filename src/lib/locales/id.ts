import type { LocaleDictionary } from './schema.js';

export const ID = {
  "title": "Sudoku",
  "clueLabel": "Petunjuk",
  "seedLabel": "Seed (kosong = acak)",
  "langLabel": "Bahasa",
  "themeLabel": "Tema",
  "themeSystem": "Sistem",
  "themeLight": "Terang",
  "themeDark": "Gelap",
  "preferenceSaveLabel": "Simpan pengaturan",
  "preferenceSaveTitle": "Simpan petunjuk, seed, bahasa, tema, dan sorotan di browser ini",
  "seedPlaceholder": "Opsional (kosong = acak)",
  "newGame": "Permainan baru",
  "reset": "Atur ulang",
  "hint": "Isi petunjuk",
  "solve": "Tampilkan solusi",
  "saveGame": "Simpan",
  "loadGame": "Muat",
  "helpButton": "Bantuan",
  "helpClose": "Tutup",
  "highlightSettingsButton": "Pengaturan",
  "highlightSettingsTitle": "Pengaturan sorotan",
  "highlightCompletedToggle": "Sorot angka lengkap",
  "highlightDuplicateToggle": "Sorot angka ganda",
  "padTitle": "Papan angka",
  "undo": "↩️ Urungkan",
  "redo": "↪️ Ulangi",
  "noteButton": "✏️ Catatan",
  "redNoteButton": "🔴 Catatan merah",
  "clearButton": "Hapus",
  "boardAriaLabel": "Papan Sudoku",
  "padHelpLine1": "1–9: Masukkan angka.",
  "padHelpLine2": "✏️ Catatan: Tambahkan kandidat. (🔴 Catatan merah atau klik kanan: catatan merah.)",
  "statusLoading": "Memuat…",
  "statusGenerating": "Membuat…",
  "statusInputPrompt": "Masukkan angka untuk menyelesaikan Sudoku.",
  "statusNoHint": "Tidak ada sel kosong untuk petunjuk.",
  "statusSolved": "Selamat! Sudoku selesai. (Waktu: {time})",
  "statusSolutionShown": "Solusi ditampilkan.",
  "statusSaveSuccess": "Permainan berhasil disimpan.",
  "statusSaveError": "Gagal menyimpan permainan.",
  "statusSaveUnavailable": "Tidak ada permainan untuk disimpan.",
  "statusLoadSuccess": "Permainan berhasil dimuat.",
  "statusLoadError": "Gagal memuat berkas.",
  "statsHintUsed": "Petunjuk terisi: {count}",
  "statsSolutionShown": "Solusi ditampilkan: {state}",
  "statsClues": "Petunjuk: {count}",
  "statsSeed": "Seed: {seed}",
  "yes": "ya",
  "no": "tidak",
  "randomSeed": "acak ({seed})",
  "helpTitle": "Cara bermain",
  "helpSections": [
    {
      "items": [
        {
          "label": "Mulai bermain",
          "text": "Pilih sel lalu masukkan angka dari 1 hingga 9."
        },
        {
          "label": "Tujuan",
          "text": "Setiap baris, kolom, dan blok 3×3 harus memuat angka 1 sampai 9 sekali saja."
        },
        {
          "label": "Solusi tunggal",
          "text": "Setiap teka-teki yang dibuat memiliki tepat satu solusi."
        },
        {
          "label": "Sorotan",
          "text": "Angka ganda dan angka yang benar di sembilan posisi akan disorot."
        },
        {
          "label": "Tanpa internet",
          "text": "Bermainlah tanpa internet; permainan tidak memerlukan koneksi."
        }
      ]
    },
    {
      "title": "Pengaturan dan tombol",
      "items": [
        {
          "label": "Petunjuk",
          "text": "Menentukan jumlah angka awal di teka-teki berikutnya."
        },
        {
          "label": "Seed (kosong = acak)",
          "text": "Seed dan jumlah petunjuk yang sama menghasilkan papan yang sama; kosong berarti acak."
        },
        {
          "label": "Bahasa",
          "text": "Mengubah bahasa antarmuka."
        },
        {
          "label": "Tema",
          "text": "Pilih Sistem, Terang, atau Gelap; Sistem mengikuti perangkat."
        },
        {
          "label": "Simpan pengaturan",
          "text": "Menyimpan pilihan hanya jika diaktifkan; menonaktifkan akan menghapusnya."
        },
        {
          "label": "Permainan baru",
          "text": "Membuat teka-teki baru dengan pengaturan saat ini."
        },
        {
          "label": "Atur ulang",
          "text": "Mengembalikan papan awal dan mengulang penghitung waktu."
        },
        {
          "label": "Isi petunjuk",
          "text": "Mengisi satu sel kosong dengan angka yang benar."
        },
        {
          "label": "Tampilkan solusi",
          "text": "Menampilkan seluruh solusi."
        },
        {
          "label": "Pengaturan",
          "text": "Membuka dua pilihan sorotan."
        },
        {
          "label": "Bantuan",
          "text": "Membuka bantuan yang tersedia tanpa internet."
        },
        {
          "label": "Simpan",
          "text": "Menyimpan papan, catatan, waktu, dan riwayat dalam JSON."
        },
        {
          "label": "Muat",
          "text": "Memuat permainan tersimpan dari file JSON."
        }
      ]
    },
    {
      "title": "Mouse dan sentuhan",
      "items": [
        {
          "label": "Pilih sel",
          "text": "Pilih sel lalu masukkan angka dari 1 hingga 9."
        },
        {
          "label": "Masukkan angka",
          "text": "1–9: Masukkan angka."
        },
        {
          "label": "Hapus",
          "text": "Hapus"
        },
        {
          "label": "✏️ Catatan",
          "text": "✏️ Catatan: Tambahkan kandidat. (🔴 Catatan merah atau klik kanan: catatan merah.)"
        },
        {
          "label": "🔴 Catatan merah",
          "text": "✏️ Catatan: Tambahkan kandidat. (🔴 Catatan merah atau klik kanan: catatan merah.)"
        },
        {
          "label": "↩️ Urungkan",
          "text": "↩️ Urungkan"
        },
        {
          "label": "↪️ Ulangi",
          "text": "↪️ Ulangi"
        }
      ]
    },
    {
      "title": "Papan ketik",
      "items": [
        {
          "label": "↑ ↓ ← →",
          "text": "Pindah antar-sel."
        },
        {
          "label": "1–9",
          "text": "1–9: Masukkan angka."
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "Hapus"
        },
        {
          "label": "Enter",
          "text": "✏️ Catatan"
        },
        {
          "label": "Shift+1–9",
          "text": "🔴 Catatan merah"
        },
        {
          "label": "Ctrl+Z",
          "text": "↩️ Urungkan"
        },
        {
          "label": "Ctrl+Y / Ctrl+Shift+Z",
          "text": "↪️ Ulangi"
        }
      ]
    },
    {
      "title": "Informasi lain",
      "items": [
        {
          "label": "Repositori GitHub (perlu internet)",
          "href": "https://github.com/piccoripico/sudoku-html",
          "linkText": "https://github.com/piccoripico/sudoku-html"
        }
      ]
    }
  ],
  "clueOptionLabels": {
    "17": "17 (paling sulit)",
    "24": "24 (sangat sulit)",
    "28": "28 (sulit)",
    "32": "32 (normal)",
    "38": "38 (mudah)",
    "44": "44 (sangat mudah)"
  }
} satisfies LocaleDictionary;
