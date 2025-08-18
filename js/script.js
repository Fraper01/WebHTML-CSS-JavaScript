
// Este script espera a que el contenido del DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', () => {

    // ===========================================
    // FUNCIONES GLOBALES
    // ===========================================

    /**
     * Voltea de nuevo todas las tarjetas excepto la actual.
     * Esto asegura que solo una tarjeta esté volteada a la vez.
     * Se aplica a las tarjetas con la clase '.flip-card'.
     * @param {HTMLElement} currentCard - La tarjeta que debe permanecer volteada.
     */
    function unflipAllOtherCards(currentCard) {
        const flippedCards = document.querySelectorAll('.flip-card.flipped');
        flippedCards.forEach(flippedCard => {
            if (flippedCard !== currentCard) {
                flippedCard.classList.remove('flipped');
            }
        });
    }

    // ===========================================
    // LÓGICA DE LAS TARJETAS FLIP (CLIC)
    // ===========================================

    // Selecciona todas las tarjetas con la clase 'flip-card'.
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        // Añade el evento de clic a toda la tarjeta.
        card.addEventListener('click', (event) => {
            // Evita que el clic en enlaces y botones voltee la tarjeta.
            if (event.target.closest('a') || event.target.closest('.flip-btn')) {
                return;
            }

            // Antes de voltear la tarjeta actual, voltea las demás.
            unflipAllOtherCards(card);

            // Voltea la tarjeta actual.
            card.classList.toggle('flipped');
        });
    });

    // Lógica para el botón "Contenido".
    const flipButtons = document.querySelectorAll('.flip-btn');
    flipButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const card = button.closest('.flip-card');

            if (card) {
                unflipAllOtherCards(card);
                card.classList.toggle('flipped');
            }
        });
    });

    // Lógica para los enlaces dentro de la tarjeta.
    const flipLinks = document.querySelectorAll('.flip-card-front a');
    flipLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.stopPropagation();
            const card = link.closest('.flip-card');

            if (card) {
                unflipAllOtherCards(card);
            }
        });
    });

    // ===========================================
    // LÓGICA DE LA ANIMACIÓN DE RUEDA (HOVER)
    // ===========================================

    // Selecciona las tarjetas con la clase 'service-card' para la animación de hover.
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const innerCard = card.querySelector('.card-inner');

        card.addEventListener('mouseenter', () => {
            // Escucha el final de la animación CSS de "rueda".
            innerCard.addEventListener('animationend', (event) => {
                // Comprobamos que la animación sea la que esperamos.
                if (event.animationName === 'wheel-spin-z') {
                    // Si la animación terminó, aplicamos la clase para el volteo final.
                    innerCard.classList.add('is-flipped');
                }
            }, { once: true });
        });

        card.addEventListener('mouseleave', () => {
            // Quitamos la clase de volteo cuando el mouse sale de la tarjeta.
            innerCard.classList.remove('is-flipped');
            
            // Reestablecemos la animación para que se reinicie en el próximo 'mouseenter'.
            innerCard.style.animation = 'none';
            innerCard.offsetHeight; 
            innerCard.style.animation = '';
        });
    });

    // ===========================================
    // LÓGICA PARA MODALES DE IMAGEN
    // ===========================================

    const imagenModal = document.getElementById('imagenModal');
    if (imagenModal) {
        imagenModal.addEventListener('show.bs.modal', function (event) {
            const imgElement = event.relatedTarget;
            const imgSrc = imgElement.getAttribute('data-bs-image-src');
            const modalImage = document.getElementById('imagenModalBody');
            modalImage.src = imgSrc;
            modalImage.alt = imgElement.alt;
        });
    }

    const comunicacionModal = document.getElementById('comunicacionModal');
    if (comunicacionModal) {
        comunicacionModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget;
            const imageUrl = button.getAttribute('data-bs-image-src');
            const modalImage = comunicacionModal.querySelector('#modalImage');
            modalImage.src = imageUrl;
        });
    }

});
