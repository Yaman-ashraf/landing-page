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
        navItem.innerHTML = `<a 
        href="#${section.id}" 
        class="menu__link">
        ${section.dataset.nav}
        </a>`;
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

// Create a section using template literals
const createSectionTemplateLiteral = (section4, sectionContent) => {
    const sectionHTML = `
        <section id="${section4}">
            <div class="landing__container">
                <h2>${sectionContent.title}</h2>
                <p>${sectionContent.content}</p>
            </div>
        </section>
    `;
    return sectionHTML;
};

// Add a new section to the page
const addSection = (section4, sectionContent) => {
    const sectionHTML = createSectionTemplateLiteral(section4, sectionContent);
    document.getElementById('main__container').insertAdjacentHTML('beforeend', sectionHTML);

    const newNavItem = document.createElement('li');
    newNavItem.innerHTML = `<a 
    href="#${section4}" 
    class="menu__link">
    ${sectionContent.title}
    </a>`;
    navbarList.appendChild(newNavItem);

    // Refresh sections and navigation links
    sections = document.querySelectorAll('section');
};
////////////////////////////////////////////

/**
 * Events
 */

// Build menu, create scroll to top button, and make sections collapsible on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    createScrollToTopButton();
    makeSectionsCollapsible();

    // Add Section 4
    addSection('section4', {
        title: 'Section 4',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.
Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.`
    });
});

// Scroll to section on link click
navbarList.addEventListener('click', scrollToSection);

// Set sections as active and toggle scroll to top button on scroll
document.addEventListener('scroll', () => {
    setActiveSection();
    toggleScrollToTopButton();
    showNavbar();
});

// Scroll to top on button click
scrollToTopBtn.addEventListener('click', scrollToTop);