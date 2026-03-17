'use strict';

/**
 * Element toggle function
 */
const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }

/**
 * Header sticky & Go to top
 */
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

/**
 * Navbar toggle
 */
const navTBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const navLinks = document.querySelectorAll(".navbar-link");

navTBtn.addEventListener("click", function () {
  elemToggleFunc(navTBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navTBtn.classList.remove("active");
    navbar.classList.remove("active");
    document.body.classList.remove("active");
  });
});

/**
 * Skills toggle
 */
const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

if (toggleBtns.length > 0) {
  for (let i = 0; i < toggleBtns.length; i++) {
    toggleBtns[i].addEventListener("click", function () {
      elemToggleFunc(toggleBtnBox);
      toggleBtns.forEach(btn => btn.classList.toggle("active"));
      elemToggleFunc(skillsBox);
    });
  }
}

/**
 * Scroll Reveal Animation
 */
const revealElements = document.querySelectorAll(".reveal");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const isElementOnScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.1;

    if (isElementOnScreen) {
      revealElements[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", scrollReveal);
window.addEventListener("load", scrollReveal);