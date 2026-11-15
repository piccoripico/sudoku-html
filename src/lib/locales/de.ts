import type { LocaleDictionary } from './schema.js';

export const DE = {
  "title": "Sudoku",
  "clueLabel": "Vorgaben",
  "seedLabel": "Startwert (leer = zufällig)",
  "langLabel": "Sprache",
  "themeLabel": "Design",
  "themeSystem": "System",
  "themeLight": "Hell",
  "themeDark": "Dunkel",
  "preferenceSaveLabel": "Einstellungen speichern",
  "preferenceSaveTitle": "Vorgaben, Startwert, Sprache, Design und Markierungen im Browser speichern",
  "seedPlaceholder": "Optional (leer = zufällig)",
  "newGame": "Neues Rätsel",
  "reset": "Zurücksetzen",
  "hint": "Hinweis eintragen",
  "solve": "Lösung anzeigen",
  "saveGame": "Speichern",
  "loadGame": "Laden",
  "helpButton": "Hilfe",
  "helpClose": "Schließen",
  "highlightSettingsButton": "Einstellungen",
  "highlightSettingsTitle": "Markierungseinstellungen",
  "highlightCompletedToggle": "Vollständige Zahlen markieren",
  "highlightDuplicateToggle": "Doppelte Zahlen markieren",
  "padTitle": "Zahlenfeld",
  "undo": "↩️ Rückgängig",
  "redo": "↪️ Wiederholen",
  "noteButton": "✏️ Notiz",
  "redNoteButton": "🔴 Rote Notiz",
  "clearButton": "Löschen",
  "boardAriaLabel": "Sudoku-Feld",
  "padHelpLine1": "1–9: Zahl eingeben.",
  "padHelpLine2": "✏️ Notiz: Kandidaten eintragen. (🔴 Rote Notiz oder Rechtsklick: rote Notizen.)",
  "statusLoading": "Laden…",
  "statusGenerating": "Erstellen…",
  "statusInputPrompt": "Trage Zahlen ein, um das Sudoku zu lösen.",
  "statusNoHint": "Keine freie Zelle für einen Hinweis.",
  "statusSolved": "Glückwunsch! Rätsel gelöst. (Zeit: {time})",
  "statusSolutionShown": "Lösung angezeigt.",
  "statusSaveSuccess": "Spielstand gespeichert.",
  "statusSaveError": "Speichern fehlgeschlagen.",
  "statusSaveUnavailable": "Kein Spielstand zum Speichern.",
  "statusLoadSuccess": "Spielstand geladen.",
  "statusLoadError": "Datei konnte nicht geladen werden.",
  "statsHintUsed": "Hinweise verwendet: {count}",
  "statsSolutionShown": "Lösung angezeigt: {state}",
  "statsClues": "Vorgaben: {count}",
  "statsSeed": "Startwert: {seed}",
  "yes": "ja",
  "no": "nein",
  "randomSeed": "zufällig ({seed})",
  "helpTitle": "Spielanleitung",
  "helpSections": [
    {
      "items": [
        {
          "label": "Erste Schritte",
          "text": "Wähle eine Zelle aus und trage eine Zahl von 1 bis 9 ein."
        },
        {
          "label": "Ziel",
          "text": "Jede Zeile, Spalte und jeder 3×3-Block enthält jede Zahl von 1 bis 9 genau einmal."
        },
        {
          "label": "Eindeutige Lösung",
          "text": "Jedes erzeugte Rätsel hat genau eine Lösung."
        },
        {
          "label": "Markierungen",
          "text": "Doppelte und korrekt in allen neun Positionen eingetragene Zahlen werden markiert."
        },
        {
          "label": "Offline",
          "text": "Du kannst offline spielen; während des Spiels ist keine Verbindung nötig."
        }
      ]
    },
    {
      "title": "Einstellungen und Schaltflächen",
      "items": [
        {
          "label": "Vorgaben",
          "text": "Legt fest, wie viele Zahlen im nächsten Rätsel vorgegeben sind."
        },
        {
          "label": "Startwert (leer = zufällig)",
          "text": "Gleicher Startwert und gleiche Vorgabenzahl erzeugen dasselbe Rätsel; leer bedeutet zufällig."
        },
        {
          "label": "Sprache",
          "text": "Ändert die Sprache der Oberfläche."
        },
        {
          "label": "Design",
          "text": "Wähle System, Hell oder Dunkel; System folgt deinem Gerät."
        },
        {
          "label": "Einstellungen speichern",
          "text": "Speichert die Optionen nur nach Aktivierung im Browser; Deaktivieren löscht sie."
        },
        {
          "label": "Neues Rätsel",
          "text": "Erzeugt ein neues Rätsel mit den aktuellen Einstellungen."
        },
        {
          "label": "Zurücksetzen",
          "text": "Stellt das Anfangsrätsel wieder her und setzt die Zeit zurück."
        },
        {
          "label": "Hinweis eintragen",
          "text": "Trägt einen korrekten Wert in eine freie Zelle ein."
        },
        {
          "label": "Lösung anzeigen",
          "text": "Zeigt die vollständige Lösung."
        },
        {
          "label": "Einstellungen",
          "text": "Öffnet die beiden Markierungsoptionen."
        },
        {
          "label": "Hilfe",
          "text": "Öffnet die offline verfügbare Hilfe."
        },
        {
          "label": "Speichern",
          "text": "Speichert Feld, Notizen, Zeit und Verlauf als JSON."
        },
        {
          "label": "Laden",
          "text": "Lädt einen gespeicherten Spielstand aus JSON."
        }
      ]
    },
    {
      "title": "Maus und Touch",
      "items": [
        {
          "label": "Zelle wählen",
          "text": "Wähle eine Zelle aus und trage eine Zahl von 1 bis 9 ein."
        },
        {
          "label": "Zahl eingeben",
          "text": "1–9: Zahl eingeben."
        },
        {
          "label": "Löschen",
          "text": "Löschen"
        },
        {
          "label": "✏️ Notiz",
          "text": "✏️ Notiz: Kandidaten eintragen. (🔴 Rote Notiz oder Rechtsklick: rote Notizen.)"
        },
        {
          "label": "🔴 Rote Notiz",
          "text": "✏️ Notiz: Kandidaten eintragen. (🔴 Rote Notiz oder Rechtsklick: rote Notizen.)"
        },
        {
          "label": "↩️ Rückgängig",
          "text": "↩️ Rückgängig"
        },
        {
          "label": "↪️ Wiederholen",
          "text": "↪️ Wiederholen"
        }
      ]
    },
    {
      "title": "Tastatur",
      "items": [
        {
          "label": "↑ ↓ ← →",
          "text": "Zwischen den Zellen wechseln."
        },
        {
          "label": "1–9",
          "text": "1–9: Zahl eingeben."
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "Löschen"
        },
        {
          "label": "Enter",
          "text": "✏️ Notiz"
        },
        {
          "label": "Shift+1–9",
          "text": "🔴 Rote Notiz"
        },
        {
          "label": "Ctrl+Z",
          "text": "↩️ Rückgängig"
        },
        {
          "label": "Ctrl+Y / Ctrl+Shift+Z",
          "text": "↪️ Wiederholen"
        }
      ]
    },
    {
      "title": "Weitere Informationen",
      "items": [
        {
          "label": "GitHub-Repository (Internet erforderlich)",
          "href": "https://github.com/piccoripico/sudoku-html",
          "linkText": "https://github.com/piccoripico/sudoku-html"
        }
      ]
    }
  ],
  "clueOptionLabels": {
    "17": "17 (schwerste)",
    "24": "24 (sehr schwer)",
    "28": "28 (schwer)",
    "32": "32 (normal)",
    "38": "38 (leicht)",
    "44": "44 (sehr leicht)"
  }
} satisfies LocaleDictionary;
