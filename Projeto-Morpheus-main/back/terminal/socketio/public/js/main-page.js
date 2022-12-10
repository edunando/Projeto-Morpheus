const hamburguer = document.querySelector(".hamburguer");
const navMenu = document.querySelector(".nav-menu");

hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle("active")
    navMenu.classList.toggle("active");
})

function openTerminal() {
    window.location.href = './terminal.html';
}