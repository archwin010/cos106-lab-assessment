// ==========================================
// ACADEMIC PLANNER MODULE (planner.js)
// ==========================================

window.AppState = window.AppState || { tasks: [] };

// Load saved tasks from localStorage
function loadStateFromStorage() {
    const saved = localStorage.getItem('academic_planner_state');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed && Array.isArray(parsed.tasks)) {
                window.AppState.tasks = parsed.tasks;
            }
        } catch (e) {
            console.error("Failed to load planner state from storage", e);
        }
    }
}

window.saveStateToStorage = function() {
    localStorage.setItem('academic_planner_state', JSON.stringify(window.AppState));
};

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

// Unified Mobile Menu Toggle Initialization
function initMobileMenu() {
    const menuToggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggleBtn && navMenu && !menuToggleBtn.dataset.menuInitialized) {
        menuToggleBtn.dataset.menuInitialized = "true";
        
        menuToggleBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !menuToggleBtn.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Toast Notification Handler
function showToast(message = "Action completed successfully") {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

window.addTask = function() {
    const inputField = document.getElementById('task-input');
    if (!inputField) return;
    
    const taskText = inputField.value.trim();
    if (!taskText) return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        description: '',
        dueDate: '',
        completed: false
    };

    window.AppState.tasks.push(newTask);
    inputField.value = '';

    window.saveStateToStorage();
    window.renderTasks();
    showToast("Task added successfully");
};

window.renderTasks = function() {
    const tasksContainer = document.getElementById('task-list-container');
    if (!tasksContainer) return;

    if (!window.AppState.tasks.length) {
        tasksContainer.innerHTML = '<p class="empty-tasks">No tasks added yet.</p>';
        return;
    }

    tasksContainer.innerHTML = window.AppState.tasks.map((task) => `
        <div class="task-card ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-info">
                <div class="task-title-row">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})" title="Mark as done">
                    <h4 class="${task.completed ? 'strike-through' : ''}">${task.text || 'Untitled Task'}</h4>
                </div>
                <p>${task.description || ''}</p>
                <span class="task-date">Due: ${task.dueDate || 'No date'}</span>
            </div>
            <div class="task-actions">
                <button type="button" class="btn-edit" onclick="openEditTaskModal(${task.id})">
                    <span class="material-symbols-outlined">edit</span> Edit
                </button>
                <button type="button" class="btn-delete" onclick="deleteTask(${task.id})">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    `).join('');
};

window.openEditTaskModal = function(taskId) {
    const taskIndex = window.AppState.tasks.findIndex(t => t.id === taskId);
    const task = window.AppState.tasks[taskIndex];
    if (!task) return;

    document.getElementById('edit-task-index').value = taskIndex;
    document.getElementById('edit-task-title').value = task.text || '';
    document.getElementById('edit-task-desc').value = task.description || '';
    document.getElementById('edit-task-date').value = task.dueDate || '';

    const modal = document.getElementById('edit-task-modal');
    if (modal) modal.style.display = 'flex';
};

window.closeEditModal = function() {
    const modal = document.getElementById('edit-task-modal');
    if (modal) modal.style.display = 'none';
};

window.handleSaveEditedTask = function(event) {
    event.preventDefault();

    const index = document.getElementById('edit-task-index').value;
    const newText = document.getElementById('edit-task-title').value;
    const description = document.getElementById('edit-task-desc').value;
    const dueDate = document.getElementById('edit-task-date').value;

    if (window.AppState.tasks[index]) {
        window.AppState.tasks[index].text = newText;
        window.AppState.tasks[index].description = description;
        window.AppState.tasks[index].dueDate = dueDate;

        window.saveStateToStorage();
        window.renderTasks();
        showToast("Task edited successfully");
    }

    window.closeEditModal();
};

window.toggleTask = function(taskId) {
    const task = window.AppState.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        window.saveStateToStorage();
        window.renderTasks();
    }
};

window.deleteTask = function(taskId) {
    window.AppState.tasks = window.AppState.tasks.filter(t => t.id !== taskId);
    window.saveStateToStorage();
    window.renderTasks();
    showToast("Task deleted successfully");
};

// Initialization
function initPlanner() {
    loadStateFromStorage();
    initMobileMenu();
    initTheme();
    window.renderTasks();

    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const editModal = document.getElementById('edit-task-modal');

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.addTask();
        });
    }

    if (taskInput) {
        taskInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                window.addTask();
            }
        });
    }

    // Close edit modal when clicking outside the modal content box
    if (editModal) {
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) {
                window.closeEditModal();
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlanner);
} else {
    initPlanner();
}