let flagMenu = false;

document.querySelector('.menu-hamburguer').addEventListener('click', (event) => {
    document.querySelector('.menu-mobile').style.top = flagMenu == false ? '7%' : '-20%';
    flagMenu = !flagMenu;
});