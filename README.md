# Próximo TV Time

Plataforma web responsiva para descobrir séries, organizar o que você assiste e conversar sobre elas sem levar spoilers. Projeto acadêmico inspirado no TV Time, feito em React.

## Integrantes

- Valdemar da Rocha Formiga Neto - RM 573382

## Problema

O TV Time foi, por cerca de uma década, um dos aplicativos mais usados para acompanhar séries e filmes. Em julho de 2026 ele anunciou o encerramento das atividades por inviabilidade financeira, e quem o usava ficou sem um lugar simples para **descobrir o que assistir** e **organizar o que já assistiu**. Sem isso, escolher o próximo título toma tempo, e é fácil esquecer o que já foi visto ou o que ficou para depois.

## Solução

O Próximo TV Time recria, em versão enxuta e para a web, quatro funções do TV Time original:

1. recomendações do que assistir, com fileiras de pôsteres no estilo da Netflix;
2. séries por gênero (Ficção científica e Ação);
3. uma lista pessoal, com status no estilo do Notion, para separar o que se quer ver, o que se está vendo e o que já foi visto;
4. um fórum de discussões, no estilo do Reddit, com aviso de spoiler.

O foco do MVP é ter uma navegação que funciona, telas agradáveis e um código organizado, seguindo a metodologia Spec Driven Development: a especificação (pasta `docs/`) vem antes do código.

## Funcionalidades

- **Recomendações:** página inicial com destaque e carrosséis "Em alta esta semana" e "Mais bem avaliadas".
- **Detalhes da série:** pôster, sinopse, nota, temporadas e gêneros.
- **Séries por gênero:** abas Ficção científica e Ação.
- **Minha lista:** status Quero ver, Assistindo e Assistido, salvos no navegador.
- **Fórum:** criar tópicos, votar, comentar, excluir e esconder spoilers até o clique.
- **Layout responsivo:** funciona no celular e no computador.
- **Estados de tela:** carregando, vazio e erro tratados nas páginas que buscam dados.

## Tecnologias

- React (componentes, props, `useState` e `useEffect`)
- Vite
- React Router (rotas e navegação)
- JavaScript (ES6+)
- CSS puro
- `localStorage`, para salvar a lista e o fórum no navegador
- Git e GitHub

## API usada

**TMDB (The Movie Database)** — API v3, gratuita para uso não comercial. Fornece séries, pôsteres, notas e gêneros. Endpoints usados:

- `GET /trending/tv/week` — séries em alta
- `GET /tv/top_rated` — séries mais bem avaliadas
- `GET /discover/tv` — séries por gênero
- `GET /tv/{id}` — detalhes de uma série

## Uso de IA

Ferramenta usada: **Claude**, assistente de IA da Anthropic. Ela foi usada como apoio de estudo e de planejamento; o código React foi escrito à mão pelo integrante, para aprender como o React funciona.

Como a IA ajudou:

- **Pesquisa:** levantou o que o TV Time oferecia, o contexto do encerramento e o que concorrentes como Sofa Time, Trakt e Banco de Séries fazem, o que ajudou a decidir o recorte de quatro funções.
- **Definição do escopo:** transformou o enunciado em quatro funções, sugeriu o problema a resolver (organizar o que já foi assistido), a API (TMDB) e as decisões técnicas, como rotas, onde fica cada estado e o uso de `localStorage`.
- **Spec Driven Development:** escreveu, a partir dos modelos, os rascunhos de `requirements.md`, `architecture.md` e `references.md`, que foram lidos e ajustados pelo integrante. Também revisou os modelos e apontou uma marcação solta e duas seções que faltavam (user stories e regras do produto).
- **Roteiro:** montou o passo a passo da estrutura inicial e da construção do projeto, uma etapa de cada vez.
- **Tutoria:** explicou conceitos de React (componentes, props, estado, efeitos e rotas) e ajudou a entender erros durante o desenvolvimento.
- **Documentação:** redigiu este README.

Cuidado adotado: as sugestões da IA foram lidas, testadas e ajustadas pelo integrante antes de entrarem no projeto.

## Instruções de execução

**Pré-requisitos**

- Node.js (versão LTS) e npm
- Uma chave gratuita da API do TMDB: crie uma conta em https://www.themoviedb.org, abra as configurações da conta, clique em "API" e solicite a chave.

**Passo a passo**

```bash
# 1. Baixe o projeto
git clone https://github.com/ValdemarRocha/proximo-tv-time
cd CP1-TV-time

# 2. Instale as dependências
npm install

# 3. Crie o arquivo de variáveis de ambiente
cp .env.example .env        # no Windows (cmd): copy .env.example .env

# 4. Abra o arquivo .env e coloque a sua chave:
#    VITE_TMDB_API_KEY=sua_chave_aqui

# 5. Rode o projeto
npm run dev
```

Abra o endereço mostrado no terminal, normalmente http://localhost:5173.

Para gerar a versão de produção, use `npm run build`; para visualizá-la, `npm run preview`.

## Estrutura do projeto

```text
proximo-tv-time/
├── docs/
│   ├── references/          # imagens de referência e references.md
│   ├── requirements.md      # o que o produto faz
│   └── architecture.md      # como o código é organizado
├── public/                  # logo do TMDB
├── src/
│   ├── components/          # peças reutilizáveis da interface
│   ├── pages/               # uma página por rota
│   ├── services/            # chamadas à API do TMDB
│   ├── data/                # listas fixas (gêneros, status, tópicos de exemplo)
│   ├── App.jsx              # rotas e estado da lista
│   ├── main.jsx
│   └── index.css
└── README.md
```

## Créditos

Este produto usa a API do TMDB, mas não é endossado ou certificado pelo TMDB.

This product uses the TMDB API but is not endorsed or certified by TMDB.