import type { LocaleDictionary } from './schema.js';

export const TR = {
  "title": "Sudoku",
  "clueLabel": "İpuçları",
  "seedLabel": "Tohum (boş = rastgele)",
  "langLabel": "Dil",
  "themeLabel": "Tema",
  "themeSystem": "Sistem",
  "themeLight": "Açık",
  "themeDark": "Koyu",
  "preferenceSaveLabel": "Ayarları kaydet",
  "preferenceSaveTitle": "İpuçlarını, tohumu, dili, temayı ve vurguları tarayıcıda kaydet",
  "seedPlaceholder": "İsteğe bağlı (boş = rastgele)",
  "newGame": "Yeni bulmaca",
  "reset": "Başa dön",
  "hint": "İpucu doldur",
  "solve": "Çözümü göster",
  "saveGame": "Kaydet",
  "loadGame": "Yükle",
  "helpButton": "Yardım",
  "helpClose": "Kapat",
  "highlightSettingsButton": "Ayarlar",
  "highlightSettingsTitle": "Vurgu ayarları",
  "highlightCompletedToggle": "Tamamlanan sayıları vurgula",
  "highlightDuplicateToggle": "Tekrarlanan sayıları vurgula",
  "padTitle": "Sayı tuşları",
  "undo": "↩️ Geri al",
  "redo": "↪️ Yinele",
  "noteButton": "✏️ Not",
  "redNoteButton": "🔴 Kırmızı not",
  "clearButton": "Temizle",
  "boardAriaLabel": "Sudoku tahtası",
  "padHelpLine1": "1–9: Bir sayı girin.",
  "padHelpLine2": "✏️ Not: Adayları ekleyin. (🔴 Kırmızı not veya sağ tık: kırmızı notlar.)",
  "statusLoading": "Yükleniyor…",
  "statusGenerating": "Oluşturuluyor…",
  "statusInputPrompt": "Sudoku'yu çözmek için sayıları girin.",
  "statusNoHint": "İpucu için boş hücre yok.",
  "statusSolved": "Tebrikler! Sudoku çözüldü. (Süre: {time})",
  "statusSolutionShown": "Çözüm gösterildi.",
  "statusSaveSuccess": "Oyun kaydedildi.",
  "statusSaveError": "Oyun kaydedilemedi.",
  "statusSaveUnavailable": "Kaydedilecek oyun yok.",
  "statusLoadSuccess": "Oyun yüklendi.",
  "statusLoadError": "Dosya yüklenemedi.",
  "statsHintUsed": "Doldurulan ipuçları: {count}",
  "statsSolutionShown": "Çözüm gösterildi: {state}",
  "statsClues": "İpuçları: {count}",
  "statsSeed": "Tohum: {seed}",
  "yes": "evet",
  "no": "hayır",
  "randomSeed": "rastgele ({seed})",
  "helpTitle": "Nasıl oynanır",
  "helpSections": [
    {
      "items": [
        {
          "label": "Başlangıç",
          "text": "Bir hücre seçip 1 ile 9 arasında bir sayı girin."
        },
        {
          "label": "Amaç",
          "text": "Her satır, sütun ve 3×3 blokta 1–9 arasındaki sayılar birer kez bulunmalıdır."
        },
        {
          "label": "Tek çözüm",
          "text": "Oluşturulan her Sudoku'nun tek bir çözümü vardır."
        },
        {
          "label": "Vurgular",
          "text": "Tekrarlanan ve dokuz doğru konumda tamamlanan sayılar vurgulanır."
        },
        {
          "label": "Çevrimdışı",
          "text": "İnternetsiz oynayabilirsiniz; oyun sırasında bağlantı gerekmez."
        }
      ]
    },
    {
      "title": "Ayarlar ve düğmeler",
      "items": [
        {
          "label": "İpuçları",
          "text": "Yeni bulmacadaki başlangıç sayılarının miktarını belirler."
        },
        {
          "label": "Tohum (boş = rastgele)",
          "text": "Aynı tohum ve ipucu sayısı aynı bulmacayı üretir; boş bırakılırsa rastgele olur."
        },
        {
          "label": "Dil",
          "text": "Arayüz dilini değiştirir."
        },
        {
          "label": "Tema",
          "text": "Sistem, Açık veya Koyu temayı seçin; Sistem cihazı izler."
        },
        {
          "label": "Ayarları kaydet",
          "text": "Yalnızca etkinleştirildiğinde tercihleri saklar; kapatınca siler."
        },
        {
          "label": "Yeni bulmaca",
          "text": "Geçerli ayarlarla yeni Sudoku oluşturur."
        },
        {
          "label": "Başa dön",
          "text": "Başlangıç tahtasını geri getirir ve süreyi sıfırlar."
        },
        {
          "label": "İpucu doldur",
          "text": "Boş hücreye doğru sayıyı yerleştirir."
        },
        {
          "label": "Çözümü göster",
          "text": "Tam çözümü gösterir."
        },
        {
          "label": "Ayarlar",
          "text": "İki vurgu ayarını açar."
        },
        {
          "label": "Yardım",
          "text": "İnternetsiz kullanılabilen yardımı açar."
        },
        {
          "label": "Kaydet",
          "text": "Tahtayı, notları, zamanı ve geçmişi JSON olarak kaydeder."
        },
        {
          "label": "Yükle",
          "text": "Kaydedilen oyunu JSON dosyasından yükler."
        }
      ]
    },
    {
      "title": "Fare ve dokunma",
      "items": [
        {
          "label": "Hücre seç",
          "text": "Bir hücre seçip 1 ile 9 arasında bir sayı girin."
        },
        {
          "label": "Sayı gir",
          "text": "1–9: Bir sayı girin."
        },
        {
          "label": "Temizle",
          "text": "Temizle"
        },
        {
          "label": "✏️ Not",
          "text": "✏️ Not: Adayları ekleyin. (🔴 Kırmızı not veya sağ tık: kırmızı notlar.)"
        },
        {
          "label": "🔴 Kırmızı not",
          "text": "✏️ Not: Adayları ekleyin. (🔴 Kırmızı not veya sağ tık: kırmızı notlar.)"
        },
        {
          "label": "↩️ Geri al",
          "text": "↩️ Geri al"
        },
        {
          "label": "↪️ Yinele",
          "text": "↪️ Yinele"
        }
      ]
    },
    {
      "title": "Klavye",
      "items": [
        {
          "label": "↑ ↓ ← →",
          "text": "Hücreler arasında hareket edin."
        },
        {
          "label": "1–9",
          "text": "1–9: Bir sayı girin."
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "Temizle"
        },
        {
          "label": "Enter",
          "text": "✏️ Not"
        },
        {
          "label": "Shift+1–9",
          "text": "🔴 Kırmızı not"
        },
        {
          "label": "Ctrl+Z",
          "text": "↩️ Geri al"
        },
        {
          "label": "Ctrl+Y / Ctrl+Shift+Z",
          "text": "↪️ Yinele"
        }
      ]
    },
    {
      "title": "Diğer bilgiler",
      "items": [
        {
          "label": "GitHub deposu (internet gerekir)",
          "href": "https://github.com/piccoripico/sudoku-html",
          "linkText": "https://github.com/piccoripico/sudoku-html"
        }
      ]
    }
  ],
  "clueOptionLabels": {
    "17": "17 (en zor)",
    "24": "24 (çok zor)",
    "28": "28 (zor)",
    "32": "32 (normal)",
    "38": "38 (kolay)",
    "44": "44 (çok kolay)"
  }
} satisfies LocaleDictionary;
