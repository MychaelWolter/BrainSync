class MenuNavBar {
    constructor(menu, navList, navLinks) {
        this.menu = document.querySelector(menu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.classActive = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.classActive);
        this.menu.classList.toggle(this.classActive);
        this.animateLinks();
    }

    addClickEvent() {
        this.menu.addEventListener("click", this.handleClick);
    }

    init() {
        if (this.menu) {
            this.addClickEvent();
        }
        return this;
    }
}

const menuNavBar = new MenuNavBar(".menu", ".navList", ".navList li");
menuNavBar.init();