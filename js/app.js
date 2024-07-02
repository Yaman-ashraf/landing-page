/**
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 */

/**
 * Define Global Variables
 */
const sections = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');
const scrollToTopBtn = document.createElement('button');
let isScrolling;

/**
 * Helper Functions
 */
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top <= 150 && rect.bottom >= 150;
};

/**
 * Main Functions
 */

// Build the navigation menu
const buildNav = () => {
    const fragment = document.createDocumentFragment();
    sections.forEach(section => {
        const navItem = document.createElement('li');
        navItem.innerHTML = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;
        fragment.appendChild(navItem);
    });
    navbarList.appendChild(fragment);
};

// Add 'active' class to section and nav item when near top of viewport
const setActiveSection = () => {
    sections.forEach(section => {
        const navLink = document.querySelector(`a[href="#${section.id}"]`);
        if (isInViewport(section)) {
            section.classList.add('your-active-class');
            navLink.classList.add('active-link');
        } else {
            section.classList.remove('your-active-class');
            navLink.classList.remove('active-link');
        }
    });
};

// Scroll to anchor ID using scrollIntoView
const scrollToSection = (event) => {
    event.preventDefault();
    if (event.target.nodeName === 'A') {
        const targetSection = document.querySelector(event.target.getAttribute('href'));
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
};

// Hide navbar while not scrolling
const hideNavbar = () => {
    document.querySelector('.page__header').style.display = 'none';
};

const showNavbar = () => {
    document.querySelector('.page__header').style.display = 'block';
    if (isScrolling) clearTimeout(isScrolling);
    isScrolling = setTimeout(hideNavbar, 2000);
};

// Scroll to top button
const createScrollToTopButton = () => {
    scrollToTopBtn.textContent = 'Top';
    scrollToTopBtn.id = 'scrollToTop';
    scrollToTopBtn.style.display = 'none';
    document.body.appendChild(scrollToTopBtn);
};

const toggleScrollToTopButton = () => {
    if (window.scrollY > window.innerHeight) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Make sections collapsible
const makeSectionsCollapsible = () => {
    sections.forEach(section => {
        const header = section.querySelector('h2');
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
    });
};

/**
 * Events
 */

// Build menu
document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    createScrollToTopButton();
    makeSectionsCollapsible();
});

// Scroll to section on link click
navbarList.addEventListener('click', scrollToSection);

// Set sections as active
document.addEventListener('scroll', () => {
    setActiveSection();
    toggleScrollToTopButton();
    showNavbar();
});

// Scroll to top on button click
scrollToTopBtn.addEventListener('click', scrollToTop);
