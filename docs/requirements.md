# Requirements — Próximo TV Time

## 1. Visão do Produto

### Nome
Próximo TV Time

### Problema
Com o encerramento do TV Time, que saiu do ar após 15 de julho de 2026, quem acompanha séries perdeu um lugar simples para descobrir o que assistir, organizar o que já viu e conversar sobre as séries. Sem uma ferramenta assim, escolher o próximo título toma tempo e é fácil esquecer o que já foi assistido ou o que ficou para ver depois.

### Público
Pessoas que assistem a séries com frequência, incluindo ex-usuários do TV Time, que usam celular e computador e querem descobrir títulos novos, organizar suas séries e trocar opiniões sem levar spoilers.

### Proposta de solução
Uma plataforma web responsiva, feita em React, que reúne quatro funções inspiradas no TV Time: recomendações do que assistir, séries por gênero (Ficção científica e Ação), uma lista pessoal para organizar o que se quer ver, o que se está vendo e o que já foi visto, e um fórum de discussões com aviso de spoiler. Os dados das séries vêm da API do TMDB; a lista e o fórum ficam salvos no próprio navegador.

## 2. Objetivo do MVP

Ao final do projeto, o usuário consegue:

- navegar entre as páginas Início, Gêneros, Série, Minha lista e Fórum sem recarregar a página;
- ver recomendações reais de séries, vindas da API do TMDB;
- listar séries de Ficção científica e de Ação;
- salvar séries em Minha lista (Quero ver, Assistindo, Assistido) e encontrá-las de novo depois de fechar o navegador;
- criar tópicos e comentários no fórum, com conteúdo de spoiler escondido até o clique;
- usar tudo no celular e no computador, com os estados de carregando, vazio e erro tratados.

## 3. Funcionalidades

### F01 — Recomendações do que assistir

**Descrição:** A página inicial (`/`) mostra um destaque com uma série em alta e dois carrosséis: "Em alta esta semana" e "Mais bem avaliadas". Ao clicar em um card, o usuário abre a página da série (`/serie/:id`), com pôster, sinopse, nota, número de temporadas e gêneros.

**User stories:**
- Como espectador indeciso, quero ver séries em alta assim que abro o site, para escolher o que assistir sem precisar pesquisar.
- Como espectador, quero ver a sinopse e a nota de uma série, para decidir se vale a pena começar.
- Como espectador, quero navegar pelos carrosséis com o dedo ou com o mouse, para explorar vários títulos rapidamente.

**Critérios de aceitação:**
- [ ] Ao abrir `/`, a página busca na API as séries em alta e as mais bem avaliadas e mostra os dois carrosséis.
- [ ] O destaque mostra imagem de fundo, título e sinopse resumida da primeira série em alta.
- [ ] Cada card mostra pôster, título e nota (com uma casa decimal).
- [ ] Clicar em um card, ou no botão "Ver detalhes" do destaque, leva a `/serie/:id`.
- [ ] A página da série mostra título, pôster, sinopse, nota, número de temporadas e gêneros.
- [ ] Série sem sinopse mostra "Sinopse indisponível."; série sem pôster mostra um espaço reservado no lugar da imagem.
- [ ] Enquanto os dados carregam, aparece "Carregando…"; se a busca falhar, aparece uma mensagem de erro com o botão "Tentar de novo".

**Estados:**
- [ ] Inicial — a página abre e ainda não há dados.
- [ ] Carregando — mostra "Carregando…" no lugar do conteúdo.
- [ ] Sucesso — mostra o destaque e os carrosséis.
- [ ] Vazio — a API responde sem séries; mostra "Nenhuma série encontrada."
- [ ] Erro — mostra a mensagem de erro e o botão "Tentar de novo".

### F02 — Séries por gênero

**Descrição:** A página `/generos` tem duas abas, "Ficção científica" e "Ação". Ao escolher uma aba, o usuário vê uma grade com séries populares daquele gênero.

**User stories:**
- Como fã de ficção científica, quero ver só séries desse gênero, para descobrir títulos parecidos com os que já gosto.
- Como fã de ação, quero trocar para o gênero Ação sem sair da página, para comparar opções rapidamente.

**Critérios de aceitação:**
- [ ] A página abre com a aba "Ficção científica" ativa.
- [ ] Ao clicar em "Ação", a grade é substituída por séries desse gênero, sem recarregar a página.
- [ ] A aba ativa fica visualmente destacada.
- [ ] Cada card leva à página da série (`/serie/:id`).
- [ ] Ao trocar de aba, aparece "Carregando…" até as séries chegarem; se a busca falhar, aparece a mensagem de erro com "Tentar de novo".

**Estados:**
- [ ] Inicial — aba "Ficção científica" selecionada e ainda sem dados.
- [ ] Carregando — mostra "Carregando…" no lugar da grade.
- [ ] Sucesso — mostra a grade de séries do gênero.
- [ ] Vazio — mostra "Nenhuma série encontrada neste gênero."
- [ ] Erro — mostra a mensagem de erro e o botão "Tentar de novo".

### F03 — Minha lista

**Descrição:** Na página da série, o usuário escolhe um status: "Quero ver", "Assistindo" ou "Assistido". A página `/minha-lista` reúne as séries salvas, com abas por status. Para mudar o status ou remover uma série, o usuário abre a página dela clicando no card. A lista fica salva no navegador.

