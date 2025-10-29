import Project from './project.js';
import Todo from './todo.js';

const Logic = (() => {
    // Load saved data from localStorage
    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];

    // If no saved projects, create a default one
    const projects = savedProjects.length > 0 
        ? savedProjects.map((p) => {
            // Reconstruct Project objects since JSON strips methods
            const project = Project(p.name);
            p.todos.forEach(todo => {
                const restoredTodo = Todo(todo.title, todo.description, todo.duedate, todo.priority);
                project.addTodo(restoredTodo);
            });
            return project;
        })
        : [Project("Default Project")];

    // Save current projects array to localStorage
    function saveToStorage() {
        // Convert to plain data (without methods) before saving
        const plainProjects = projects.map(p => ({
            name: p.name,
            todos: p.getTodos()
        }));
        localStorage.setItem('projects', JSON.stringify(plainProjects));
    }

    function addProject(project) {
        projects.push(project);
        saveToStorage();
    }

    function getProjects() {
        return projects;
    }

    function deleteProject(index) {
        projects.splice(index, 1);
        saveToStorage();
    }

    function getProjectByName(name) {
        return projects.find(project => project.name === name);
    }

    function addTodoToProject(projectName, title, description, duedate, priority) {
        const project = getProjectByName(projectName);
        if (project) {
            const newTodo = Todo(title, description, duedate, priority);
            project.addTodo(newTodo);
            saveToStorage();
        } else {
            console.log("Project not found");
        }
    }

    return {
        deleteProject,
        getProjectByName,
        addTodoToProject,
        addProject,
        getProjects
    };
})();

export default Logic;
