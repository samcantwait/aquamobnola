const body = document.querySelector('body');
const navigation = document.querySelector('.navigation__container');
const button = document.querySelector('.navigation__button');


button.addEventListener('click', e => {
    body.classList.toggle('toggled');
    navigation.classList.toggle('navigation__toggled');
})