**User stories:**
- Como espectador, quero guardar as séries que pretendo ver, para não esquecer delas.
- Como espectador, quero marcar o que já assisti, para ter meu histórico organizado.
- Como espectador, quero mudar o status ou remover uma série, para manter minha lista atualizada.

**Critérios de aceitação:**
- [ ] Na página da série há três botões de status; o status atual da série fica destacado.
- [ ] Escolher outro status substitui o anterior: uma série tem um status por vez.
- [ ] Quando a série já está na lista, aparece o botão "Remover da lista"; ao clicar, a série sai de Minha lista.
- [ ] `/minha-lista` mostra abas por status, cada uma com a quantidade de séries.
- [ ] Clicar em uma série da lista abre a página dela (`/serie/:id`).
- [ ] Recarregar a página, ou fechar e abrir o navegador, mantém a lista.
- [ ] Sem séries no status escolhido, aparece uma mensagem com um link para descobrir séries.

**Estados:**
- [ ] Inicial — a lista é lida do navegador quando o site abre.
- [ ] Carregando — não se aplica (os dados são locais).
- [ ] Sucesso — mostra, em grade, as séries do status escolhido.
- [ ] Vazio — mostra "Você ainda não tem séries aqui." com um link para o Início.
- [ ] Erro — se os dados salvos estiverem corrompidos, a lista recomeça vazia.

### F04 — Fórum de discussões

**Descrição:** A página `/forum` lista tópicos no estilo Reddit, cada um com título, série relacionada, votos e comentários. O usuário cria tópicos, vota, comenta e exclui tópicos. Tópicos e comentários marcados como spoiler ficam borrados até o usuário clicar para revelar. Como o MVP não tem servidor, o conteúdo fica salvo apenas neste navegador.

**User stories:**
- Como espectador, quero abrir um tópico sobre uma série, para conversar sobre ela.
- Como espectador, quero votar nos tópicos, para destacar os que acho mais interessantes.
- Como espectador, quero comentar nos tópicos, para participar da conversa.
- Como espectador, quero que os spoilers fiquem escondidos, para não estragar o que ainda não vi.

**Critérios de aceitação:**
- [ ] O formulário tem título, série, mensagem e a opção "Contém spoiler"; título e mensagem são obrigatórios.
- [ ] O novo tópico aparece no topo da lista.
- [ ] O botão de voto aumenta em 1 o contador do tópico.
- [ ] Cada tópico aceita comentários; comentário vazio não é aceito.
- [ ] Tópico ou comentário marcado como spoiler aparece borrado, com o aviso "Contém spoiler — clique para ver", e é revelado ao clicar.
- [ ] O usuário consegue excluir um tópico.
- [ ] Tópicos e comentários continuam ali depois de recarregar a página.
- [ ] Na primeira visita, o fórum já vem com alguns tópicos de exemplo.

**Estados:**
- [ ] Inicial — lê os tópicos salvos ou, na primeira visita, carrega os de exemplo.
- [ ] Carregando — não se aplica (os dados são locais).
- [ ] Sucesso — mostra a lista de tópicos.
- [ ] Vazio — mostra "Nenhum tópico ainda. Abra a primeira discussão!"
- [ ] Erro — se os dados salvos estiverem corrompidos, volta aos tópicos de exemplo.

## 4. Regras do Produto

- **RN01** — O MVP trata apenas de séries; filmes ficam fora do escopo.
- **RN02** — Existem só dois gêneros: Ficção científica e Ação. No TMDB os gêneros de séries são combinados, então o produto usa "Sci-Fi & Fantasy" (id 10765) para Ficção científica e "Action & Adventure" (id 10759) para Ação.
- **RN03** — Uma série tem um único status por vez em Minha lista: Quero ver, Assistindo ou Assistido.
- **RN04** — Minha lista guarda só o essencial de cada série (id, nome, pôster e status), para abrir a lista sem depender da API.
- **RN05** — Não há login nem servidor: lista e fórum ficam no navegador (`localStorage`) e não são compartilhados entre pessoas ou aparelhos.
- **RN06** — Conteúdo marcado como spoiler fica escondido até o usuário pedir para ver.
- **RN07** — Para criar um tópico, título e mensagem são obrigatórios; um comentário não pode ser vazio (espaços não contam).
- **RN08** — Toda tela que busca dados na API trata os estados carregando, sucesso, vazio e erro.
- **RN09** — Os dados da API são pedidos em português do Brasil (`language=pt-BR`).
- **RN10** — A chave da API fica em um arquivo `.env`, que não vai para o repositório.
- **RN11** — O rodapé (seção "Créditos") exibe o logo oficial do TMDB e o aviso "This product uses the TMDB API but is not endorsed or certified by TMDB.", como exige o uso da API.
- **RN12** — O uso da API do TMDB é gratuito e sem fins comerciais (projeto acadêmico).

## 5. Fora do Escopo

- Filmes
- Login, contas e perfis de usuário
- Fórum compartilhado entre usuários (exigiria servidor e banco de dados)
- Marcar episódio por episódio e acompanhar o progresso por temporada
- Estatísticas de tempo assistido
- Calendário de lançamentos e notificações
- Onde assistir (plataformas de streaming)
- Busca por texto e gêneros além dos dois definidos
- Recomendações personalizadas a partir do histórico
- Importação de dados do TV Time
- Aplicativo móvel nativo
