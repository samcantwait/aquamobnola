const body = document.querySelector('body');
const navigation = document.querySelector('.navigation__container');
const button = document.querySelector('.navigation__button');
const list = document.querySelector('.navigation__list');


function toggle() {
    body.classList.toggle('toggled');
    navigation.classList.toggle('navigation__toggled');
}

button.addEventListener('click', toggle);
list.addEventListener('click', toggle);