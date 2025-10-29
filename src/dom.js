// This handles the UI logic of the application

import Logic from './logic.js';
import Project from './project.js';
import logo from '../Assets/logo.png';


const DOM = (() => {
    const content = document.getElementById('content');
    if (!content) throw new Error('Missing #content element in DOM');


 function addLogoToHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  // Prevent duplicates
  if (header.querySelector('img')) return;

  const img = document.createElement('img');
  img.src = logo; // ✅ Use the imported logo variable
  img.alt = 'Todo App Logo';
  img.classList.add('header-logo');

  // Insert logo before the heading text
  const heading = header.querySelector('h1');
  if (heading) {
    header.insertBefore(img, heading);
  } else {
    header.prepend(img);
  }
}


    // ---------- RENDER PROJECTS ----------
    function renderProjects() {
        content.innerHTML = '';
        const projects = Logic.getProjects();

        const projectList = document.createElement('div');
        projectList.classList.add('project-list');

        projects.forEach((project, index) => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');

            const nameSpan = document.createElement('span');
            nameSpan.textContent = project.name;
            nameSpan.classList.add('project-name');
            nameSpan.addEventListener('click', () => {
                renderTodos(project.name);
            });

            //  Delete project button
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.textContent = '✕';
            deleteBtn.classList.add('delete-project-btn');
            deleteBtn.title = 'Delete this project';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent triggering the click on project name
                const confirmDelete = confirm(`Are you sure you want to delete "${project.name}"?`);
                if (confirmDelete) {
                    Logic.deleteProject(index);
                    renderProjects();
                }
            });

            projectItem.appendChild(nameSpan);
            projectItem.appendChild(deleteBtn);
            projectList.appendChild(projectItem);
        });

        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.textContent = 'Add Project';
        addBtn.classList.add('add-project-btn');
        addBtn.addEventListener('click', showProjectForm);

        content.appendChild(projectList);
        content.appendChild(addBtn);
    }

    // ---------- RENDER TODOS ----------
    function renderTodos(projectName) {
        const project = Logic.getProjectByName(projectName);
        if (!project) return;
        content.innerHTML = '';

        const title = document.createElement('h2');
        title.textContent = project.name;

        const todoList = document.createElement('div');
        todoList.classList.add('todo-list');

        project.getTodos().forEach((todo, index) => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');

            const completedCheckbox = document.createElement('input');
            completedCheckbox.type = 'checkbox';
            completedCheckbox.checked = !!todo.completed;
            completedCheckbox.addEventListener('change', () => {
                todo.completed = completedCheckbox.checked;
                renderTodos(projectName);
            });
            todoItem.appendChild(completedCheckbox);

            const info = document.createElement('span');
            info.textContent = ` ${todo.title} - Due: ${todo.duedate} - Priority: ${todo.priority}`;
            if (todo.completed) info.style.textDecoration = 'line-through';
            todoItem.appendChild(info);

            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-todo-btn');
            deleteBtn.addEventListener('click', () => {
                project.deleteTodo(index);
                renderTodos(projectName);
            });
            todoItem.appendChild(deleteBtn);

            todoList.appendChild(todoItem);
        });

        const addTodoBtn = document.createElement('button');
        addTodoBtn.type = 'button';
        addTodoBtn.textContent = 'Add Todo';
        addTodoBtn.addEventListener('click', () => {
            showAddTodoForm(projectName, todoList);
        });

        const backBtn = document.createElement('button');
        backBtn.type = 'button';
        backBtn.textContent = 'Back to Projects';
        backBtn.addEventListener('click', renderProjects);

        content.appendChild(title);
        content.appendChild(todoList);
        content.appendChild(addTodoBtn);
        content.appendChild(backBtn);
    }

    // ---------- SHOW ADD TODO FORM ----------
    function showAddTodoForm(projectName, container) {
        if (container.querySelector('.add-todo-form')) return;

        const form = document.createElement('form');
        form.classList.add('add-todo-form');

        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.placeholder = 'Title';
        titleInput.required = true;

        const descInput = document.createElement('input');
        descInput.type = 'text';
        descInput.placeholder = 'Description';

        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.placeholder = 'Due date';

        const prioritySelect = document.createElement('select');
        ['Low', 'Medium', 'High'].forEach(p => {
            const opt = document.createElement('option');
            opt.value = p;
            opt.textContent = p;
            prioritySelect.appendChild(opt);
        });

        const btnContainer = document.createElement('div');
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Add';

        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.addEventListener('click', () => form.remove());

        btnContainer.appendChild(submitBtn);
        btnContainer.appendChild(cancelBtn);

        form.appendChild(titleInput);
        form.appendChild(descInput);
        form.appendChild(dateInput);
        form.appendChild(prioritySelect);
        form.appendChild(btnContainer);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = titleInput.value.trim();
            if (!title) return;
            const description = descInput.value.trim();
            const duedate = dateInput.value;
            const priority = prioritySelect.value;

            Logic.addTodoToProject(projectName, title, description, duedate, priority);
            renderTodos(projectName);
        });

        container.prepend(form);
        titleInput.focus();
    }

    // ---------- SHOW ADD PROJECT FORM ----------
    function showProjectForm() {
        content.innerHTML = '';

        const formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        const title = document.createElement('h2');
        title.textContent = 'Create a New Project';

        const form = document.createElement('form');
        form.classList.add('project-form');

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter project name';
        input.required = true;

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Add Project';
        submitBtn.type = 'submit';

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.type = 'button';
        cancelBtn.addEventListener('click', renderProjects);

        btnContainer.appendChild(submitBtn);
        btnContainer.appendChild(cancelBtn);

        form.appendChild(input);
        form.appendChild(btnContainer);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = input.value.trim();
            if (name) {
                const newProject = Project(name);
                Logic.addProject(newProject);
                renderProjects();
            }
        });

        formContainer.appendChild(title);
        formContainer.appendChild(form);
        content.appendChild(formContainer);
    }

    return {
         renderProjects,
         addLogoToHeader

     };
})();

export default DOM;
