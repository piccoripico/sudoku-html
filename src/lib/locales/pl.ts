import type { LocaleDictionary } from './schema.js';

export const PL = {
  "title": "Sudoku",
  "clueLabel": "Podpowiedzi",
  "seedLabel": "Ziarno (puste = losowe)",
  "langLabel": "Język",
  "themeLabel": "Motyw",
  "themeSystem": "Systemowy",
  "themeLight": "Jasny",
  "themeDark": "Ciemny",
  "preferenceSaveLabel": "Zapisz ustawienia",
  "preferenceSaveTitle": "Zapisz liczbę podpowiedzi, ziarno, język, motyw i wyróżnienia w przeglądarce",
  "seedPlaceholder": "Opcjonalne (puste = losowe)",
  "newGame": "Nowa łamigłówka",
  "reset": "Zacznij od nowa",
  "hint": "Wstaw podpowiedź",
  "solve": "Pokaż rozwiązanie",
  "saveGame": "Zapisz",
  "loadGame": "Wczytaj",
  "helpButton": "Pomoc",
  "helpClose": "Zamknij",
  "highlightSettingsButton": "Ustawienia",
  "highlightSettingsTitle": "Ustawienia wyróżniania",
  "highlightCompletedToggle": "Wyróżniaj ukończone cyfry",
  "highlightDuplicateToggle": "Wyróżniaj powtórzone cyfry",
  "padTitle": "Panel cyfr",
  "undo": "↩️ Cofnij",
  "redo": "↪️ Ponów",
  "noteButton": "✏️ Notatka",
  "redNoteButton": "🔴 Czerwona notatka",
  "clearButton": "Wyczyść",
  "boardAriaLabel": "Plansza Sudoku",
  "padHelpLine1": "1–9: Wpisz cyfrę.",
  "padHelpLine2": "✏️ Notatka: Dodaj kandydatów. (🔴 Czerwona notatka lub prawy przycisk myszy: czerwone notatki.)",
  "statusLoading": "Ładowanie…",
  "statusGenerating": "Generowanie…",
  "statusInputPrompt": "Wpisuj cyfry, aby rozwiązać Sudoku.",
  "statusNoHint": "Brak pustej komórki na podpowiedź.",
  "statusSolved": "Gratulacje! Sudoku rozwiązane. (Czas: {time})",
  "statusSolutionShown": "Rozwiązanie wyświetlone.",
  "statusSaveSuccess": "Gra zapisana.",
  "statusSaveError": "Nie udało się zapisać gry.",
  "statusSaveUnavailable": "Brak gry do zapisania.",
  "statusLoadSuccess": "Gra wczytana.",
  "statusLoadError": "Nie udało się wczytać pliku.",
  "statsHintUsed": "Wstawione podpowiedzi: {count}",
  "statsSolutionShown": "Rozwiązanie pokazane: {state}",
  "statsClues": "Podpowiedzi: {count}",
  "statsSeed": "Ziarno: {seed}",
  "yes": "tak",
  "no": "nie",
  "randomSeed": "losowe ({seed})",
  "helpTitle": "Jak grać",
  "helpSections": [
    {
      "items": [
        {
          "label": "Rozpoczęcie",
          "text": "Wybierz komórkę i wpisz cyfrę od 1 do 9."
        },
        {
          "label": "Cel",
          "text": "Każdy wiersz, kolumna i blok 3×3 muszą zawierać cyfry 1–9 dokładnie raz."
        },
        {
          "label": "Jedno rozwiązanie",
          "text": "Każda wygenerowana łamigłówka ma dokładnie jedno rozwiązanie."
        },
        {
          "label": "Wyróżnianie",
          "text": "Powtarzające się cyfry i cyfry poprawnie wpisane we wszystkich dziewięciu miejscach są wyróżniane."
        },
        {
          "label": "Offline",
          "text": "Graj bez internetu; podczas gry nie jest wymagane połączenie."
        }
      ]
    },
    {
      "title": "Ustawienia i przyciski",
      "items": [
        {
          "label": "Podpowiedzi",
          "text": "Ustala liczbę początkowych cyfr w kolejnym Sudoku."
        },
        {
          "label": "Ziarno (puste = losowe)",
          "text": "To samo ziarno i liczba podpowiedzi odtworzą tę samą planszę; puste pole = losowo."
        },
        {
          "label": "Język",
          "text": "Zmienia język interfejsu."
        },
        {
          "label": "Motyw",
          "text": "Wybierz Systemowy, Jasny lub Ciemny; Systemowy śledzi urządzenie."
        },
        {
          "label": "Zapisz ustawienia",
          "text": "Zapisuje ustawienia tylko po włączeniu; wyłączenie usuwa je z przeglądarki."
        },
        {
          "label": "Nowa łamigłówka",
          "text": "Tworzy nowe Sudoku z bieżącymi ustawieniami."
        },
        {
          "label": "Zacznij od nowa",
          "text": "Przywraca początkową planszę i zeruje licznik czasu."
        },
        {
          "label": "Wstaw podpowiedź",
          "text": "Wypełnia jedną pustą komórkę poprawną cyfrą."
        },
        {
          "label": "Pokaż rozwiązanie",
          "text": "Pokazuje kompletne rozwiązanie."
        },
        {
          "label": "Ustawienia",
          "text": "Otwiera dwie opcje wyróżniania."
        },
        {
          "label": "Pomoc",
          "text": "Otwiera pomoc dostępną offline."
        },
        {
          "label": "Zapisz",
          "text": "Zapisuje planszę, notatki, czas i historię do JSON."
        },
        {
          "label": "Wczytaj",
          "text": "Wczytuje zapisaną grę z pliku JSON."
        }
      ]
    },
    {
      "title": "Mysz i dotyk",
      "items": [
        {
          "label": "Wybierz komórkę",
          "text": "Wybierz komórkę i wpisz cyfrę od 1 do 9."
        },
        {
          "label": "Wprowadź cyfrę",
          "text": "1–9: Wpisz cyfrę."
        },
        {
          "label": "Wyczyść",
          "text": "Wyczyść"
        },
        {
          "label": "✏️ Notatka",
          "text": "✏️ Notatka: Dodaj kandydatów. (🔴 Czerwona notatka lub prawy przycisk myszy: czerwone notatki.)"
        },
        {
          "label": "🔴 Czerwona notatka",
          "text": "✏️ Notatka: Dodaj kandydatów. (🔴 Czerwona notatka lub prawy przycisk myszy: czerwone notatki.)"
        },
        {
          "label": "↩️ Cofnij",
          "text": "↩️ Cofnij"
        },
        {
          "label": "↪️ Ponów",
          "text": "↪️ Ponów"
        }
      ]
    },
    {
      "title": "Klawiatura",
      "items": [
        {
          "label": "↑ ↓ ← →",
          "text": "Przemieszczaj się między komórkami."
        },
        {
          "label": "1–9",
          "text": "1–9: Wpisz cyfrę."
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "Wyczyść"
        },
        {
          "label": "Enter",
          "text": "✏️ Notatka"
        },
        {
          "label": "Shift+1–9",
          "text": "🔴 Czerwona notatka"
        },
        {
          "label": "Ctrl+Z",
          "text": "↩️ Cofnij"
        },
        {
          "label": "Ctrl+Y / Ctrl+Shift+Z",
          "text": "↪️ Ponów"
        }
      ]
    },
    {
      "title": "Więcej informacji",
      "items": [
        {
          "label": "Repozytorium GitHub (wymaga internetu)",
          "href": "https://github.com/piccoripico/sudoku-html",
          "linkText": "https://github.com/piccoripico/sudoku-html"
        }
      ]
    }
  ],
  "clueOptionLabels": {
    "17": "17 (najtrudniejsze)",
    "24": "24 (bardzo trudne)",
    "28": "28 (trudne)",
    "32": "32 (normalne)",
    "38": "38 (łatwe)",
    "44": "44 (bardzo łatwe)"
  }
} satisfies LocaleDictionary;
