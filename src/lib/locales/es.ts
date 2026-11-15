import type { LocaleDictionary } from './schema.js';

export const ES = {
  "title": "Sudoku",
  "clueLabel": "Pistas",
  "seedLabel": "Semilla (vacía = aleatoria)",
  "langLabel": "Idioma",
  "themeLabel": "Tema",
  "themeSystem": "Sistema",
  "themeLight": "Claro",
  "themeDark": "Oscuro",
  "preferenceSaveLabel": "Guardar ajustes",
  "preferenceSaveTitle": "Guardar pistas, semilla, idioma, tema y resaltados en este navegador",
  "seedPlaceholder": "Opcional (vacía = aleatoria)",
  "newGame": "Nuevo sudoku",
  "reset": "Reiniciar",
  "hint": "Completar pista",
  "solve": "Mostrar solución",
  "saveGame": "Guardar",
  "loadGame": "Cargar",
  "helpButton": "Ayuda",
  "helpClose": "Cerrar",
  "highlightSettingsButton": "Ajustes",
  "highlightSettingsTitle": "Ajustes de resaltado",
  "highlightCompletedToggle": "Resaltar números completos",
  "highlightDuplicateToggle": "Resaltar números repetidos",
  "padTitle": "Teclado numérico",
  "undo": "↩️ Deshacer",
  "redo": "↪️ Rehacer",
  "noteButton": "✏️ Nota",
  "redNoteButton": "🔴 Nota roja",
  "clearButton": "Borrar",
  "boardAriaLabel": "Tablero de sudoku",
  "padHelpLine1": "1–9: Introducir un número.",
  "padHelpLine2": "✏️ Nota: Añadir candidatos. (🔴 Nota roja o clic derecho: añadir candidatos rojos.)",
  "statusLoading": "Cargando…",
  "statusGenerating": "Generando…",
  "statusInputPrompt": "Introduce números para resolver el sudoku.",
  "statusNoHint": "No hay casillas vacías para una pista.",
  "statusSolved": "¡Enhorabuena! Sudoku resuelto. (Tiempo: {time})",
  "statusSolutionShown": "Solución mostrada.",
  "statusSaveSuccess": "Se ha guardado el estado actual.",
  "statusSaveError": "No se ha podido guardar el estado.",
  "statusSaveUnavailable": "No hay ningún tablero que guardar.",
  "statusLoadSuccess": "Se ha cargado el estado guardado.",
  "statusLoadError": "No se ha podido cargar el archivo.",
  "statsHintUsed": "Pistas completadas: {count}",
  "statsSolutionShown": "Solución mostrada: {state}",
  "statsClues": "Pistas: {count}",
  "statsSeed": "Semilla: {seed}",
  "yes": "sí",
  "no": "no",
  "randomSeed": "aleatoria ({seed})",
  "helpTitle": "Cómo jugar",
  "helpSections": [
    {
      "items": [
        {
          "label": "Primeros pasos",
          "text": "Selecciona una casilla e introduce un número del 1 al 9."
        },
        {
          "label": "Objetivo",
          "text": "Cada fila, columna y bloque de 3×3 debe contener los números del 1 al 9 una sola vez."
        },
        {
          "label": "Solución única",
          "text": "Todas las cuadrículas generadas tienen una única solución."
        },
        {
          "label": "Resaltado",
          "text": "Se resaltan los números repetidos y los completados correctamente en nueve posiciones; ambas opciones se pueden desactivar."
        },
        {
          "label": "Sin conexión",
          "text": "Puedes jugar sin internet; la partida no necesita conexión de red."
        }
      ]
    },
    {
      "title": "Opciones y botones superiores",
      "items": [
        {
          "label": "Pistas",
          "text": "Cantidad de números iniciales para la próxima partida."
        },
        {
          "label": "Semilla",
          "text": "La misma semilla y cantidad de pistas generan la misma cuadrícula; vacía = aleatoria."
        },
        {
          "label": "Idioma",
          "text": "Cambia el idioma de la interfaz."
        },
        {
          "label": "Tema",
          "text": "Elige Sistema, Claro u Oscuro; Sistema sigue el dispositivo."
        },
        {
          "label": "Guardar ajustes",
          "text": "Guarda pistas, semilla, idioma, tema y ambos resaltados. Está desactivado inicialmente; al desactivarlo se borran los datos."
        },
        {
          "label": "Nuevo sudoku",
          "text": "Genera una partida con las opciones actuales."
        },
        {
          "label": "Reiniciar",
          "text": "Vuelve al tablero inicial y reinicia el cronómetro."
        },
        {
          "label": "Completar pista",
          "text": "Rellena una casilla vacía con el número correcto."
        },
        {
          "label": "Mostrar solución",
          "text": "Muestra la solución completa."
        },
        {
          "label": "Ajustes",
          "text": "Abre los dos ajustes de resaltado."
        },
        {
          "label": "Ayuda",
          "text": "Abre la ayuda sin conexión."
        },
        {
          "label": "Guardar",
          "text": "Guarda tablero, notas, tiempo e historial de deshacer/rehacer en JSON."
        },
        {
          "label": "Cargar",
          "text": "Recupera la partida desde un JSON guardado."
        }
      ]
    },
    {
      "title": "Ratón y pantalla táctil",
      "items": [
        {
          "label": "Elegir casilla",
          "text": "Selecciona una casilla."
        },
        {
          "label": "Introducir número",
          "text": "Pulsa un número del teclado."
        },
        {
          "label": "Borrar",
          "text": "Limpia la casilla seleccionada."
        },
        {
          "label": "✏️ Nota",
          "text": "Activa el modo de candidatos."
        },
        {
          "label": "🔴 Nota roja",
          "text": "Activa las notas rojas; también puedes pulsar con el botón derecho en el modo Nota."
        },
        {
          "label": "↩️ Deshacer",
          "text": "Revierte el último cambio."
        },
        {
          "label": "↪️ Rehacer",
          "text": "Restaura un cambio deshecho."
        }
      ]
    },
    {
      "title": "Teclado",
      "items": [
        {
          "label": "Flechas",
          "text": "Muévete entre casillas."
        },
        {
          "label": "1–9",
          "text": "Introduce un número."
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "Borra la casilla."
        },
        {
          "label": "Enter",
          "text": "Activa o desactiva Nota."
        },
        {
          "label": "Shift+1–9",
          "text": "Introduce una nota roja."
        },
        {
          "label": "Ctrl+Z",
          "text": "Deshacer."
        },
        {
          "label": "Ctrl+Y o Ctrl+Shift+Z",
          "text": "Rehacer."
        }
      ]
    },
    {
      "title": "Más información",
      "items": [
        {
          "label": "Repositorio de GitHub (requiere conexión a internet)",
          "href": "https://github.com/piccoripico/sudoku-html",
          "linkText": "https://github.com/piccoripico/sudoku-html"
        }
      ]
    }
  ],
  "clueOptionLabels": {
    "17": "17 (muy difícil)",
    "24": "24 (difícil)",
    "28": "28 (algo difícil)",
    "32": "32 (normal)",
    "38": "38 (fácil)",
    "44": "44 (muy fácil)"
  }
} as const satisfies LocaleDictionary;
