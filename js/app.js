const AppState = {
    activeTab: 'home',
    tasks: [],
    projects: [
        {
            title: 'Project 1',
            description: 'Description for Project 1',
            imageURL: 'https://example.com/project1.jpg',
            link: 'https://example.com/project1'
        }
    ]
};

// DOM Elements
const DOM = {
    navLinks: document.querySelectorAll('.nav-link'),
    pageSections: document.querySelectorAll('.page-section'),
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

// event Handlers
function bindEvents() {
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const pageTarget = event.target.getAttribute('data-page');
            if (pageTarget) renderPage(pageTarget);
        });
    });

    if (DOM.addTaskBtn) {
        DOM.addTaskBtn.addEventListener('click', addTask);
    }

    if (DOM.contactForm) {
        DOM.contactForm.addEventListener('submit', validateAndSubmitForm);
    }
}

// Initialize App
function initializeApp() {
    bindEvents();
    renderPage(AppState.activeTab);
    renderTasks();
}

initializeApp();