document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.getElementById('hamburger-button');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburgerButton && navMenu) {
        hamburgerButton.addEventListener('click', () => {
            // Alterna a classe 'is-active' no menu e no botão
            navMenu.classList.toggle('is-active');
            hamburgerButton.classList.toggle('is-active');

            // Atualiza o aria-label para acessibilidade
            if (hamburgerButton.classList.contains('is-active')) {
                hamburgerButton.setAttribute('aria-label', 'Fechar menu');
            } else {
                hamburgerButton.setAttribute('aria-label', 'Abrir menu');
            }
        });
    }
});