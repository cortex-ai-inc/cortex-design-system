# Cortex Design System — Documento de Conceito

## O Produto

Cortex Design System é a **identidade visual e o sistema de componentes** que unifica todos os produtos da Cortex AI em uma experiência coesa, escura, compacta e profissional. É a "voz visual" da empresa — o conjunto de regras, padrões e componentes que faz qualquer produto Cortex ser reconhecível como Cortex antes mesmo de ler o logo.

Não é uma biblioteca de componentes qualquer. É um **padrão de marca** codificado, que garante consistência entre produtos construídos por equipes diferentes, em momentos diferentes, sem necessidade de coordenação entre elas.

## O Problema

Empresas de tecnologia que constroem múltiplos produtos enfrentam um dilema conhecido:

- Cada equipe de produto cria seu próprio visual — cores, tipografia, componentes, comportamentos.
- O usuário sente a diferença: "isso parece de outro produto".
- Designers refazem os mesmos componentes para cada produto.
- Desenvolvedores implementam o mesmo botão de formas diferentes.
- A marca se dilui em inconsistências.

Para a Cortex AI — que já possui três produtos (Cortex Note, Cortex Coder, Cortex Support) e planeja mais — esse problema era iminente. Cada produto precisava ser construído rápido, por equipes independentes, sem um time de design central. A solução não era criar mais processos, era criar um **código fonte compartilhado da identidade visual**: o design system.

## A Visão

Um sistema de design que é **tão opinado que elimina decisões**. Um desenvolvedor (ou uma IA) lê as regras e sabe exatamente como fazer um botão, um card, uma tabela — sem precisar perguntar para um designer. Um sistema onde:

- A paleta de cores é **fixa e semântica**: verde é sucesso, vermelho é erro, azul é primário. Não existem "tons que talvez funcionem".
- O layout segue **padrões documentados**: formulários em grid 2-col até 5xl, páginas de edição nunca em modal, toggle via query parameter.
- As regras são **rígidas e conhecidas**: border-radius máximo de 6px, icons sempre 16x16 com stroke 1.5, sem rounded-full em lugar nenhum.
- Até uma **IA consegue gerar código no estilo Cortex** — os arquivos LLM/ são documentação escrita para modelos de linguagem, permitindo que assistentes de IA gerem UI consistente com a marca sem supervisão humana.

## A Identidade Visual

### Dark Mode como Padrão

Diferente de sistemas de design tradicionais que suportam light e dark como pares simétricos, o Cortex Design System é **dark-only por escolha**. Isso não é uma limitação técnica — é uma declaração de identidade:

- Produtos profissionais e ferramentas de desenvolvedor são escuros. É o visual de ambientes de trabalho sérios.
- Reduz fadiga visual em sessões longas de uso.
- Cria uma presença visual única e reconhecível: nenhum produto Cortex será confundido com um concorrente só de olhar.

### Paleta de Superfícies

Em vez de usar sombras para criar profundidade (o padrão da web), o sistema usa **tons de superfície**: 5 níveis de cinza-azulado escuro que criam hierarquia visual. Quanto mais escuro, mais "fundo". Quanto mais claro, mais "frente". Panel, card, sidebar, modal — cada um tem sua cor de superfície designada.

Isso é tanto estético quanto funcional: elimina a complexidade de gerenciar sombras consistentes e força um visual limpo e chapado, sem decoração desnecessária.

### O Gradiente Azul

`#ADC6FF → #4D8EFF` é a assinatura visual da marca. Aparece em botões primários, indicadores ativos, destaques de navegação e acentos decorativos. É o único gradiente do sistema — repetido à exaustão até se tornar reconhecível como "a cor do Cortex".

### Profundidade e Luz

A camada tonal continua sendo a linguagem primária de profundidade — cards e painéis não recebem sombra. Existem apenas dois níveis nomeados de sombra, reservados a elementos flutuantes: `shadow-overlay` para pequenos flutuantes (dropdowns, tooltips, popovers) e `shadow-ambient` para superfícies modais.

O **glow azul** (`shadow-glow-primary`) é o único floreio luminoso do sistema: um halo derivado do gradiente, permitido exclusivamente sobre elementos `gradient-primary` e no máximo um por tela. É a exceção que confirma a sobriedade.

