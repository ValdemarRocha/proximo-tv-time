# Architecture — Próximo TV Time

## 1. Visão Geral

O Próximo TV Time é uma aplicação de página única (SPA) feita com React e Vite. O `main.jsx` monta o `App` dentro de um `BrowserRouter`. O `App` desenha o menu, o rodapé e, no meio, a página que corresponde à URL (React Router). Cada página busca os próprios dados com um `useEffect`, chamando funções do serviço `tmdb.js`, que conversa com a API do TMDB. As páginas montam a tela com componentes pequenos e reutilizáveis, que recebem tudo por props.

Fluxo dos dados:

```text
main.jsx → BrowserRouter → App.jsx (Navbar + Routes + Footer)
                                 │
                                 ▼
                          pages/*.jsx ───────► services/tmdb.js ───────► API do TMDB
                                 │
                                 ▼
                         components/*.jsx  (recebem os dados por props)
```

Decisões principais:

- **Estilos:** CSS puro em um único arquivo (`src/index.css`), dividido em seções comentadas. Sem biblioteca de UI.
- **Estado:** sem biblioteca de estado global. Cada estado fica na página que o usa e só sobe para o `App` quando duas páginas precisam do mesmo dado (a lista de séries).
- **Sem servidor:** a lista e o fórum ficam no `localStorage` do navegador.
- **Organização:** páginas montam telas, componentes desenham partes, o serviço fala com a API e `data/` guarda listas fixas.

## 2. Estrutura de Pastas

