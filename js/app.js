const AppState = {
    activeTab: 'home',
    tasks: [],
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
        },

    ]
};

// DOM Elements
const DOM = {
    navLinks: document.querySelectorAll('.nav-link'),
    pageSections: document.querySelectorAll('.page-section'),
    menuToggleBtn: document.getElementById('menu-toggle'),
    navMenu: document.getElementById('nav-menu'),
    taskInput: document.getElementById('task-input'),
    addTaskBtn: document.getElementById('add-task-btn'),
    taskListContainer: document.getElementById('task-list'),
    contactForm: document.getElementById('contact-form'),
}

// Render Functions
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


// ABOUT ME CARD INTERACTIVITY & TOGGLE
function toggleCard(cardElement) {
    // Toggle the expanded class
    const isExpanded = cardElement.classList.toggle('expanded');
    
    // Find the hint span inside the clicked card
    const hintSpan = cardElement.querySelector('.click-hint');
    
    if (hintSpan) {
        if (isExpanded) {
            hintSpan.innerHTML = 'Click to collapse <i class="bi bi-chevron-up"></i>';
        } else {
            hintSpan.innerHTML = 'Click to expand <i class="bi bi-chevron-down"></i>';
        }
    }
}

// Task Management Functions
function renderTasks() {
    if (!DOM.taskListContainer) return;

    if (AppState.tasks.length === 0) {
        DOM.taskListContainer.innerHTML = '<li class="empty-message">No tasks added yet.</li>';
        return;
    }

    // Render tasks with completed status
    DOM.taskListContainer.innerHTML = AppState.tasks.map(task => `<li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
        <span class="task-text">${task.text}</span>
        <div class="task-actions">
            <button class="toggle-btn" onclick="toggleTask(${task.id})">${task.  completed ? 'Undo' : 'Complete'}
            </button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </div>
        
    </li>`).join('');
}

// Event handlers
function bindEvents() {
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pageTarget = link.getAttribute('data-page');
            if (pageTarget) renderPage(pageTarget);
        });
    });

    if (DOM.menuToggleBtn && DOM.navMenu) {
        DOM.menuToggleBtn.addEventListener('click', (event) => {
            DOM.navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            if (!DOM.navMenu.contains(event.target) && !DOM.menuToggleBtn.contains(event.target)) {
                DOM.navMenu.classList.remove('active');
            }
        });
    }

    if (DOM.addTaskBtn && typeof addTask === 'function') {
        DOM.addTaskBtn.addEventListener('click', addTask);
    }
}


function initializeApp() {
    bindEvents();
    renderPage(AppState.activeTab);
    renderTasks();
}

initializeApp();