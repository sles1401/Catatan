import { create } from 'zustand';

const useTodoStore = create((set) => ({
  todos: [],

  // Add a new todo
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text: todo, completed: false }],
    })),

  // Remove a todo by ID
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  // Toggle a todo's completion status
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  // Edit a todo by ID
  editTodo: (id, newText) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    })),
}));

export default useTodoStore;
