const links = {
    navLinks: document.querySelector("#header__nav"),
    menuOpenLinks: document.querySelector("#header__menu__open"),
    menuCloseLinks: document.querySelector("#header__menu__close"),
    bodyLinks: document.querySelector("body"),
};

links.menuOpenLinks.addEventListener("click", openMenu);
links.menuCloseLinks.addEventListener("click", closeMenu);

function openMenu() {
    links.navLinks.classList.add("open");
    links.menuCloseLinks.classList.add("open");
    links.bodyLinks.classList.add("open");
    links.menuOpenLinks.classList.add("open");

    links.navLinks.classList.remove("hide");
}

function closeMenu() {
    links.navLinks.classList.remove("open");
    links.menuCloseLinks.classList.remove("open");
    links.bodyLinks.classList.remove("open");
    links.menuOpenLinks.classList.remove("open");

    links.navLinks.classList.add("hide");
}
