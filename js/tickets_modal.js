const modal = document.querySelector('.tickets');
const openModal = document.querySelector('.tickets-link');
const closeBtn = document.querySelector('.tickets__close');

openModal.addEventListener('click', e => {
    e.preventDefault();
    modal.style.left = '0';
})

modal.addEventListener('click', e => {
    console.log(e.target)
    if (e.target.classList.contains('tickets') || e.target.classList.contains('tickets__close')) {
        modal.style.left = '-100vw';
    }
})