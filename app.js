// Todo Class. Represents a todo
class Todo {
    constructor(title, time) {
        this.title = title;
        this.time = time;
    }
}

// UI Class. The UI
class UI {
    static displayTodos() {
        const StoredTodos = [
            {
                title: 'Make the Bed',
                hour: '6',
                minute: '15',
                AmPm: 'AM'
            },
            {
                title: 'Wash the dishes',
                hour: '8',
                minute: '30',
                AmPm: 'Am'
            }
        ];
        const todos = StoredTodos;
    }
}

// Store Class. The storage.

// Event. Displays todos.

// Event. Add todos.

// Event. Remove todos.