```text
proximo-tv-time/
├── docs/
│   ├── references/
│   │   ├── references.md
│   │   └── imagens/
│   ├── requirements.md
│   └── architecture.md
├── public/
│   └── tmdb-logo.svg          # logo oficial do TMDB (rodapé)
├── src/
│   ├── components/
│   │   ├── Carousel.jsx
│   │   ├── EstadoVazio.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Loading.jsx
│   │   ├── MensagemErro.jsx
│   │   ├── Navbar.jsx
│   │   ├── SerieCard.jsx
│   │   ├── SerieGrid.jsx
│   │   ├── SpoilerText.jsx
│   │   ├── Tabs.jsx
│   │   ├── TopicoCard.jsx
│   │   └── TopicoForm.jsx
│   ├── pages/
│   │   ├── Forum.jsx
│   │   ├── Generos.jsx
│   │   ├── Home.jsx
│   │   ├── MinhaLista.jsx
│   │   ├── NaoEncontrada.jsx
│   │   └── Serie.jsx
│   ├── services/
│   │   └── tmdb.js
│   ├── data/
│   │   ├── forumInicial.js
│   │   ├── generos.js
│   │   └── status.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env                       # chave da API (fora do Git)
├── .env.example               # modelo do .env, sem a chave
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

Pastas e arquivos além do modelo inicial, e por que existem:

- `services/tmdb.js` — reúne todas as chamadas à API em um só lugar, para as páginas não terem URLs espalhadas.
- `data/` — listas fixas usadas em mais de um lugar: os dois gêneros (`generos.js`), os três status da lista (`status.js`) e os tópicos de exemplo do fórum (`forumInicial.js`).
- `public/tmdb-logo.svg` — logo exigido pelas regras de uso da API.
- `.env` e `.env.example` — guardam a chave da API.

## 3. Páginas e Rotas

| Página | Rota | Objetivo |
|---|---|---|
| Início | `/` | F01 — destaque e carrosséis de recomendações |
| Gêneros | `/generos` | F02 — séries por gênero, com abas |
| Série | `/serie/:id` | Detalhes da série (F01) e botões de status da lista (F03) |
| Minha lista | `/minha-lista` | F03 — séries salvas, com abas por status |
| Fórum | `/forum` | F04 — tópicos, votos e comentários |
| Não encontrada | `*` | Mensagem para endereços que não existem, com link para o Início |

Props que o `App` passa para as páginas:

| Página | Props | Para quê |
|---|---|---|
| `Serie` | `lista`, `onDefinirStatus`, `onRemover` | Mostrar o status atual e alterar a lista |
| `MinhaLista` | `lista` | Mostrar as séries salvas |

## 4. Componentes

| Componente | Responsabilidade | Props |
|---|---|---|
| `Navbar` | Menu do topo com `NavLink`; destaca a página atual | nenhuma |
| `Footer` | Rodapé com a seção "Créditos": logo e aviso do TMDB | nenhuma |
| `Hero` | Destaque grande com imagem de fundo, título, sinopse curta e botão "Ver detalhes" | `serie` |
| `Carousel` | Título e fileira horizontal rolável de `SerieCard` | `titulo`, `series` |
| `SerieCard` | Pôster, título e nota; leva para `/serie/:id` | `serie` |
| `SerieGrid` | Grade responsiva de `SerieCard` | `series` |
| `Tabs` | Abas reutilizáveis (Gêneros e Minha lista) | `opcoes`, `ativo`, `onMudar` |
| `Loading` | Mensagem de carregamento | `mensagem` (opcional) |
| `MensagemErro` | Mensagem de erro com o botão "Tentar de novo" | `mensagem`, `onTentarDeNovo` |
| `EstadoVazio` | Mensagem para quando não há itens | `mensagem` |
| `SpoilerText` | Texto borrado até o clique | `texto` |
| `TopicoCard` | Um tópico: título, série, mensagem, voto, comentários e exclusão | `topico`, `onVotar`, `onComentar`, `onExcluir` |
| `TopicoForm` | Formulário de novo tópico, com campos controlados | `onCriar` |

Formato dos objetos que circulam entre os componentes:

- `serie` (vem do TMDB): `id`, `name`, `poster_path`, `backdrop_path`, `overview`, `vote_average`. Os itens da lista guardam os mesmos nomes de campo, para o `SerieCard` funcionar nos dois casos.
- `opcoes` de `Tabs`: lista de `{ valor, rotulo }`.
- `topico`: `{ id, titulo, serie, mensagem, temSpoiler, votos, comentarios }`, em que cada comentário é `{ id, texto, temSpoiler }`.

## 5. Estado da Aplicação

| Estado | Onde será controlado? | Por quê? |
|---|---|---|
| `lista` (séries salvas, cada uma com `status`) | `App.jsx` | Duas páginas usam: `Serie` altera e `MinhaLista` lê. O estado sobe para o pai comum e desce por props |
| `emAlta`, `maisBemAvaliadas` | `Home` | Só a página inicial usa |
| `carregando`, `erro` | `Home`, `Generos` e `Serie` (cada uma tem os seus) | Cada tela tem o próprio ciclo de busca |
| `tentativa` (número) | `Home`, `Generos` e `Serie` | Aumenta quando o usuário clica em "Tentar de novo"; como está nas dependências do `useEffect`, refaz a busca |
| `generoAtivo`, `series` | `Generos` | Só essa página usa; trocar o gênero refaz a busca |
| `serie` (detalhes) | `Serie` | Vem da API a partir do `id` da URL |
| `statusAtivo` | `MinhaLista` | É o filtro da tela; nenhuma outra precisa dele |
| `topicos` | `Forum` | Só o fórum usa; as ações (criar, votar, comentar, excluir) ficam na página e descem por props |
| `titulo`, `serie`, `mensagem`, `temSpoiler` | `TopicoForm` | Campos controlados: o valor mostrado vem do estado |
| `textoComentario`, `comentarioSpoiler` | `TopicoCard` | Cada tópico controla o próprio campo de comentário |
| `revelado` | `SpoilerText` | Cada texto controla se já foi revelado |

Dados salvos no navegador (`localStorage`):

| Chave | Conteúdo |
|---|---|
| `proximoTvTime:lista` | Lista de `{ id, name, poster_path, status }`, com `status` igual a `quero-ver`, `assistindo` ou `assistido` |
| `proximoTvTime:topicos` | Lista de tópicos, no formato descrito na seção 4 |

## 6. useEffect

| Efeito | Quando acontece? | O que faz? |
|---|---|---|
| Buscar recomendações | Ao abrir `Home` e quando `tentativa` muda | Chama `getEmAlta()` e `getMaisBemAvaliadas()`, guarda os resultados e ajusta `carregando` e `erro` |
| Buscar séries do gênero | Ao abrir `Generos` e quando `generoAtivo` ou `tentativa` mudam | Chama `getPorGenero(id)`; a função de limpeza ignora respostas antigas se o usuário trocar de aba rápido |
| Buscar detalhes da série | Ao abrir `Serie` e quando o `id` da URL ou `tentativa` mudam | Chama `getSerie(id)`, com a mesma limpeza |
| Salvar lista | Sempre que `lista` muda | Grava a lista no `localStorage` |
| Salvar tópicos | Sempre que `topicos` muda | Grava os tópicos no `localStorage` |

Observação: ler o `localStorage` na primeira renderização não é feito com `useEffect`. Usa-se uma função como valor inicial do `useState` (`useState(() => ...)`), que roda uma vez, e o `try/catch` ao redor de `JSON.parse` cobre o estado de erro (dados corrompidos).

## 7. Dependências

| Biblioteca | Uso | Motivo |
|---|---|---|
| `react` e `react-dom` | Interface com componentes, estado e efeitos | Base do projeto; vêm no template do Vite |
| `vite` | Servidor de desenvolvimento e build | Vem no template; rápido e simples de configurar |
| `react-router` | Rotas e navegação (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useParams`) | Várias páginas sem recarregar. Na versão 7 tem a mesma API do antigo `react-router-dom` |
| `fetch` (nativo) | Chamadas à API do TMDB | Evita instalar uma biblioteca extra |
| `localStorage` (nativo) | Salvar lista e fórum | O MVP não tem servidor |
| CSS puro | Estilos | O foco é aprender React; sem biblioteca de UI |

