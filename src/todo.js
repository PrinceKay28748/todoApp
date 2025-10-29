// This defines how a single todo item looks like.

export default function Todo(title, description, duedate , priority,notes = "", checklist = []) {
    return{
        title,
        description,
        duedate,
        priority,
        notes,
        checklist,
        completed: false,

    }
};