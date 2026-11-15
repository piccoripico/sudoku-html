import type { LocaleDictionary } from './schema.js';

export const IT = {
  "title": "Sudoku",
  "clueLabel": "Indizi",
  "seedLabel": "Seme (vuoto = casuale)",
  "langLabel": "Lingua",
  "themeLabel": "Tema",
  "themeSystem": "Sistema",
  "themeLight": "Chiaro",
  "themeDark": "Scuro",
  "preferenceSaveLabel": "Salva impostazioni",
  "preferenceSaveTitle": "Salva indizi, seme, lingua, tema ed evidenziazioni nel browser",
  "seedPlaceholder": "Facoltativo (vuoto = casuale)",
  "newGame": "Nuovo schema",
  "reset": "Ricomincia",
  "hint": "Inserisci indizio",
  "solve": "Mostra soluzione",
  "saveGame": "Salva",
  "loadGame": "Carica",
  "helpButton": "Aiuto",
  "helpClose": "Chiudi",
  "highlightSettingsButton": "Impostazioni",
  "highlightSettingsTitle": "Impostazioni evidenziazione",
  "highlightCompletedToggle": "Evidenzia numeri completati",
  "highlightDuplicateToggle": "Evidenzia numeri duplicati",
  "padTitle": "Tastierino numerico",
  "undo": "↩️ Annulla",
  "redo": "↪️ Ripeti",
  "noteButton": "✏️ Nota",
  "redNoteButton": "🔴 Nota rossa",
  "clearButton": "Cancella",
  "boardAriaLabel": "Griglia Sudoku",
  "padHelpLine1": "1–9: Inserisci un numero.",
  "padHelpLine2": "✏️ Nota: Aggiungi candidati. (🔴 Nota rossa o clic destro: note rosse.)",
  "statusLoading": "Caricamento…",
  "statusGenerating": "Generazione…",
  "statusInputPrompt": "Inserisci i numeri per risolvere il Sudoku.",
  "statusNoHint": "Nessuna casella vuota per un indizio.",
  "statusSolved": "Complimenti! Sudoku risolto. (Tempo: {time})",
  "statusSolutionShown": "Soluzione visualizzata.",
  "statusSaveSuccess": "Partita salvata.",
  "statusSaveError": "Impossibile salvare la partita.",
  "statusSaveUnavailable": "Nessuna partita da salvare.",
  "statusLoadSuccess": "Partita caricata.",
  "statusLoadError": "Impossibile caricare il file.",
  "statsHintUsed": "Indizi inseriti: {count}",
  "statsSolutionShown": "Soluzione mostrata: {state}",
  "statsClues": "Indizi: {count}",
  "statsSeed": "Seme: {seed}",
  "yes": "sì",
  "no": "no",
  "randomSeed": "casuale ({seed})",
  "helpTitle": "Come giocare",
  "helpSections": [
    {
      "items": [
        {
          "label": "Come iniziare",
          "text": "Seleziona una casella e inserisci un numero da 1 a 9."
        },
        {
          "label": "Obiettivo",
          "text": "Ogni riga, colonna e blocco 3×3 deve contenere tutti i numeri da 1 a 9 una sola volta."
        },
        {
          "label": "Soluzione unica",
          "text": "Ogni Sudoku generato ha un'unica soluzione."
        },
        {
          "label": "Evidenziazioni",
          "text": "I numeri duplicati e quelli corretti in tutte le nove posizioni vengono evidenziati."
        },
        {
          "label": "Offline",
          "text": "Gioca offline: non serve Internet durante la partita."
        }
      ]
    },
    {
      "title": "Impostazioni e comandi",
      "items": [
        {
          "label": "Indizi",
          "text": "Imposta il numero di cifre iniziali nella prossima griglia."
        },
        {
          "label": "Seme (vuoto = casuale)",
          "text": "Lo stesso seme e numero di indizi ricreano la stessa griglia; vuoto significa casuale."
        },
        {
          "label": "Lingua",
          "text": "Cambia la lingua dell'interfaccia."
        },
        {
          "label": "Tema",
          "text": "Scegli Sistema, Chiaro o Scuro; Sistema segue il dispositivo."
        },
        {
          "label": "Salva impostazioni",
          "text": "Salva le preferenze solo quando attivo; disattivandolo le elimina."
        },
        {
          "label": "Nuovo schema",
          "text": "Genera un nuovo Sudoku con le impostazioni attuali."
        },
        {
          "label": "Ricomincia",
          "text": "Ripristina lo schema iniziale e azzera il cronometro."
        },
        {
          "label": "Inserisci indizio",
          "text": "Inserisce la cifra corretta in una casella vuota."
        },
        {
          "label": "Mostra soluzione",
          "text": "Mostra la soluzione completa."
        },
        {
          "label": "Impostazioni",
          "text": "Apre le due opzioni di evidenziazione."
        },
        {
          "label": "Aiuto",
          "text": "Apre l'aiuto disponibile offline."
        },
        {
          "label": "Salva",
          "text": "Salva griglia, note, tempo e cronologia in JSON."
        },
        {
          "label": "Carica",
          "text": "Carica una partita salvata da un file JSON."
        }
      ]
    },
    {
      "title": "Mouse e tocco",
      "items": [
        {
          "label": "Seleziona casella",
          "text": "Seleziona una casella e inserisci un numero da 1 a 9."
        },
        {
          "label": "Inserisci cifra",
          "text": "1–9: Inserisci un numero."
        },
        {
          "label": "Cancella",
          "text": "Cancella"
        },
        {
          "label": "✏️ Nota",
          "text": "✏️ Nota: Aggiungi candidati. (🔴 Nota rossa o clic destro: note rosse.)"
        },
        {
          "label": "🔴 Nota rossa",
          "text": "✏️ Nota: Aggiungi candidati. (🔴 Nota rossa o clic destro: note rosse.)"
        },
        {
          "label": "↩️ Annulla",
          "text": "↩️ Annulla"
        },
        {
          "label": "↪️ Ripeti",
          "text": "↪️ Ripeti"
        }
      ]
    },
    {
      "title": "Tastiera",
      "items": [
        {
          "label": "↑ ↓ ← →",
          "text": "Spostati tra le caselle."
        },
        {
          "label": "1–9",
          "text": "1–9: Inserisci un numero."
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "Cancella"
        },
        {
          "label": "Enter",
          "text": "✏️ Nota"
        },
        {
          "label": "Shift+1–9",
          "text": "🔴 Nota rossa"
        },
        {
          "label": "Ctrl+Z",
          "text": "↩️ Annulla"
        },
        {
          "label": "Ctrl+Y / Ctrl+Shift+Z",
          "text": "↪️ Ripeti"
        }
      ]
    },
    {
      "title": "Altre informazioni",
      "items": [
        {
          "label": "Repository GitHub (richiede Internet)",
          "href": "https://github.com/piccoripico/sudoku-html",
          "linkText": "https://github.com/piccoripico/sudoku-html"
        }
      ]
    }
  ],
  "clueOptionLabels": {
    "17": "17 (più difficile)",
    "24": "24 (molto difficile)",
    "28": "28 (difficile)",
    "32": "32 (normale)",
    "38": "38 (facile)",
    "44": "44 (molto facile)"
  }
} satisfies LocaleDictionary;
