import type { LocaleDictionary } from './schema.js';

export const NL = {
  "title": "Sudoku",
  "clueLabel": "Hints",
  "seedLabel": "Seed (leeg = willekeurig)",
  "langLabel": "Taal",
  "themeLabel": "Thema",
  "themeSystem": "Systeem",
  "themeLight": "Licht",
  "themeDark": "Donker",
  "preferenceSaveLabel": "Instellingen opslaan",
  "preferenceSaveTitle": "Sla hints, seed, taal, thema en markeringen op in deze browser",
  "seedPlaceholder": "Optioneel (leeg = willekeurig)",
  "newGame": "Nieuwe puzzel",
  "reset": "Opnieuw beginnen",
  "hint": "Hint invullen",
  "solve": "Oplossing tonen",
  "saveGame": "Opslaan",
  "loadGame": "Laden",
  "helpButton": "Help",
  "helpClose": "Sluiten",
  "highlightSettingsButton": "Instellingen",
  "highlightSettingsTitle": "Markeerinstellingen",
  "highlightCompletedToggle": "Voltooide cijfers markeren",
  "highlightDuplicateToggle": "Dubbele cijfers markeren",
  "padTitle": "Cijferblok",
  "undo": "↩️ Ongedaan maken",
  "redo": "↪️ Opnieuw",
  "noteButton": "✏️ Notitie",
  "redNoteButton": "🔴 Rode notitie",
  "clearButton": "Wissen",
  "boardAriaLabel": "Sudoku-rooster",
  "padHelpLine1": "1–9: Voer een cijfer in.",
  "padHelpLine2": "✏️ Notitie: Voeg kandidaten toe. (🔴 Rode notitie of rechtsklik: rode notities.)",
  "statusLoading": "Laden…",
  "statusGenerating": "Genereren…",
  "statusInputPrompt": "Vul cijfers in om de Sudoku op te lossen.",
  "statusNoHint": "Geen lege cel beschikbaar voor een hint.",
  "statusSolved": "Gefeliciteerd! Sudoku opgelost. (Tijd: {time})",
  "statusSolutionShown": "Oplossing weergegeven.",
  "statusSaveSuccess": "Spel opgeslagen.",
  "statusSaveError": "Opslaan van spel mislukt.",
  "statusSaveUnavailable": "Geen spel om op te slaan.",
  "statusLoadSuccess": "Spel geladen.",
  "statusLoadError": "Bestand kon niet worden geladen.",
  "statsHintUsed": "Ingevulde hints: {count}",
  "statsSolutionShown": "Oplossing getoond: {state}",
  "statsClues": "Hints: {count}",
  "statsSeed": "Seed: {seed}",
  "yes": "ja",
  "no": "nee",
  "randomSeed": "willekeurig ({seed})",
  "helpTitle": "Speluitleg",
  "helpSections": [
    {
      "items": [
        {
          "label": "Aan de slag",
          "text": "Kies een cel en voer een cijfer van 1 tot en met 9 in."
        },
        {
          "label": "Doel",
          "text": "Elke rij, kolom en elk 3×3-vak moet de cijfers 1 tot en met 9 precies eenmaal bevatten."
        },
        {
          "label": "Unieke oplossing",
          "text": "Elke gegenereerde Sudoku heeft precies één oplossing."
        },
        {
          "label": "Markeringen",
          "text": "Dubbele cijfers en correct op alle negen plekken ingevulde cijfers worden gemarkeerd."
        },
        {
          "label": "Offline",
          "text": "Speel zonder internet; een verbinding is tijdens het spel niet nodig."
        }
      ]
    },
    {
      "title": "Instellingen en knoppen",
      "items": [
        {
          "label": "Hints",
          "text": "Bepaalt hoeveel cijfers vooraf zijn ingevuld in de volgende puzzel."
        },
        {
          "label": "Seed (leeg = willekeurig)",
          "text": "Dezelfde seed en hetzelfde aantal hints maken dezelfde puzzel; leeg betekent willekeurig."
        },
        {
          "label": "Taal",
          "text": "Wijzigt de taal van de interface."
        },
        {
          "label": "Thema",
          "text": "Kies Systeem, Licht of Donker; Systeem volgt het apparaat."
        },
        {
          "label": "Instellingen opslaan",
          "text": "Slaat voorkeuren alleen op wanneer ingeschakeld; uitschakelen verwijdert ze."
        },
        {
          "label": "Nieuwe puzzel",
          "text": "Maakt een nieuwe Sudoku met de huidige instellingen."
        },
        {
          "label": "Opnieuw beginnen",
          "text": "Herstelt het beginrooster en zet de timer terug."
        },
        {
          "label": "Hint invullen",
          "text": "Vult één lege cel in met het juiste cijfer."
        },
        {
          "label": "Oplossing tonen",
          "text": "Toont de volledige oplossing."
        },
        {
          "label": "Instellingen",
          "text": "Opent beide markeeropties."
        },
        {
          "label": "Help",
          "text": "Opent de offline beschikbare hulp."
        },
        {
          "label": "Opslaan",
          "text": "Slaat rooster, notities, timer en geschiedenis op in JSON."
        },
        {
          "label": "Laden",
          "text": "Laadt een opgeslagen spel vanuit een JSON-bestand."
        }
      ]
    },
    {
      "title": "Muis en aanraken",
      "items": [
        {
          "label": "Cel selecteren",
          "text": "Kies een cel en voer een cijfer van 1 tot en met 9 in."
        },
        {
          "label": "Cijfer invoeren",
          "text": "1–9: Voer een cijfer in."
        },
        {
          "label": "Wissen",
          "text": "Wissen"
        },
        {
          "label": "✏️ Notitie",
          "text": "✏️ Notitie: Voeg kandidaten toe. (🔴 Rode notitie of rechtsklik: rode notities.)"
        },
        {
          "label": "🔴 Rode notitie",
          "text": "✏️ Notitie: Voeg kandidaten toe. (🔴 Rode notitie of rechtsklik: rode notities.)"
        },
        {
          "label": "↩️ Ongedaan maken",
          "text": "↩️ Ongedaan maken"
        },
        {
          "label": "↪️ Opnieuw",
          "text": "↪️ Opnieuw"
        }
      ]
    },
    {
      "title": "Toetsenbord",
      "items": [
        {
          "label": "↑ ↓ ← →",
          "text": "Beweeg tussen de cellen."
        },
        {
          "label": "1–9",
          "text": "1–9: Voer een cijfer in."
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "Wissen"
        },
        {
          "label": "Enter",
          "text": "✏️ Notitie"
        },
        {
          "label": "Shift+1–9",
          "text": "🔴 Rode notitie"
        },
        {
          "label": "Ctrl+Z",
          "text": "↩️ Ongedaan maken"
        },
        {
          "label": "Ctrl+Y / Ctrl+Shift+Z",
          "text": "↪️ Opnieuw"
        }
      ]
    },
    {
      "title": "Meer informatie",
      "items": [
        {
          "label": "GitHub-repository (internet vereist)",
          "href": "https://github.com/piccoripico/sudoku-html",
          "linkText": "https://github.com/piccoripico/sudoku-html"
        }
      ]
    }
  ],
  "clueOptionLabels": {
    "17": "17 (moeilijkst)",
    "24": "24 (zeer moeilijk)",
    "28": "28 (moeilijk)",
    "32": "32 (normaal)",
    "38": "38 (makkelijk)",
    "44": "44 (zeer makkelijk)"
  }
} satisfies LocaleDictionary;
