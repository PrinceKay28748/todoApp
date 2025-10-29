export default function Project(name){
    const todoList = [];

    // method to add a todo item to the project 
    function addTodo(todo){
        todoList.push(todo);
    };

    // method to delete a todo item from the project 
    function deleteTodo(index){
        todoList.splice(index, 1);
    };

    // method to get all todo items in the project
    function getTodos(){
        return todoList;
    };

    return {
        name,
        addTodo,
        deleteTodo,
        getTodos
    };
}