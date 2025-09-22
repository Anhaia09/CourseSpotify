document.addEventListener("DOMContentLoaded", () => {
  // Lista de respostas corretas para cada questão
  const correctAnswers = {
    q1: "main",
    q2: ["var", "let", "const"],
    q3: "color",
  };

  // Estrutura inicial do progresso (tentativas e status de cada questão)
  const defaultProgress = {
    q1: { attempts: 3, solved: false },
    q2: { attempts: 3, solved: false },
    q3: { attempts: 3, solved: false },
  };

  // Carrega progresso do localStorage, ou usa o padrão se não houver
  let progress =
    JSON.parse(localStorage.getItem("exerciseProgress")) || defaultProgress;

  const forms = document.querySelectorAll(".exercise-form");
  const scoreElement = document.getElementById("final-score");

  /**
   * Salva o progresso atual do usuário no localStorage.
   * Garante que os dados persistam mesmo após atualizar ou fechar a página.
   */
  function saveProgress() {
    localStorage.setItem("exerciseProgress", JSON.stringify(progress));
  }

  /**
   * Atualiza a interface com base no estado atual de cada questão.
   * - Mostra tentativas restantes
   * - Desativa botões quando necessário
   * - Exibe feedback (correto/incorreto)
   */
  function renderUI() {
    forms.forEach((form) => {
      const questionId = form.id;
      const state = progress[questionId];

      // Atualiza visualmente o contador de tentativas
      form.querySelector(".attempts span").textContent = state.attempts;

      const button = form.querySelector("button");
      const feedbackEl = form.querySelector(".feedback");

      // Se já resolveu a questão
      if (state.solved) {
        button.disabled = true;
        feedbackEl.textContent = "Correto!";
        feedbackEl.className = "feedback correct";
      }
      // Se acabou as tentativas
      else if (state.attempts === 0) {
        button.disabled = true;
        const correctAnswer = Array.isArray(correctAnswers[questionId])
          ? correctAnswers[questionId].join(", ")
          : correctAnswers[questionId];
        feedbackEl.textContent = `Suas tentativas acabaram. A resposta correta é: ${correctAnswer}.`;
        feedbackEl.className = "feedback incorrect";
      }
    });
    updateFinalScore();
  }

  /**
   * Lida com o envio de cada formulário (questão respondida).
   * - Valida a resposta do usuário
   * - Atualiza tentativas
   * - Exibe feedback imediato
   * - Salva progresso atualizado
   * @param {Event} event - O evento de submit do formulário
   */
  function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const questionId = form.id;
    const state = progress[questionId];

    // Se não há tentativas ou a questão já foi resolvida, não faz nada
    if (state.attempts === 0 || state.solved) return;

    // Verifica a resposta do usuário
    let isCorrect = false;
    if (questionId === "q1") {
      const selectedRadio = form.querySelector(`[name="q1"]:checked`);
      if (selectedRadio) {
        isCorrect = selectedRadio.value === correctAnswers.q1;
      }
    } else if (questionId === "q2") {
      const userAnswers = Array.from(
        form.querySelectorAll(`[name="q2"]:checked`)
      ).map((cb) => cb.value);

      const correct = correctAnswers.q2;
      // Checa se o usuário marcou exatamente todas as opções corretas
      isCorrect =
        userAnswers.length === correct.length &&
        userAnswers.every((answer) => correct.includes(answer));
    } else if (questionId === "q3") {
      const selectedValue = form.querySelector(`[name="q3"]`).value;
      isCorrect = selectedValue === correctAnswers.q3;
    }

    const feedbackEl = form.querySelector(".feedback");
    const button = form.querySelector("button");

    if (isCorrect) {
      state.solved = true;
      feedbackEl.textContent = "Correto!";
      feedbackEl.className = "feedback correct";
      button.disabled = true;
    } else {
      state.attempts--;
      if (state.attempts > 0) {
        feedbackEl.textContent = "Incorreto. Tente novamente.";
        feedbackEl.className = "feedback incorrect";
      } else {
        // Se esgotou todas as tentativas
        const correctAnswer = Array.isArray(correctAnswers[questionId])
          ? correctAnswers[questionId].join(", ")
          : correctAnswers[questionId];
        feedbackEl.textContent = `Suas tentativas acabaram. A resposta correta é: ${correctAnswer}.`;
        feedbackEl.className = "feedback incorrect";
        button.disabled = true;
      }
    }

    // Atualiza contador visual, salva progresso e pontuação
    form.querySelector(".attempts span").textContent = state.attempts;
    saveProgress();
    updateFinalScore();
  }

  /**
   * Calcula a pontuação final e exibe ao usuário.
   * - Conta quantas questões foram resolvidas
   * - Só mostra quando todas foram tentadas ou resolvidas
   */
  function updateFinalScore() {
    const totalQuestions = Object.keys(progress).length;
    const solvedQuestions = Object.values(progress).filter(
      (q) => q.solved
    ).length;

    const allAttempted = Object.values(progress).every(
      (q) => q.solved || q.attempts === 0
    );

    if (allAttempted) {
      scoreElement.textContent = `Sua pontuação final: ${solvedQuestions} de ${totalQuestions} corretas.`;
      scoreElement.style.display = "block";
    }
  }

  // Adiciona o listener de envio a cada formulário
  forms.forEach((form) => {
    form.addEventListener("submit", handleFormSubmit);
  });

  // Renderiza o estado inicial ao carregar a página
  renderUI();
});
