import { useState } from "react";
import styles from "./TodoList.module.css";
import { getInitialData } from "../utils/data";

const TodoList = () => {
  const [todos, setTodos] = useState(getInitialData());
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  // Add a new todo
  const handleAddTodo = () => {
    if (!newTitle.trim() || !newBody.trim()) {
      alert("Title and description cannot be empty.");
      return;
    }
    const newTodo = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
      title: newTitle.trim(),
      body: newBody.trim(),
      archived: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
    setNewTitle("");
    setNewBody("");
  };

  // Save changes to an edited todo
  const handleSaveTodo = () => {
    if (!newTitle.trim() || !newBody.trim()) {
      alert("Title and description cannot be empty.");
      return;
    }
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editingTodo.id
          ? { ...todo, title: newTitle.trim(), body: newBody.trim() }
          : todo
      )
    );
    setEditingTodo(null);
    setNewTitle("");
    setNewBody("");
  };

  // Delete a todo with confirmation
  const handleDeleteTodo = (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (todoToDelete && window.confirm(`Delete "${todoToDelete.title}"?`)) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  // Cancel editing mode
  const handleCancelEdit = () => {
    setEditingTodo(null);
    setNewTitle("");
    setNewBody("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>To-Do List</h1>

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
          className={styles.input}
        />
        <textarea
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          placeholder="Description"
          className={styles.textarea}
        />
        {editingTodo ? (
          <>
            <button onClick={handleSaveTodo} className={styles.saveButton}>
              Save
            </button>
            <button onClick={handleCancelEdit} className={styles.cancelButton}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleAddTodo} className={styles.addButton}>
            Add Task
          </button>
        )}
      </div>

      {todos.length === 0 ? (
        <p className={styles.noData}>No tasks available.</p>
      ) : (
        <ul className={styles.list}>
          {todos.map((todo) => (
            <li key={todo.id} className={styles.listItem}>
              <h3 className={styles.todoTitle}>
                {todo.title}
                <span className={styles.date}>
                  {new Date(todo.createdAt).toLocaleDateString("id-ID")}
                </span>
              </h3>
              <p className={styles.todoBody}>{todo.body}</p>
              <div className={styles.actions}>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
