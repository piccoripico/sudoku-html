import type { LocaleDictionary } from './schema.js';

export const PT_BR = {
  "title": "Sudoku",
  "clueLabel": "Dicas",
  "seedLabel": "Semente (vazio = aleatório)",
  "langLabel": "Idioma",
  "themeLabel": "Tema",
  "themeSystem": "Sistema",
  "themeLight": "Claro",
  "themeDark": "Escuro",
  "preferenceSaveLabel": "Salvar configurações",
  "preferenceSaveTitle": "Salvar dicas, semente, idioma, tema e destaques neste navegador",
  "seedPlaceholder": "Opcional (vazio = aleatório)",
  "newGame": "Novo jogo",
  "reset": "Reiniciar",
  "hint": "Preencher dica",
  "solve": "Mostrar solução",
  "saveGame": "Salvar",
  "loadGame": "Carregar",
  "helpButton": "Ajuda",
  "helpClose": "Fechar",
  "highlightSettingsButton": "Configurações",
  "highlightSettingsTitle": "Configurações de destaque",
  "highlightCompletedToggle": "Destacar números completos",
  "highlightDuplicateToggle": "Destacar números duplicados",
  "padTitle": "Teclado numérico",
  "undo": "↩️ Desfazer",
  "redo": "↪️ Refazer",
  "noteButton": "✏️ Anotação",
  "redNoteButton": "🔴 Anotação vermelha",
  "clearButton": "Limpar",
  "boardAriaLabel": "Tabuleiro de Sudoku",
  "padHelpLine1": "1–9: Insira um número.",
  "padHelpLine2": "✏️ Anotação: Adicione candidatos. (🔴 Anotação vermelha ou clique direito: anotações vermelhas.)",
  "statusLoading": "Carregando…",
  "statusGenerating": "Gerando…",
  "statusInputPrompt": "Insira números para resolver o Sudoku.",
  "statusNoHint": "Não há células vazias para uma dica.",
  "statusSolved": "Parabéns! Sudoku resolvido. (Tempo: {time})",
  "statusSolutionShown": "Solução exibida.",
  "statusSaveSuccess": "Jogo salvo com sucesso.",
  "statusSaveError": "Não foi possível salvar o jogo.",
  "statusSaveUnavailable": "Não há jogo para salvar.",
  "statusLoadSuccess": "Jogo carregado com sucesso.",
  "statusLoadError": "Não foi possível carregar o arquivo.",
  "statsHintUsed": "Dicas preenchidas: {count}",
  "statsSolutionShown": "Solução exibida: {state}",
  "statsClues": "Dicas: {count}",
  "statsSeed": "Semente: {seed}",
  "yes": "sim",
  "no": "não",
  "randomSeed": "aleatório ({seed})",
  "helpTitle": "Como jogar",
  "helpSections": [
    {
      "items": [
        {
          "label": "Primeiros passos",
          "text": "Selecione uma célula e digite um número de 1 a 9."
        },
        {
          "label": "Objetivo",
          "text": "Cada linha, coluna e bloco 3×3 deve conter todos os números de 1 a 9 uma única vez."
        },
        {
          "label": "Solução única",
          "text": "Todo Sudoku gerado tem solução única."
        },
        {
          "label": "Destaques",
          "text": "Números repetidos e números concluídos nas nove posições corretas ficam destacados."
        },
        {
          "label": "Sem conexão",
          "text": "Jogue sem conexão; nenhuma rede é necessária durante a partida."
        }
      ]
    },
    {
      "title": "Configurações e controles",
      "items": [
        {
          "label": "Dicas",
          "text": "Define quantos números já estarão preenchidos no próximo jogo."
        },
        {
          "label": "Semente (vazio = aleatório)",
          "text": "A mesma semente com o mesmo número de dicas reproduz o mesmo jogo; vazio gera um aleatório."
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
          "label": "Salvar configurações",
          "text": "Salva as preferências no navegador somente quando ativado; desativar apaga os dados."
        },
        {
          "label": "Novo jogo",
          "text": "Cria um novo Sudoku com as opções atuais."
        },
        {
          "label": "Reiniciar",
          "text": "Restaura o tabuleiro inicial e reinicia o cronômetro."
        },
        {
          "label": "Preencher dica",
          "text": "Preenche uma célula vazia com o número correto."
        },
        {
          "label": "Mostrar solução",
          "text": "Mostra toda a solução."
        },
        {
          "label": "Configurações",
          "text": "Abre as opções de destaques."
        },
        {
          "label": "Ajuda",
          "text": "Abre a ajuda, disponível sem conexão."
        },
        {
          "label": "Salvar",
          "text": "Salva o tabuleiro, as notas, o cronômetro e o histórico em JSON."
        },
        {
          "label": "Carregar",
          "text": "Carrega uma partida salva de um arquivo JSON."
        }
      ]
    },
    {
      "title": "Mouse e toque",
      "items": [
        {
          "label": "Selecionar célula",
          "text": "Selecione uma célula e digite um número de 1 a 9."
        },
        {
          "label": "Digitar número",
          "text": "1–9: Insira um número."
        },
        {
          "label": "Limpar",
          "text": "Limpar"
        },
        {
          "label": "✏️ Anotação",
          "text": "✏️ Anotação: Adicione candidatos. (🔴 Anotação vermelha ou clique direito: anotações vermelhas.)"
        },
        {
          "label": "🔴 Anotação vermelha",
          "text": "✏️ Anotação: Adicione candidatos. (🔴 Anotação vermelha ou clique direito: anotações vermelhas.)"
        },
        {
          "label": "↩️ Desfazer",
          "text": "↩️ Desfazer"
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
          "text": "Mova-se entre as células."
        },
        {
          "label": "1–9",
          "text": "1–9: Insira um número."
        },
        {
          "label": "0 / Backspace / Delete",
          "text": "Limpar"
        },
        {
          "label": "Enter",
          "text": "✏️ Anotação"
        },
        {
          "label": "Shift+1–9",
          "text": "🔴 Anotação vermelha"
        },
        {
          "label": "Ctrl+Z",
          "text": "↩️ Desfazer"
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
          "label": "Repositório GitHub (exige conexão)",
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
