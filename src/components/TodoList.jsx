/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import useTodoStore from '../store/todoStore';
import styles from './TodoList.module.css'; // Import CSS Module

const TodoList = () => {
  const { todos, addTodo, removeTodo, toggleTodo, editTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Add new todo
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
      setErrorMessage('');
    } else {
      setErrorMessage('Task cannot be empty.');
    }
  };

  // Start editing mode
  const handleEditTodo = (id, text) => {
    setEditingTodoId(id);
    setEditingText(text);
    setErrorMessage('');
  };

  // Save edited todo
  const handleSaveEdit = () => {
    if (editingText.trim()) {
      editTodo(editingTodoId, editingText.trim());
      setEditingTodoId(null);
      setEditingText('');
      setErrorMessage('');
    } else {
      setErrorMessage('Edited task cannot be empty.');
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingText('');
    setErrorMessage('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          className={styles.input}
        />
        <button onClick={handleAddTodo} className={styles.addButton}>
          Add Task
        </button>
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      <ul className={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.listItem}>
            {editingTodoId === todo.id ? (
              <div className={styles.editContainer}>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  placeholder="Edit your task"
                  className={styles.input}
                />
                <button
                  onClick={handleSaveEdit}
                  className={styles.saveButton}
                  style={{
                    cursor: editingText.trim() ? 'pointer' : 'not-allowed',
                    backgroundColor: editingText.trim() ? '#28a745' : '#ccc',
                  }}
                >
                  Save
                </button>
                <button onClick={handleCancelEdit} className={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className={styles.todoItem}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className={styles.checkbox}
                />
                <span
                  className={styles.todoText}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#6c757d' : '#212529',
                  }}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleEditTodo(todo.id, todo.text)}
                  className={styles.editButton}
                >
                  ✏️
                </button>
                <button onClick={() => removeTodo(todo.id)} className={styles.deleteButton}>
                  🗑️
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
