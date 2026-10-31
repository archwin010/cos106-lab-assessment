// ==========================================
// ACADEMIC PLANNER MODULE (planner.js)
// ==========================================

window.addTask = function() {
    console.log("1. addTask function triggered!");

    // Look for the input by ID, or fallback to any text input in the planner section
    const inputField = document.getElementById('task-input') || document.querySelector('.planner-wrapper input[type="text"]') || document.querySelector('input[type="text"]');
    console.log("2. Target input field found:", inputField);

    if (!inputField) {
        console.error("ERROR: Could not find any text input element on the page!");
        return;
    }
    
    const taskText = inputField.value.trim();
    console.log("3. Captured input text:", JSON.stringify(taskText));

    if (taskText === '') {
        console.warn("WARNING: Task text is empty. Aborting add.");
        return;
    }

    // Ensure AppState exists globally
    if (typeof AppState === 'undefined') {
        console.error("ERROR: AppState is not defined! Initializing fallback.");
        window.AppState = { tasks: [] };
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        description: '',
        dueDate: '',
        completed: false
    };

    AppState.tasks.push(newTask);
    console.log("4. Task added to AppState.tasks:", AppState.tasks);

    inputField.value = '';

    if (typeof saveStateToStorage === 'function') {
        saveStateToStorage();
    } else {
        console.warn("NOTICE: saveStateToStorage function not found.");
    }

    if (typeof window.renderTasks === 'function') {
        window.renderTasks();
    } else {
        console.error("ERROR: renderTasks function is not defined!");
    }
};

window.renderTasks = function() {
    const tasksContainer = document.getElementById('task-list-container') || document.querySelector('.task-list-container') || document.querySelector('ul.task-list');
    
    if (!tasksContainer) return;

    if (!AppState.tasks || AppState.tasks.length === 0) {
        tasksContainer.innerHTML = '<p class="empty-tasks">No tasks added yet.</p>';
        return;
    }

    tasksContainer.innerHTML = AppState.tasks.map((task) => `
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

// Fixed modal opener that finds the task by its unique ID instead of array index
window.openEditTaskModal = function(taskId) {
    console.log("Edit button clicked for taskId:", taskId);
    console.log("Current AppState.tasks:", AppState.tasks);

    const taskIndex = AppState.tasks.findIndex(t => t.id === taskId);
    console.log("Found taskIndex:", taskIndex);

    const task = AppState.tasks[taskIndex];
    if (!task) {
        console.error("ERROR: Task could not be found in AppState!");
        return;
    }

    const indexField = document.getElementById('edit-task-index');
    const titleField = document.getElementById('edit-task-title');
    const descField = document.getElementById('edit-task-desc');
    const dateField = document.getElementById('edit-task-date');
    const modalEl = document.getElementById('edit-task-modal');

    if (!modalEl) {
        console.error("ERROR: #edit-task-modal element not found in HTML!");
        return;
    }

    if (indexField) indexField.value = taskIndex;
    if (titleField) titleField.value = task.text || '';
    if (descField) descField.value = task.description || '';
    if (dateField) dateField.value = task.dueDate || '';

    modalEl.style.display = 'flex';
    console.log("Modal display set to flex.");
};

// Make sure toggleTask is also globally exposed
window.toggleTask = function(taskId) {
    const task = AppState.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        if (typeof saveStateToStorage === 'function') saveStateToStorage();
        window.renderTasks();
    }
};

function saveStateToStorage() {
    if (typeof AppState !== 'undefined') {
        localStorage.setItem('academic_planner_state', JSON.stringify(AppState));
    }
}

window.closeEditModal = function() {
    document.getElementById('edit-task-modal').style.display = 'none';
};

window.handleSaveEditedTask = function(event) {
    event.preventDefault();

    const index = document.getElementById('edit-task-index').value;
    const newText = document.getElementById('edit-task-title').value;
    const description = document.getElementById('edit-task-desc').value;
    const dueDate = document.getElementById('edit-task-date').value;

    if (AppState.tasks[index]) {
        AppState.tasks[index].text = newText;
        AppState.tasks[index].description = description;
        AppState.tasks[index].dueDate = dueDate;

        if (typeof saveStateToStorage === 'function') {
            saveStateToStorage();
        }

        window.renderTasks();
    }

    window.closeEditModal();
};

window.deleteTask = function(taskId) {
    AppState.tasks = AppState.tasks.filter(t => t.id !== taskId);
    
    if (typeof saveStateToStorage === 'function') {
        saveStateToStorage();
    }
    window.renderTasks();
};

// Bind listeners safely on load
function initPlannerEvents() {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');

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
}

// Initialize immediately or on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlannerEvents);
} else {
    initPlannerEvents();
}