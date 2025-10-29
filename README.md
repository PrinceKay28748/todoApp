# todoApp

# ✨ Task Haven — A Modern Todo App

A beautifully designed and intuitive Todo application built using **Vanilla JavaScript**, **Webpack**, and **modular architecture**.  
Task Haven helps you organize your projects and todos efficiently — with local storage persistence, project grouping, and a sleek UI.

---

## 🚀 Live Demo
[🔗 View Tash Haven on GitHub Pages](https://<your-username>.github.io/<your-repo-name>)

---

## 📁 Features
- 🗂️ Create, view, and delete **projects**
- ✅ Add, complete, and delete **todos**
- 💾 Persistent storage using **localStorage**
- 🎨 Modern, responsive design with warm neutral tones
- ⚡ Powered by **Webpack modules**
- 🧩 Clean separation between logic and DOM manipulation

---

## 🧠 Project Structure


📁 src/
 ┣ 📄 index.js              → main entry point (controls app flow)
 ┣ 📄 todo.js               → defines what a single todo looks like
 ┣ 📄 project.js            → defines what a project is (a list of todos)
 ┣ 📄 logic.js              → app logic (add, delete, edit todos & projects)
 ┣ 📄 dom.js                → handles the UI (displaying and updating)
 ┣ 📄 storage.js            → saves/loads from localStorage
 ┣ 📄 style.css             → styles your app
 ┗ 📄 template.html         → HTML skeleton
