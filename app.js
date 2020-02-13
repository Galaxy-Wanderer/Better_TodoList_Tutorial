// Todo Class. Represents a todo
class Todo {
    constructor(title, hour, minute, AmPm) {
        this.title = title;
        this.hour = hour;
        this.minute = minute;
        this.AmPm = AmPm;
    }
}

// UI Class. The UI
class UI {
    static displayTodos() {
        const todos = Store.getTodos();
        todos.forEach(todo => UI.addTodoToList(todo));
    }
    static addTodoToList(todo) {
        const list = document.querySelector('#todo-list');
        const row = document.createElement('tr');
        row.innerHTML = `<td>${todo.title}</td>
                        <td>${todo.hour}:${todo.minute} ${todo.AmPm}</td>
                        <td><button class="btn btn-danger btn-sm delete">X</button></td>`;
        list.appendChild(row);
    }
    static deleteTodo(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message, className) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${className}`;
        alert.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('form');
        container.insertBefore(alert, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#hour').value = '';
        document.querySelector('#minute').value = '';
        document.querySelector('#AmPm').value = '';
    }
}

// Store Class. The storage.
class Store {
    static getTodos() {
        let todos;
        if(localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        return todos;
    }
    static addTodo(todo) {
        const todos = Store.getTodos();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    static removeTodo(title) {
        const todos = Store.getTodos();
        todos.forEach((todo, index) => {
            if(todo.title === title) {
                todos.splice(index, 1);
            }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}


// Event. Displays todos.
document.addEventListener('DOMContentLoaded', UI.displayTodos());

// Event. Add todos.
document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const hour = document.querySelector('#hour').value;
    const minute = document.querySelector('#minute').value;
    const ampm = document.querySelector('#AmPm').value;
    if(!title || !hour || !minute || !ampm) {
        UI.showAlert('Please fill in all the fields', 'danger');
    } else {
        const todo = new Todo(title, hour, minute, ampm);
        UI.addTodoToList(todo);
        Store.addTodo(todo);
        UI.showAlert('Todo added', 'success');
        UI.clearFields();
    }
});

// Event. Remove todos.
document.querySelector('#todo-list').addEventListener('click', (e) => {
    UI.deleteTodo(e.target);
    Store.removeTodo(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    UI.showAlert('Todo deleted', 'warning');
});