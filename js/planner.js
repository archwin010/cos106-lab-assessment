// ==========================================
// ACADEMIC PLANNER MODULE (planner.js)
// ==========================================

function addTask() {
    const taskText = DOM.taskInput.value.trim();

    // 1. Validation: Prevent adding empty tasks
    if (taskText === '') {
        alert('Please enter a task description.');
        return;
    }

    // 2. Create new task object
    const newTask = {
        id: Date.now(), // Unique ID from timestamp
        text: taskText,
        completed: false
    };

    // 3. Update state array
    AppState.tasks.push(newTask);

    // 4. Reset input field
    DOM.taskInput.value = '';

    // 5. Re-render tasks UI
    renderTasks();
}

function renderTasks() {
    if (!DOM.taskListContainer) return;

    // Clear existing list container HTML
    DOM.taskListContainer.innerHTML = '';

    // Handle empty state display
    if (AppState.tasks.length === 0) {
        DOM.taskListContainer.innerHTML = '<li class="empty-task">No tasks added yet. Stay organized!</li>';
        return;
    }

    // Map through tasks and inject HTML markup
    DOM.taskListContainer.innerHTML = AppState.tasks.map(task => `
        <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button class="toggle-btn" onclick="toggleTask(${task.id})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </li>
    `).join('');
}

function toggleTask(taskId) {
    const task = AppState.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function deleteTask(taskId) {
    AppState.tasks = AppState.tasks.filter(t => t.id !== taskId);
    renderTasks();
}

// Bind planner-specific events
function initPlannerEvents() {
    // Click event for Add Task button
    if (DOM.addTaskBtn) {
        DOM.addTaskBtn.addEventListener('click', addTask);
    }

    // Keypress event (Allows pressing 'Enter' to submit task)
    if (DOM.taskInput) {
        DOM.taskInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                addTask();
            }
        });
    }
}

// Initialize planner event bindings on script load
initPlannerEvents();