import type { LocaleDictionary } from './schema.js';

export const PT_PT = {
  "title": "Sudoku",
  "clueLabel": "Pistas",
  "seedLabel": "Semente (vazio = aleatório)",
  "langLabel": "Idioma",
  "themeLabel": "Tema",
  "themeSystem": "Sistema",
  "themeLight": "Claro",
  "themeDark": "Escuro",
  "preferenceSaveLabel": "Guardar definições",
  "preferenceSaveTitle": "Guardar pistas, semente, idioma, tema e destaques neste navegador",
  "seedPlaceholder": "Opcional (vazio = aleatório)",
  "newGame": "Novo jogo",
  "reset": "Repor início",
  "hint": "Preencher pista",
  "solve": "Mostrar solução",
  "saveGame": "Guardar",
  "loadGame": "Carregar",
  "helpButton": "Ajuda",
  "helpClose": "Fechar",
  "highlightSettingsButton": "Definições",
  "highlightSettingsTitle": "Definições de destaque",
  "highlightCompletedToggle": "Destacar números completos",
  "highlightDuplicateToggle": "Destacar números repetidos",
  "padTitle": "Teclado numérico",
  "undo": "↩️ Anular",
  "redo": "↪️ Refazer",
  "noteButton": "✏️ Nota",
  "redNoteButton": "🔴 Nota vermelha",
  "clearButton": "Limpar",
  "boardAriaLabel": "Grelha de Sudoku",
  "padHelpLine1": "1–9: Introduza um número.",
  "padHelpLine2": "✏️ Nota: Adicione candidatos. (🔴 Nota vermelha ou botão direito: notas vermelhas.)",
  "statusLoading": "A carregar…",
  "statusGenerating": "A gerar…",
  "statusInputPrompt": "Introduza números para resolver o Sudoku.",
  "statusNoHint": "Não existem casas vazias para uma pista.",
  "statusSolved": "Parabéns! Sudoku resolvido. (Tempo: {time})",
  "statusSolutionShown": "Solução apresentada.",
  "statusSaveSuccess": "Jogo guardado com sucesso.",
  "statusSaveError": "Não foi possível guardar o jogo.",
  "statusSaveUnavailable": "Não existe jogo para guardar.",
  "statusLoadSuccess": "Jogo carregado com sucesso.",
  "statusLoadError": "Não foi possível carregar o ficheiro.",
  "statsHintUsed": "Pistas preenchidas: {count}",
  "statsSolutionShown": "Solução apresentada: {state}",
  "statsClues": "Pistas: {count}",
  "statsSeed": "Semente: {seed}",
  "yes": "sim",
  "no": "não",
  "randomSeed": "aleatório ({seed})",
  "helpTitle": "Como jogar",
  "helpSections": [
    {
      "items": [
        {
          "label": "Como começar",
          "text": "Selecione uma casa e introduza um número de 1 a 9."
        },
        {
          "label": "Objetivo",
          "text": "Cada linha, coluna e bloco 3×3 deve conter os números de 1 a 9 uma única vez."
        },
        {
          "label": "Solução única",
          "text": "Cada Sudoku gerado tem apenas uma solução."
        },
        {
          "label": "Destaques",
          "text": "Os números repetidos e os completados corretamente nas nove casas são destacados."
        },
        {
          "label": "Sem ligação",
          "text": "Jogue sem ligação à Internet; a partida não precisa de rede."
        }
      ]
    },
    {
      "title": "Definições e controlos",
      "items": [
        {
          "label": "Pistas",
          "text": "Define quantos números iniciais terá o próximo jogo."
        },
        {
          "label": "Semente (vazio = aleatório)",
          "text": "A mesma semente e as mesmas pistas reproduzem a mesma grelha; vazio é aleatório."
        },
        {
          "label": "Idioma",
          "text": "Altera o idioma da interface."
        },
        {
          "label": "Tema",
          "text": "Escolha Sistema, Claro ou Escuro; Sistema acompanha o dispositivo."
        },
        {
          "label": "Guardar definições",
          "text": "Guarda as preferências só quando ativado; desativar apaga os dados."
        },
        {
          "label": "Novo jogo",
          "text": "Cria um novo Sudoku com as definições atuais."
        },
        {
          "label": "Repor início",
          "text": "Restaura a grelha inicial e reinicia o cronómetro."
        },
        {
          "label": "Preencher pista",
          "text": "Preenche uma casa vazia com o número correto."
        },
        {
          "label": "Mostrar solução",
          "text": "Mostra a solução completa."
        },
        {
          "label": "Definições",
          "text": "Abre as opções de destaque."
        },
        {
          "label": "Ajuda",
          "text": "Abre a ajuda, disponível sem ligação."
        },
        {
          "label": "Guardar",
          "text": "Guarda a grelha, as notas, o tempo e o histórico em JSON."
        },
        {
          "label": "Carregar",
          "text": "Carrega uma partida guardada num ficheiro JSON."
        }
      ]
    },
    {
      "title": "Rato e toque",
      "items": [
        {
          "label": "Selecionar casa",
          "text": "Selecione uma casa e introduza um número de 1 a 9."
        },
        {
          "label": "Introduzir número",
          "text": "1–9: Introduza um número."
        },
        {
          "label": "Limpar",
          "text": "Limpar"
        },
        {
          "label": "✏️ Nota",
          "text": "✏️ Nota: Adicione candidatos. (🔴 Nota vermelha ou botão direito: notas vermelhas.)"
        },
        {
          "label": "🔴 Nota vermelha",
          "text": "✏️ Nota: Adicione candidatos. (🔴 Nota vermelha ou botão direito: notas vermelhas.)"
        },
        {
          "label": "↩️ Anular",
          "text": "↩️ Anular"
        },
        {
          "label": "↪️ Refazer",
          "text": "↪️ Refazer"
        }
      ]
    },
    {
      "title": "Teclado",
      "items": [
        {
          "label": "↑ ↓ ← →",
          "text": "Desloque-se entre as casas."
        },
        {
          "label": "1–9",
          "text": "1–9: Introduza um número."
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "Limpar"
        },
        {
          "label": "Enter",
          "text": "✏️ Nota"
        },
        {
          "label": "Shift+1–9",
          "text": "🔴 Nota vermelha"
        },
        {
          "label": "Ctrl+Z",
          "text": "↩️ Anular"
        },
        {
          "label": "Ctrl+Y / Ctrl+Shift+Z",
          "text": "↪️ Refazer"
        }
      ]
    },
    {
      "title": "Mais informações",
      "items": [
        {
          "label": "Repositório GitHub (requer Internet)",
          "href": "https://github.com/piccoripico/sudoku-html",
          "linkText": "https://github.com/piccoripico/sudoku-html"
        }
      ]
    }
  ],
  "clueOptionLabels": {
    "17": "17 (mais difícil)",
    "24": "24 (muito difícil)",
    "28": "28 (difícil)",
    "32": "32 (normal)",
    "38": "38 (fácil)",
    "44": "44 (muito fácil)"
  }
} satisfies LocaleDictionary;
