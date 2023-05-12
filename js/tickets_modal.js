export const tickets_modal = () => {
    const body = document.querySelector('body');
    const html =
        `<section id="tickets" class="tickets mb-large">
        <div class="tickets__overlay">
            <span class="tickets__close">&#10006;</span>
            <img src="/images/ripley/brian-boudreaux/brian-boudreaux-9-600.webp" alt="Synchronized swimmers" class="tickets__image">
            <div class="tickets__text">
                <h2 class="heading-secondary center-text tickets__heading">Looking for tickets?</h2>
                <p class="tickets__info">Dates have not yet been chosen. <span class="tickets__span">Be the
                        first to
                        know when they are by signing up for our mailing list.</span> </p>
                <form class="tickets__form index__form" method="POST" action="/subscribe">
                    <input type="email" name="email" class="tickets__input" placeholder="Email address" required>
                    <button class="tickets__button submit--btn" type="submit">Submit here</button>
                </form>
            </div>
        </div>
    </section>`

    body.insertAdjacentHTML('beforeend', html);

    const modal = document.querySelector('.tickets');
    const openModal = document.querySelectorAll('.tickets-link');
    const forms = document.querySelectorAll('.index__form');

    openModal.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            console.log('clicked');
            modal.style.left = '0';
        })
    })

    modal.addEventListener('click', e => {
        if (e.target.classList.contains('tickets') || e.target.classList.contains('tickets__close')) {
            modal.style.left = '-100vw';
        }
    })


    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (form.classList.contains('is-submitting')) {
                e.preventDefault();
            }
            form.classList.add('is-submitting');
            form.querySelector('.submit--btn').innerText = 'Submitting...';
        });
    });
}
