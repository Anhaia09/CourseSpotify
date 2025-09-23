# 🎵 Como Criar uma Playlist Temática no Spotify  
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Este projeto foi desenvolvido como parte de um desafio para criar uma **aplicação web educacional** no formato de curso autoinstrucional.  
A proposta é ensinar jovens de 16 a 24 anos a montar suas próprias **playlists temáticas no Spotify**, de forma direta, envolvente e com uma navegação leve e intuitiva.  

A aplicação conta com páginas informativas, exercícios interativos e feedback em tempo real, tudo isso dentro de um design minimalista, responsivo e acessível.  

---

## 🚀 Tecnologias Utilizadas  

- **HTML5 Semântico** → Estrutura limpa e acessível.  
- **CSS3 + Responsividade** → Layout fluido para desktop, tablet e mobile.  
- **JavaScript (DOM)** → Interatividade dos exercícios, manipulação de tentativas e feedback.  
- **API Local (JSON)** → Criada dentro do projeto e consumida via `fetch` para dinamizar os exercícios.  
- **Git + GitHub** → Versionamento e repositório público.  
- **Hospedagem** → Publicado em `Netlify` 

---

## 🎨 Design e Experiência do Usuário  

- **Paleta de cores oficial do desafio**:  
  - Azul Marinho `#1E3A8A`  
  - Verde Esmeralda `#34D399`  
  - Cinza Claro `#D1D5DB`  

- **Estilo visual**: minimalista, limpo e com contraste bem definido para guiar o olhar.  
- **Extras de UX**: modo claro/escuro, pensado para dar mais autonomia ao usuário.  
- **Foco na legibilidade**: fontes, espaçamentos e hierarquia visual bem definidos para facilitar o aprendizado.  

---

## 🚀 Processo Criativo

O desenvolvimento deste projeto foi guiado pela necessidade de criar uma ferramenta educacional que fosse ao mesmo tempo informativa e cativante para um público jovem.

### Jornada do Usuário

A estrutura de múltiplas páginas foi pensada para criar uma narrativa fluida e segmentada:

1.  **Página Inicial (`index.html`):**
    -   **Objetivo:** Capturar o interesse do usuário imediatamente.
    -   **Execução:** Uma *hero section* com um título claro, uma descrição concisa e um *call-to-action* ("Começar agora!") bem destacado.

2.  **Página do Curso (`course.html`):**
    -   **Objetivo:** Entregar o conteúdo de forma didática e fácil de consumir.
    -   **Execução:** O conteúdo foi dividido em passos lógicos e curtos (`<article>`), com títulos claros e parágrafos diretos. A linguagem é informal e próxima do público-alvo, evitando jargões técnicos.

3.  **Página de Exercícios (`exercises.html`):**
    -   **Objetivo:** Reforçar o aprendizado de conceitos de front-end de forma interativa e com feedback imediato.
    -   **Execução:** Três tipos diferentes de exercícios mantêm o usuário engajado. A lógica de tentativas, o feedback instantâneo e a persistência de dados (`localStorage`) transformam um simples teste em uma experiência gamificada, onde o progresso não é perdido.

---

## ⚙️ Decisões Técnicas  

A escolha das tecnologias visou demonstrar proficiência nos fundamentos do desenvolvimento web, sem a necessidade de abstrações complexas.

-   **HTML5 Semântico:** Em vez de usar `divs` genéricas, a estrutura foi construída com tags como `<main>`, `<section>`, `<nav>`, `<article>` e `<header>`. Isso não apenas melhora a acessibilidade e o SEO, mas também torna o código mais legível e fácil de manter.

-   **CSS3:** Optei por não usar frameworks como Bootstrap ou Tailwind para demonstrar um domínio puro de CSS.
    -   **Variáveis CSS (`:root`):** Essenciais para a implementação do tema dinâmico. Ao invés de reescrever dezenas de linhas de código, apenas os valores das variáveis de cor são trocados, tornando o tema claro/escuro extremamente eficiente.
    -   **Flexbox:** Utilizado para criar layouts responsivos de forma simples e poderosa, especialmente na organização do cabeçalho e alinhamento dos cards.

-   **JavaScript:** A decisão de não usar React ou outro framework foi intencional.  
O objetivo era mostrar a capacidade de manipular o **DOM diretamente**, controlar eventos e gerenciar o estado da aplicação usando apenas os recursos nativos do navegador.  

    - **Manipulação do DOM:** Todo o sistema de exercícios, feedback e atualizações visuais é controlado por meio de `document.querySelector`, `addEventListener` e manipulação de atributos e classes.  

    - **localStorage:** Escolhido para a persistência de dados pela sua simplicidade e adequação ao escopo do projeto. É a ferramenta perfeita para salvar o estado do lado do cliente (progresso dos exercícios e tema) sem depender de um backend.  

    - **API Local (JSON):** Em vez de depender de uma API externa, criei uma pasta `/api` dentro do projeto contendo um arquivo JSON. Esse arquivo funciona como uma pequena API simulada, e os dados são consumidos com `fetch`.  
      Essa escolha trouxe dois benefícios principais:  
      1. **Autonomia:** todos os dados estão no próprio projeto, sem depender de serviços externos.  
      2. **Prática realista:** a estrutura imita o consumo de uma API real, mas de forma simples e controlada.  


---

## 🤖 Uso de Inteligência Artificial  

Utilizei IA como **apoio estratégico**, não como solução completa. Os usos foram:  
- **Estruturação de pastas** → pedi sugestões para organizar o projeto de forma escalável.  
- **Refatoração do JavaScript** → adaptei os exercícios para consumir dados do arquivo JSON da pasta `/api` via `fetch`.  

**Tipo de prompt usado**: pedidos objetivos como *"me ajude a organizar as pastas do projeto HTML, CSS e JS com boas práticas"* e *"como refatorar este código para consumir dados de um JSON local via fetch"*. 

**Justificativa**: economizar tempo em ajustes repetitivos e garantir boas práticas de organização, mantendo o foco no conteúdo criativo e na experiência do usuário.  

---

## 💪 Desafios  

Não enfrentei grandes dificuldades técnicas.  
HTML, CSS e JavaScript são tecnologias que já domino, então o maior desafio foi **pensar na experiência do usuário** e garantir que o resultado final fosse realmente **fluido, interativo e agradável** para jovens entre 16 e 24 anos.  

---

## 🌐 Links  

- **Repositório GitHub**: https://github.com/Anhaia09/CourseSpotify 
- **Aplicação Publicada**: https://coursespotify.netlify.app/
  
