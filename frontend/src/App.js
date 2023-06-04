import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:8080/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    if(title !== '') {
      const newTodo = { title: title, done: false };
      await axios.post('http://localhost:8080/todos', newTodo);
      setTitle('');
      fetchTodos();
    }
  };

  const updateTodo = async (id) => {
    const todoToUpdate = todos.find(todo => todo._id === id);
    todoToUpdate.done = !todoToUpdate.done;
    await axios.patch(`http://localhost:8080/todos/${id}`, todoToUpdate);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8080/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="app">
      <h1 className="header">Todo List</h1>
      <div className="input-area">
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          className="input-field"
          placeholder="Enter a task..."
        />
        <button onClick={addTodo} className="add-btn">Add</button>
      </div>
      {todos.map(todo => (
        <div key={todo._id} className="todo-item">
          <h2 className={todo.done ? 'todo-text completed' : 'todo-text'}>{todo.title}</h2>
          <div className="todo-buttons"> {/* This is new */}
            <button onClick={() => updateTodo(todo._id)} className="done-btn">Done</button>
            <button onClick={() => deleteTodo(todo._id)} className="delete-btn">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;