**Violeta** (`#A78BFA`, IA/inteligência) e **teal** (`#22D3EE`, dados/métricas) são vozes de apoio — categorizam e decoram, mas nunca competem com o azul: jamais aparecem em botões, links, focus rings, estados marcados ou navegação ativa.

O movimento é sóbrio: 150/200/300ms, sempre `ease-out`, sem springs ou bounces. Nada acima de 300ms exceto loops de carregamento — e tudo respeita `prefers-reduced-motion`.

### Tipografia: A Escolha do Profissional

- **Inter** para corpo de texto — utilitária, legível, compacta (13px padrão). Prioriza densidade de informação sobre espaçamento.
- **JetBrains Mono** para código — reforça o posicionamento da Cortex como empresa de ferramentas para desenvolvedores e profissionais de tecnologia.

### O Toque New York

Baseado no estilo New York do shadcn/ui: cantos levemente arredondados (4px padrão, máximo 6px), linhas finas, espaçamento compacto. Nada de pill shapes, nada de border-radius exagerado. É contido, sério, profissional.

## Como é Usado

O design system vive como documentação em três formas:

1. **Documentação visual (`index.html`)** — Página web interativa com demonstração de cada componente e padrão. O que um designer ou dev front-end abre no navegador para explorar.
2. **Documentação para LLM (`llm/`)** — 40 arquivos de componentes + 6 padrões em markdown estruturado, escritos especificamente para que modelos de linguagem (Claude, GPT, etc.) gerem código no estilo Cortex com precisão.
3. **Código fonte real** — Os componentes em si vivem nos repositórios de cada produto (`cortex-note-app`, `cortex-coder-front`, `cortex-support-front`) como componentes shadcn/ui em `@/components/ui/`, consumindo as tokens de design via Tailwind CSS.

## O Público

- **Equipes de engenharia da Cortex AI** — que precisam construir UI de produtos sem depender de um time de design central.
- **IAs / assistentes de código** — o sistema é explicitamente documentado para consumo por LLMs, permitindo geração automatizada de UI no estilo da marca.
- **Designers** — que definem as tokens e padrões, e validam a implementação.
- **Novos integrantes** — que leem a documentação e em minutos entendem como contribuir visualmente sem violar a identidade da marca.

## Produtos que o Cortex Design System Atende

| Produto | Descrição |
|---|---|
| **[Cortex Coder](https://github.com/cortex-ai-inc/cortex-coder-front)** | Assistente de codificação com IA — chat, pipelines, edição de código, diffs |
| **[Cortex Support](https://github.com/cortex-ai-inc/cortex-support-front)** | Dashboard de suporte — tickets, admin, notificações |
| **[Cortex Note App](../cortex-note-app)** | Gravador e transcritor de reuniões inteligente |
| **cortex-coder-home** | Site de marketing / landing page |

## O que Não É

- **Não é Figma ou Sketch:** não existem arquivos de design tool. Tudo é código e documentação em markdown. É um design system **developer-first**.
- **Não é uma biblioteca npm pública:** o sistema é interno da Cortex AI Inc., licenciado como "Internal".
- **Não é um framework CSS:** é um conjunto de padrões e componentes React, não um framework genérico reutilizável fora do ecossistema Cortex.
- **Não é um tema visualizável no Storybook:** a documentação é HTML estático + markdown, não Storybook. Prioriza clareza e acessibilidade para LLMs sobre interatividade de demonstração.

## Diferenciais Estratégicos

| Característica | Cortex DS | Design System Típico |
|---|---|---|
| **Documentação para LLM** | Sim (`llm/` diretório dedicado) | Raro |
| **Dark-only por escolha, não por opção** | Sim | Não (light e dark duais) |
| **Hierarquia por tonalidade, não sombra** | Sim | Não (sombras) |
| **Regras rígidas e documentadas** | Sim (max-radius, icon-size, no-modals-for-forms) | Parcial |
| **Type-safe styling (CVA + cn())** | Sim | Variável |
| **Baseado em shadcn/ui (componentes copiáveis)** | Sim | Não (pacotes npm) |
| **Zero dependência de design tools** | Sim | Não (Figma é padrão) |

## A Filosofia

O Cortex Design System acredita que **consistência não vem de criatividade, vem de regras**. Quanto mais rígidas e documentadas as regras, mais consistente a experiência do usuário final — e mais rápido cada produto pode ser construído.

"O botão não é um lugar para expressão individual. O botão é um botão. Onde ele leva, sim, é o que importa."