## 8. API Externa (TMDB)

**Endereços**

- API: `https://api.themoviedb.org/3`
- Imagens: `https://image.tmdb.org/t/p/` + tamanho + caminho da imagem (por exemplo `w500` para pôsteres e `w1280` para o fundo do destaque)

**Autenticação e parâmetros**

- A chave vai no parâmetro `api_key` da URL. O TMDB também aceita o token de acesso como `Bearer` no cabeçalho; os dois métodos dão o mesmo acesso.
- Toda chamada usa `language=pt-BR`.

**Endpoints usados**

| Função em `tmdb.js` | Endpoint | Usada em |
|---|---|---|
| `getEmAlta()` | `GET /trending/tv/week` | `Home` |
| `getMaisBemAvaliadas()` | `GET /tv/top_rated` | `Home` |
| `getPorGenero(idGenero)` | `GET /discover/tv?with_genres={id}&sort_by=popularity.desc` | `Generos` |
| `getSerie(id)` | `GET /tv/{id}` | `Serie` |
| `urlImagem(caminho, tamanho)` | não chama a API; monta a URL da imagem | `SerieCard`, `Hero`, `Serie` |

**Gêneros**

| Gênero no produto | Gênero no TMDB | id |
|---|---|---|
| Ficção científica | Sci-Fi & Fantasy | `10765` |
| Ação | Action & Adventure | `10759` |

**Chave da API**

- Fica em `.env`, na raiz do projeto: `VITE_TMDB_API_KEY=sua_chave`.
- O código lê com `import.meta.env.VITE_TMDB_API_KEY`.
- O `.env` entra no `.gitignore`; o `.env.example` vai para o Git, sem a chave.
- Depois de mudar o `.env`, é preciso reiniciar o `npm run dev`.
- Variáveis `VITE_` vão para o código enviado ao navegador. Isso é aceitável para uma chave gratuita em um projeto acadêmico; em um produto real, a chamada passaria por um servidor.

**Atribuição**

O `Footer` exibe, na seção "Créditos", o logo oficial do TMDB e o aviso "This product uses the TMDB API but is not endorsed or certified by TMDB."
