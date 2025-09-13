// Simple Todo App - Core Logic
// ------------------------------------------------------------
// Step 1: Data Model & Persistence
// ------------------------------------------------------------
const STORAGE_KEY = 'simpleTodoTasks';
const FILTER_KEY = 'simpleTodoFilter'; // optional persistence for filter

/**
 * Task model representing a single todo item.
 */
class Task {
  /**
   * @param {string} id - Unique identifier for the task.
   * @param {string} text - The task description.
   * @param {boolean} [completed=false] - Completion status.
   */
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
}

/**
 * Load tasks from localStorage.
 * @returns {Task[]}
 */
function loadTasks() {
  const json = localStorage.getItem(STORAGE_KEY);
  if (!json) return [];
  try {
    const rawArray = JSON.parse(json);
    // Convert plain objects back into Task instances.
    return rawArray.map(obj => Object.assign(new Task(), obj));
  } catch (e) {
    console.error('Failed to parse tasks from storage', e);
    return [];
  }
}

/**
 * Save tasks array to localStorage.
 * @param {Task[]} tasks
 */
function saveTasks(tasks) {
  const json = JSON.stringify(tasks);
  localStorage.setItem(STORAGE_KEY, json);
}

/**
 * Load the currently selected filter from storage.
 * @returns {string} one of 'all', 'active', 'completed'
 */
function loadFilter() {
  const saved = localStorage.getItem(FILTER_KEY);
  return saved || 'all';
}

/**
 * Persist the current filter.
 * @param {string} filter
 */
function saveFilter(filter) {
  localStorage.setItem(FILTER_KEY, filter);
}

// ------------------------------------------------------------
// Step 2: UI Rendering Functions
// ------------------------------------------------------------
const taskListEl = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task-input');
const itemsLeftSpan = document.getElementById('items-left');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed');

/**
 * Render the task list based on provided tasks and filter.
 * @param {Task[]} tasks
 * @param {string} [filter='all']
 */
function renderTasks(tasks, filter = 'all') {
  // Clear existing list
  taskListEl.innerHTML = '';

  // Apply filter
  const filtered = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  // Create list items
  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;
    if (task.completed) li.classList.add('completed');

    // Checkbox toggle
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'toggle';
    if (task.completed) checkbox.checked = true;

    // Label
    const label = document.createElement('label');
    label.className = 'task-label';
    label.textContent = task.text;

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = '✖';

    // Assemble
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(delBtn);
    taskListEl.appendChild(li);
  });

  // Update items left count after rendering
  updateItemsLeft(tasks);

  // Update filter button active state
  updateFilterButtons(filter);
}

/**
 * Update the "items left" counter.
 * @param {Task[]} tasks
 */
function updateItemsLeft(tasks) {
  const activeCount = tasks.filter(t => !t.completed).length;
  itemsLeftSpan.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

/**
 * Highlight the active filter button.
 * @param {string} activeFilter
 */
function updateFilterButtons(activeFilter) {
  filterButtons.forEach(btn => {
    if (btn.dataset.filter === activeFilter) {
      btn.classList.add('active-filter');
    } else {
      btn.classList.remove('active-filter');
    }
  });
}

// ------------------------------------------------------------
// Step 3: Core Task Operations
// ------------------------------------------------------------
/**
 * Add a new task with the given text.
 * @param {string} text
 */
function addTask(text) {
  const tasks = loadTasks();
  const newTask = new Task(Date.now().toString(), text);
  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks(tasks, currentFilter);
}

/**
 * Toggle completion state of a task by id.
 * @param {string} id
 */
function toggleTask(id) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks(tasks);
    renderTasks(tasks, currentFilter);
  }
}

/**
 * Delete a task by id.
 * @param {string} id
 */
function deleteTask(id) {
  let tasks = loadTasks();
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
  renderTasks(tasks, currentFilter);
}

/**
 * Clear all completed tasks.
 */
function clearCompleted() {
  let tasks = loadTasks();
  tasks = tasks.filter(t => !t.completed);
  saveTasks(tasks);
  renderTasks(tasks, currentFilter);
}

// ------------------------------------------------------------
// Step 4: Event Listeners
// ------------------------------------------------------------
let currentFilter = loadFilter(); // default 'all'

function setupEventListeners() {
  // Add task on Enter key
  newTaskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const value = newTaskInput.value.trim();
      if (value) {
        addTask(value);
        newTaskInput.value = '';
      }
    }
  });

  // Delegated events for toggle & delete within the task list
  taskListEl.addEventListener('click', e => {
    const target = e.target;
    const li = target.closest('li.task-item');
    if (!li) return; // click outside a task item
    const id = li.dataset.id;
    if (target.matches('.toggle')) {
      toggleTask(id);
    } else if (target.matches('.delete-btn')) {
      deleteTask(id);
    }
  });

  // Filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      saveFilter(currentFilter);
      const tasks = loadTasks();
      renderTasks(tasks, currentFilter);
    });
  });

  // Clear completed button
  clearCompletedBtn.addEventListener('click', () => {
    clearCompleted();
  });
}

// ------------------------------------------------------------
// Step 5: Initialization
// ------------------------------------------------------------
function init() {
  const tasks = loadTasks();
  renderTasks(tasks, currentFilter);
  setupEventListeners();
}

// Run init after DOM is ready (deferred script already ensures this, but safe guard)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
