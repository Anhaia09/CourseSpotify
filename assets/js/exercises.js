// Espera o carregamento completo do HTML antes de rodar o script.
document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById("quiz-container");
  const scoreElement = document.getElementById("final-score");

  // Objeto que armazena as respostas corretas e progresso do usuário.
  let correctAnswers = {};
  let userProgress = {};

  /**
   * Inicia o quiz:
   * - Busca as perguntas de um arquivo JSON.
   * - Prepara os dados do quiz (respostas corretas e progresso do usuário).
   * - Renderiza a interface do quiz.
   *
   * @async
   * @function startQuiz
   * @returns {Promise<void>} Nada é retornado diretamente, apenas atualiza a interface.
   */
  async function startQuiz() {
    try {
      const response = await fetch("../api/db.json");
      const questions = await response.json();
      prepareQuizData(questions);
      renderQuizUI(questions);
    } catch (error) {
      quizContainer.innerHTML = "<p>Erro ao carregar o quiz. Tente novamente.</p>";
      console.error("Falha ao buscar perguntas:", error);
    }
  }

  /**
   * Prepara os dados principais do quiz:
   * - Define as respostas corretas de cada questão.
   * - Inicializa (ou recupera) o progresso do usuário do LocalStorage.
   *
   * @function prepareQuizData
   * @param {Array<Object>} questions - Lista de questões com id, enunciado e resposta correta.
   */
  function prepareQuizData(questions) {
    const defaultProgress = {};
    questions.forEach(q => {
      correctAnswers[q.id] = q.answer;
      defaultProgress[q.id] = { attempts: 3, solved: false };
    });
    userProgress = JSON.parse(localStorage.getItem("exerciseProgress")) || defaultProgress;
  }

  /**
   * Renderiza toda a interface do quiz na tela:
   * - Cria formulários para cada questão.
   * - Associa os eventos de envio de resposta.
   *
   * @function renderQuizUI
   * @param {Array<Object>} questions - Lista de questões do quiz.
   */
  function renderQuizUI(questions) {
    let quizHTML = "";
    questions.forEach((q, index) => {
      quizHTML += `
        <form id="${q.id}" class="exercise-form">
          <fieldset>
            <legend>${index + 1}. ${q.question}</legend>
            <div class="options">${createOptionsHtml(q)}</div>
            <button type="submit">Responder</button>
            <div class="feedback"></div>
            <div class="attempts">Tentativas restantes: <span>3</span></div>
          </fieldset>
        </form>
      `;
    });
    quizContainer.innerHTML = quizHTML;

    quizContainer.querySelectorAll(".exercise-form").forEach(form => {
      form.addEventListener("submit", handleSubmission);
    });

    updateUI();
  }

  /**
   * Cria o HTML das opções de resposta (radio, checkbox ou select).
   *
   * @function createOptionsHtml
   * @param {Object} question - Questão atual com tipo e opções.
   * @param {string} question.type - Tipo de input: "radio", "checkbox" ou "select".
   * @param {string} question.id - Identificador único da questão.
   * @param {Array<string>} question.options - Opções de resposta.
   * @returns {string} HTML gerado para as opções.
   */
  function createOptionsHtml(question) {
    const { type, id, options } = question;
    if (type === "radio" || type === "checkbox") {
      return options.map(opt => `<label><input type="${type}" name="${id}" value="${opt}" /> ${opt}</label>`).join('');
    }
    if (type === "select") {
      const optionElements = options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
      return `<select name="${id}" class="combobox"><option value="">Selecione uma opção</option>${optionElements}</select>`;
    }
    return '';
  }

  /**
   * Trata o envio de uma resposta pelo usuário:
   * - Verifica se a resposta está correta.
   * - Atualiza tentativas e progresso.
   * - Dá feedback visual imediato.
   *
   * @function handleSubmission
   * @param {Event} event - Evento de envio do formulário.
   */
  function handleSubmission(event) {
    event.preventDefault();
    const form = event.target;
    const questionId = form.id;
    const state = userProgress[questionId];

    if (state.solved || state.attempts === 0) return;

    let isCorrect = false;
    const correctAnswer = correctAnswers[questionId];
    const inputType = form.querySelector('[name]').type;

    if (inputType === 'radio') {
      const selected = form.querySelector(`[name="${questionId}"]:checked`);
      if (selected) isCorrect = selected.value === correctAnswer;
    } else if (inputType === 'checkbox') {
      const selected = Array.from(form.querySelectorAll(`[name="${questionId}"]:checked`)).map(cb => cb.value);
      isCorrect = selected.length === correctAnswer.length && selected.every(val => correctAnswer.includes(val));
    } else if (inputType === 'select-one') {
      const selectedValue = form.querySelector(`select[name="${questionId}"]`).value;
      isCorrect = selectedValue === correctAnswer;
    }

    if (isCorrect) {
      state.solved = true;
    } else {
      state.attempts--;
      const feedbackEl = form.querySelector(".feedback");
      feedbackEl.textContent = "Incorreto. Tente novamente.";
      feedbackEl.className = "feedback incorrect";
    }

    localStorage.setItem("exerciseProgress", JSON.stringify(userProgress));
    updateUI();
  }

  /**
   * Atualiza a interface do quiz:
   * - Mostra tentativas restantes.
   * - Exibe mensagens de feedback (correto/incorreto).
   * - Desativa botões quando necessário.
   *
   * @function updateUI
   */
  function updateUI() {
    quizContainer.querySelectorAll(".exercise-form").forEach(form => {
      const questionId = form.id;
      const state = userProgress[questionId];
      const feedbackEl = form.querySelector(".feedback");
      const button = form.querySelector("button");

      form.querySelector(".attempts span").textContent = state.attempts;

      if (state.solved) {
        feedbackEl.textContent = "Correto!";
        feedbackEl.className = "feedback correct";
        button.disabled = true;
      } else if (state.attempts === 0) {
        const answerText = Array.isArray(correctAnswers[questionId]) ? correctAnswers[questionId].join(", ") : correctAnswers[questionId];
        feedbackEl.textContent = `A resposta correta é: ${answerText}.`;
        feedbackEl.className = "feedback incorrect";
        button.disabled = true;
      }
    });

    showFinalScoreIfNeeded();
  }

  /**
   * Mostra a pontuação final caso todas as questões tenham acabado:
   * - O quiz é considerado encerrado se todas foram resolvidas ou esgotaram tentativas.
   *
   * @function showFinalScoreIfNeeded
   */
  function showFinalScoreIfNeeded() {
    const allQuestionsFinished = Object.values(userProgress).every(state => state.solved || state.attempts === 0);

    if (allQuestionsFinished) {
      const totalQuestions = Object.keys(userProgress).length;
      const solvedCount = Object.values(userProgress).filter(state => state.solved).length;

      scoreElement.textContent = `Sua pontuação final: ${solvedCount} de ${totalQuestions} corretas.`;
      scoreElement.style.display = "block";
    }
  }

  // Chamada inicial para começar o quiz.
  startQuiz();
});
