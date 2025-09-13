# SimpleTodoApp

## Short Description
SimpleTodoApp is a lightweight, vanilla JavaScript to‑do list application that runs entirely in the browser. It allows users to add, complete, delete, and filter tasks with a clean, responsive UI. All data is persisted in the browser's **localStorage**, so your tasks remain after a page refresh or browser restart.

---

## Tech Stack
- **HTML** – Structure of the application.
- **CSS** – Styling and responsive layout.
- **JavaScript** – Core functionality, event handling, and LocalStorage persistence.

---

## Features
- Add new tasks via an input field.
- Mark tasks as completed with a checkbox.
- Delete individual tasks.
- Filter tasks: All / Active / Completed.
- Clear all completed tasks with a single button.
- Persist tasks in `localStorage` under the key `simpleTodoTasks`.
- Responsive design for mobile and desktop.

---

## Installation / Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/simple-todo-app.git
   cd simple-todo-app
   ```
2. **Open the app**
   - Simply open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).
   - No build steps, package managers, or server setup are required.

---

## Usage Guide
### Adding a Task
- Type a task description into the input field at the top.
- Press **Enter** or click the **Add** button.

### Marking a Task Complete
- Click the checkbox next to a task to toggle its completed state.
- Completed tasks are displayed with a strikethrough style.

### Deleting a Task
- Click the **✕** (delete) icon on the right side of a task.

### Filtering Tasks
- Use the **All**, **Active**, and **Completed** buttons at the bottom to filter the visible list.

### Clearing Completed Tasks
- Click the **Clear Completed** button to remove all tasks that are marked as completed.

---

### Screenshots (placeholders)
- **Main View**: ![Main View](https://example.com/screenshots/main-view.png)
- **Adding a Task**: ![Add Task](https://example.com/screenshots/add-task.png)
- **Completed Task**: ![Completed Task](https://example.com/screenshots/completed-task.png)
- **Mobile Layout**: ![Mobile Layout](https://example.com/screenshots/mobile.png)

---

## LocalStorage Persistence
All tasks are saved in the browser's `localStorage` under the key **`simpleTodoTasks`**. The app reads this key on load and restores the task list, ensuring that your data persists across page reloads and browser sessions.

---

## Responsive Design
SimpleTodoApp uses a fluid layout and media queries to adapt to various screen sizes:
- **Desktop** – Full‑width task list with clear spacing.
- **Tablet** – Adjusted padding and larger touch targets.
- **Mobile** – Stacked controls, larger buttons, and a single‑column view for optimal usability on small screens.

---

## Development
If you prefer live reload while developing:
1. Install a simple static server (if you don't have one already):
   ```bash
   npm install -g serve
   ```
2. Run the server in the project root:
   ```bash
   serve .
   ```
3. Open the provided local URL (e.g., `http://localhost:5000`) in your browser. The page will refresh automatically when you edit `index.html`, `style.css`, or `app.js`.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Ensure the app still works by opening `index.html`.
4. Submit a pull request with a clear description of your changes.

---

## License
[Insert License Here]

---

## Integration Notes
- **File Structure**:
  - `index.html` – Main HTML markup.
  - `style.css` – Styling and responsive rules.
  - `app.js` – JavaScript logic handling task CRUD operations and LocalStorage.
- This README provides context for future developers and end‑users, linking back to the implementation details in the source files.
