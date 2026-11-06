const AppState = {
    activeTab: 'home',
    projects: [
        {
            title: 'G-Store',
            description: 'An e-commerce web application built with HTML, CSS, and JavaScript. It features a responsive design, product listings, and a shopping cart functionality.',
            imageURL: 'assets/images/g_store.png',
            link: 'https://g-store-six.vercel.app/'
        },
        {
            title: 'Lovelies',
            description: 'A wedding website template designed for couples to showcase their love story, wedding details, and RSVP functionality. Built with HTML and CSS',
            imageURL: 'assets/images/lovelies.png',
            link: 'https://lovelies.vercel.app/index.html#'
        },
        {
            title: 'School Website',
            description: 'A multipage school website template designed to provide information about the school, its programs, and events. Built with HTML, CSS, and JavaScript.',
            imageURL: 'assets/images/multipage_school_website.png',
            link: 'https://multi-page-school-website.vercel.app/'
        }
    ]
};

// DOM Elements
const DOM = {
    navLinks: document.querySelectorAll('.nav-link'),
    pageSections: document.querySelectorAll('.page-section'),
    menuToggleBtn: document.getElementById('menu-toggle'),
    navMenu: document.getElementById('nav-menu')
};

// Render Page (SPA View Switcher)
function renderPage(pageId) {
    AppState.activeTab = pageId;

    DOM.pageSections.forEach(section => {
        section.classList.toggle('hidden', section.id !== pageId);
    });

    DOM.navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-page') === pageId);
    });

    if (DOM.navMenu) {
        DOM.navMenu.classList.remove('active');
    }
}

// Theme Initialization & Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('site_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeButtonUI(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeButtonUI(false);
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn && !themeToggleBtn.dataset.initialized) {
        themeToggleBtn.dataset.initialized = "true";
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('site_theme', isDark ? 'dark' : 'light');
            updateThemeButtonUI(isDark);
        });
    }
}

function updateThemeButtonUI(isDark) {
    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');
    if (icon) icon.textContent = isDark ? 'light_mode' : 'dark_mode';
    if (text) text.textContent = isDark ? 'Light' : 'Dark';
}



// Mobile Menu Toggle Initialization (Unified & Bulletproof)
function initMobileMenu() {
    if (DOM.menuToggleBtn && DOM.navMenu) {
        if (!DOM.menuToggleBtn.dataset.menuInitialized) {
            DOM.menuToggleBtn.dataset.menuInitialized = "true";
            
            DOM.menuToggleBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                DOM.navMenu.classList.toggle('active');
            });

            document.addEventListener('click', (event) => {
                if (!DOM.navMenu.contains(event.target) && !DOM.menuToggleBtn.contains(event.target)) {
                    DOM.navMenu.classList.remove('active');
                }
            });
        }
    }
}

// About Me Card Interactivity & Toggle
function toggleCard(cardElement) {
    const isExpanded = cardElement.classList.toggle('expanded');
    const hintSpan = cardElement.querySelector('.click-hint');
    
    if (hintSpan) {
        hintSpan.innerHTML = isExpanded 
            ? 'Click to collapse <i class="bi bi-chevron-up"></i>' 
            : 'Click to expand <i class="bi bi-chevron-down"></i>';
    }
}

// Event Handlers for Navigation
function bindEvents() {
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            
            // Allow normal browser navigation for separate HTML pages
            if (href && href.includes('.html')) {
                return; 
            }

            event.preventDefault();
            const pageTarget = link.getAttribute('data-page');
            if (pageTarget) renderPage(pageTarget);
        });
    });
}

function initializeApp() {
    initMobileMenu();
    bindEvents();

    // Check URL hash, render that section, and clean up the URL bar
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        AppState.activeTab = hash;
        history.replaceState(null, document.title, window.location.pathname);
    }

    
    document.addEventListener('DOMContentLoaded', initTheme);

    renderPage(AppState.activeTab);
}

document.addEventListener('DOMContentLoaded', initializeApp);