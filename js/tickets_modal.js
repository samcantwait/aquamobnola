export const tickets_modal = () => {
    const modal = document.querySelector('.tickets');
    const openModal = document.querySelector('.tickets-link');
    const btnMore = document.querySelector('.btn-more');
    const closeBtn = document.querySelector('.tickets__close');
    const forms = document.querySelectorAll('form');


    openModal.addEventListener('click', e => {
        e.preventDefault();
        modal.style.left = '0';
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
