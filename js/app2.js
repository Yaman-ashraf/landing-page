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
const navList = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 */

/**
 * @description Check if an element is in viewport
 * @param {Element} element - The element to check
 * @returns {boolean} - True if element is in viewport
 */
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

/**
 * @description Remove the active class from all sections
 */
const removeActiveClasses = () => {
    sections.forEach((section) => {
        section.classList.remove('your-active-class');
    });
};

/**
 * @description Add the active class to the section in viewport
 */
const addActiveClass = () => {
    sections.forEach((section) => {
        if (isInViewport(section)) {
            section.classList.add('your-active-class');
        }
    });
};

/**
 * @description Scroll to the target section smoothly
 * @param {Element} target - The target section to scroll to
 */
const scrollToSection = (target) => {
    window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
    });
};

/**
 * End Helper Functions
 * Begin Main Functions
 */

/**
 * @description Build the navigation menu
 */
const buildNav = () => {
    const fragment = document.createDocumentFragment();
    sections.forEach((section) => {
        const navItem = document.createElement('li');
        const navLink = document.createElement('a');
        navLink.textContent = section.dataset.nav;
        navLink.classList.add('menu__link');
        navLink.href = `#${section.id}`;
        navItem.appendChild(navLink);
        fragment.appendChild(navItem);
    });
    navList.appendChild(fragment);
};

/**
 * @description Handle scrolling to sections when navigation links are clicked
 */
const handleNavClick = () => {
    navList.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.nodeName === 'A') {
            const targetId = event.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            scrollToSection(targetSection);
        }
    });
};

/**
 * @description Set sections as active on scroll
 */
const makeActive = () => {
    sections.forEach((section) => {
        const box = section.getBoundingClientRect();
        if (box.top <= 150 && box.bottom >= 150) {
            section.classList.add('your-active-class');
            document.querySelector(`a[href="#${section.id}"]`).classList.add('active-link');
        } else {
            section.classList.remove('your-active-class');
            document.querySelector(`a[href="#${section.id}"]`).classList.remove('active-link');
        }
    });
};

/**
 * End Main Functions
 * Begin Events
 */

/**
 * @description Initialize the navigation and set up event listeners
 */
const init = () => {
    buildNav();
    handleNavClick();
    makeActive(); // Add active class to the section in the viewport on page load
};

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('scroll', makeActive);

/**
 * End Events
 */
