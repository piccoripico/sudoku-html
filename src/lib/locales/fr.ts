import type { LocaleDictionary } from './schema.js';

export const FR = {
  "title": "Sudoku",
  "clueLabel": "Indices",
  "seedLabel": "Graine (vide = aléatoire)",
  "langLabel": "Langue",
  "themeLabel": "Thème",
  "themeSystem": "Système",
  "themeLight": "Clair",
  "themeDark": "Sombre",
  "preferenceSaveLabel": "Enregistrer les réglages",
  "preferenceSaveTitle": "Enregistrer les indices, la graine, la langue, le thème et les surlignages dans ce navigateur",
  "seedPlaceholder": "Facultatif (vide = aléatoire)",
  "newGame": "Nouvelle grille",
  "reset": "Réinitialiser",
  "hint": "Remplir une case",
  "solve": "Afficher la solution",
  "saveGame": "Enregistrer",
  "loadGame": "Charger",
  "helpButton": "Aide",
  "helpClose": "Fermer",
  "highlightSettingsButton": "Réglages",
  "highlightSettingsTitle": "Réglages de surlignage",
  "highlightCompletedToggle": "Surligner les chiffres complets",
  "highlightDuplicateToggle": "Surligner les chiffres répétés",
  "padTitle": "Pavé numérique",
  "undo": "↩️ Annuler",
  "redo": "↪️ Rétablir",
  "noteButton": "✏️ Note",
  "redNoteButton": "🔴 Note rouge",
  "clearButton": "Effacer",
  "boardAriaLabel": "Grille de sudoku",
  "padHelpLine1": "1–9 : Saisir un chiffre.",
  "padHelpLine2": "✏️ Note : Ajouter des candidats. (🔴 Note rouge ou clic droit : ajouter des notes rouges.)",
  "statusLoading": "Chargement…",
  "statusGenerating": "Génération…",
  "statusInputPrompt": "Saisissez des chiffres pour résoudre la grille.",
  "statusNoHint": "Aucune case vide pour un indice.",
  "statusSolved": "Bravo ! Grille résolue. (Temps : {time})",
  "statusSolutionShown": "Solution affichée.",
  "statusSaveSuccess": "État actuel enregistré.",
  "statusSaveError": "Impossible d’enregistrer l’état.",
  "statusSaveUnavailable": "Aucune grille à enregistrer.",
  "statusLoadSuccess": "État enregistré chargé.",
  "statusLoadError": "Impossible de charger le fichier.",
  "statsHintUsed": "Indices remplis : {count}",
  "statsSolutionShown": "Solution affichée : {state}",
  "statsClues": "Indices : {count}",
  "statsSeed": "Graine : {seed}",
  "yes": "oui",
  "no": "non",
  "randomSeed": "aléatoire ({seed})",
  "helpTitle": "Comment jouer",
  "helpSections": [
    {
      "items": [
        {
          "label": "Démarrage",
          "text": "Sélectionnez une case et saisissez un chiffre de 1 à 9."
        },
        {
          "label": "But",
          "text": "Chaque ligne, colonne et carré de 3×3 doit contenir les chiffres de 1 à 9 une seule fois."
        },
        {
          "label": "Solution unique",
          "text": "Chaque grille générée admet une seule solution."
        },
        {
          "label": "Surlignage",
          "text": "Les chiffres répétés et les chiffres correctement placés dans leurs neuf cases sont surlignés. Chaque option peut être désactivée."
        },
        {
          "label": "Hors ligne",
          "text": "Le jeu fonctionne sans Internet et ne nécessite aucune connexion pendant une partie."
        }
      ]
    },
    {
      "title": "Réglages et boutons en haut",
      "items": [
        {
          "label": "Indices",
          "text": "Définit le nombre de chiffres de départ pour la prochaine grille."
        },
        {
          "label": "Graine",
          "text": "Même graine et même nombre d’indices : même grille. Laisser vide pour le hasard."
        },
        {
          "label": "Langue",
          "text": "Change la langue de l’interface."
        },
        {
          "label": "Thème",
          "text": "Choisissez Système, Clair ou Sombre. Système suit les réglages de l’appareil."
        },
        {
          "label": "Enregistrer les réglages",
          "text": "Enregistre les indices, la graine, la langue, le thème et les deux surlignages. Désactivé par défaut ; la désactivation efface ces données."
        },
        {
          "label": "Nouvelle grille",
          "text": "Génère une grille avec les réglages actuels."
        },
        {
          "label": "Réinitialiser",
          "text": "Rétablit la grille initiale et remet le chronomètre à zéro."
        },
        {
          "label": "Remplir une case",
          "text": "Insère le bon chiffre dans une case vide."
        },
        {
          "label": "Afficher la solution",
          "text": "Affiche la solution complète."
        },
        {
          "label": "Réglages",
          "text": "Ouvre les deux options de surlignage."
        },
        {
          "label": "Aide",
          "text": "Ouvre l’aide hors ligne."
        },
        {
          "label": "Enregistrer",
          "text": "Enregistre grille, notes, temps et historique Annuler/Rétablir en JSON."
        },
        {
          "label": "Charger",
          "text": "Restaure une partie depuis un fichier JSON."
        }
      ]
    },
    {
      "title": "Souris et tactile",
      "items": [
        {
          "label": "Choisir une case",
          "text": "Sélectionnez une case de la grille."
        },
        {
          "label": "Saisir un chiffre",
          "text": "Touchez une touche du pavé numérique."
        },
        {
          "label": "Effacer",
          "text": "Efface la case sélectionnée."
        },
        {
          "label": "✏️ Note",
          "text": "Active les annotations de candidats."
        },
        {
          "label": "🔴 Note rouge",
          "text": "Active les annotations rouges ; un clic droit en mode Note fonctionne aussi."
        },
        {
          "label": "↩️ Annuler",
          "text": "Annule la dernière action."
        },
        {
          "label": "↪️ Rétablir",
          "text": "Répète une action annulée."
        }
      ]
    },
    {
      "title": "Clavier",
      "items": [
        {
          "label": "Flèches",
          "text": "Déplacement entre les cases."
        },
        {
          "label": "1–9",
          "text": "Saisir un chiffre."
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "Effacer la case."
        },
        {
          "label": "Enter",
          "text": "Basculer en mode Note."
        },
        {
          "label": "Shift+1–9",
          "text": "Ajouter une note rouge."
        },
        {
          "label": "Ctrl+Z",
          "text": "Annuler."
        },
        {
          "label": "Ctrl+Y ou Ctrl+Shift+Z",
          "text": "Rétablir."
        }
      ]
    },
    {
      "title": "Plus d’informations",
      "items": [
        {
          "label": "Dépôt GitHub (connexion Internet requise)",
          "href": "https://github.com/piccoripico/sudoku-html",
          "linkText": "https://github.com/piccoripico/sudoku-html"
        }
      ]
    }
  ],
  "clueOptionLabels": {
    "17": "17 (extrême)",
    "24": "24 (très difficile)",
    "28": "28 (difficile)",
    "32": "32 (normal)",
    "38": "38 (facile)",
    "44": "44 (très facile)"
  }
} as const satisfies LocaleDictionary;
