import type { LocaleDictionary } from './schema.js';

export const SW = {
  "title": "Sudoku",
  "clueLabel": "Vidokezo",
  "seedLabel": "Mbegu (tupu = nasibu)",
  "langLabel": "Lugha",
  "themeLabel": "Mandhari",
  "themeSystem": "Mfumo",
  "themeLight": "Nuru",
  "themeDark": "Giza",
  "preferenceSaveLabel": "Hifadhi mipangilio",
  "preferenceSaveTitle": "Hifadhi vidokezo, mbegu, lugha, mandhari na uangaziaji kwenye kivinjari",
  "seedPlaceholder": "Si lazima (tupu = nasibu)",
  "newGame": "Mchezo mpya",
  "reset": "Anza upya",
  "hint": "Jaza kidokezo",
  "solve": "Onyesha suluhisho",
  "saveGame": "Hifadhi",
  "loadGame": "Pakia",
  "helpButton": "Msaada",
  "helpClose": "Funga",
  "highlightSettingsButton": "Mipangilio",
  "highlightSettingsTitle": "Mipangilio ya uangaziaji",
  "highlightCompletedToggle": "Angazia nambari zilizokamilika",
  "highlightDuplicateToggle": "Angazia nambari zilizorudiwa",
  "padTitle": "Kibodi ya nambari",
  "undo": "↩️ Tendua",
  "redo": "↪️ Rudia",
  "noteButton": "✏️ Kidokezo cha nambari",
  "redNoteButton": "🔴 Kidokezo chekundu",
  "clearButton": "Futa",
  "boardAriaLabel": "Ubao wa Sudoku",
  "padHelpLine1": "1–9: Ingiza nambari.",
  "padHelpLine2": "✏️ Kidokezo cha nambari: Ongeza chaguo. (🔴 Kidokezo chekundu au bofya kulia: vidokezo vyekundu.)",
  "statusLoading": "Inapakia…",
  "statusGenerating": "Inatengeneza…",
  "statusInputPrompt": "Ingiza nambari ili kutatua Sudoku.",
  "statusNoHint": "Hakuna kisanduku tupu cha kidokezo.",
  "statusSolved": "Hongera! Sudoku imetatuliwa. (Muda: {time})",
  "statusSolutionShown": "Suluhisho limeonyeshwa.",
  "statusSaveSuccess": "Mchezo umehifadhiwa.",
  "statusSaveError": "Imeshindikana kuhifadhi mchezo.",
  "statusSaveUnavailable": "Hakuna mchezo wa kuhifadhi.",
  "statusLoadSuccess": "Mchezo umepakiwa.",
  "statusLoadError": "Imeshindikana kupakia faili.",
  "statsHintUsed": "Vidokezo vilivyojazwa: {count}",
  "statsSolutionShown": "Suluhisho limeonyeshwa: {state}",
  "statsClues": "Vidokezo: {count}",
  "statsSeed": "Mbegu: {seed}",
  "yes": "ndiyo",
  "no": "hapana",
  "randomSeed": "nasibu ({seed})",
  "helpTitle": "Jinsi ya kucheza",
  "helpSections": [
    {
      "items": [
        {
          "label": "Anza",
          "text": "Chagua kisanduku na uingize nambari ya 1 hadi 9."
        },
        {
          "label": "Lengo",
          "text": "Kila mstari, safu na kisanduku cha 3×3 kiwe na 1 hadi 9 mara moja tu."
        },
        {
          "label": "Suluhisho moja",
          "text": "Kila Sudoku inayotengenezwa ina suluhisho moja pekee."
        },
        {
          "label": "Uangaziaji",
          "text": "Nambari zinazojirudia na zilizokamilika sawasawa katika nafasi tisa huangaziwa."
        },
        {
          "label": "Bila mtandao",
          "text": "Cheza bila intaneti; mchezo hauhitaji muunganisho."
        }
      ]
    },
    {
      "title": "Mipangilio na vitufe",
      "items": [
        {
          "label": "Vidokezo",
          "text": "Huamua idadi ya nambari za kuanzia kwenye mchezo unaofuata."
        },
        {
          "label": "Mbegu (tupu = nasibu)",
          "text": "Mbegu na idadi ya vidokezo ileile huleta ubao uleule; tupu ni nasibu."
        },
        {
          "label": "Lugha",
          "text": "Hubadilisha lugha ya kiolesura."
        },
        {
          "label": "Mandhari",
          "text": "Chagua Mfumo, Nuru au Giza; Mfumo hufuata kifaa."
        },
        {
          "label": "Hifadhi mipangilio",
          "text": "Huhifadhi mapendeleo ukiiwasha tu; ukiizima huyafuta."
        },
        {
          "label": "Mchezo mpya",
          "text": "Hutengeneza Sudoku mpya kwa mipangilio ya sasa."
        },
        {
          "label": "Anza upya",
          "text": "Hurudisha ubao wa mwanzo na kuanza saa upya."
        },
        {
          "label": "Jaza kidokezo",
          "text": "Hujaza nambari sahihi katika kisanduku kimoja tupu."
        },
        {
          "label": "Onyesha suluhisho",
          "text": "Huonyesha suluhisho lote."
        },
        {
          "label": "Mipangilio",
          "text": "Hufungua chaguo mbili za uangaziaji."
        },
        {
          "label": "Msaada",
          "text": "Hufungua msaada unaopatikana bila intaneti."
        },
        {
          "label": "Hifadhi",
          "text": "Huhifadhi ubao, madokezo, muda na historia kwenye JSON."
        },
        {
          "label": "Pakia",
          "text": "Hupakia mchezo uliohifadhiwa kutoka faili ya JSON."
        }
      ]
    },
    {
      "title": "Kipanya na mguso",
      "items": [
        {
          "label": "Chagua kisanduku",
          "text": "Chagua kisanduku na uingize nambari ya 1 hadi 9."
        },
        {
          "label": "Ingiza nambari",
          "text": "1–9: Ingiza nambari."
        },
        {
          "label": "Futa",
          "text": "Futa"
        },
        {
          "label": "✏️ Kidokezo cha nambari",
          "text": "✏️ Kidokezo cha nambari: Ongeza chaguo. (🔴 Kidokezo chekundu au bofya kulia: vidokezo vyekundu.)"
        },
        {
          "label": "🔴 Kidokezo chekundu",
          "text": "✏️ Kidokezo cha nambari: Ongeza chaguo. (🔴 Kidokezo chekundu au bofya kulia: vidokezo vyekundu.)"
        },
        {
          "label": "↩️ Tendua",
          "text": "↩️ Tendua"
        },
        {
          "label": "↪️ Rudia",
          "text": "↪️ Rudia"
        }
      ]
    },
    {
      "title": "Kibodi",
      "items": [
        {
          "label": "↑ ↓ ← →",
          "text": "Songa kati ya visanduku."
        },
        {
          "label": "1–9",
          "text": "1–9: Ingiza nambari."
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "Futa"
        },
        {
          "label": "Enter",
          "text": "✏️ Kidokezo cha nambari"
        },
        {
          "label": "Shift+1–9",
          "text": "🔴 Kidokezo chekundu"
        },
        {
          "label": "Ctrl+Z",
          "text": "↩️ Tendua"
        },
        {
          "label": "Ctrl+Y / Ctrl+Shift+Z",
          "text": "↪️ Rudia"
        }
      ]
    },
    {
      "title": "Taarifa zaidi",
      "items": [
        {
          "label": "Hifadhi ya GitHub (inahitaji intaneti)",
          "href": "https://github.com/piccoripico/sudoku-html",
          "linkText": "https://github.com/piccoripico/sudoku-html"
        }
      ]
    }
  ],
  "clueOptionLabels": {
    "17": "17 (ngumu zaidi)",
    "24": "24 (ngumu sana)",
    "28": "28 (ngumu)",
    "32": "32 (kawaida)",
    "38": "38 (rahisi)",
    "44": "44 (rahisi sana)"
  }
} satisfies LocaleDictionary;
