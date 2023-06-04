# TODO Project Setup

The project will be built in three sections:

- The Node.js and Express backend server
- The React.js frontend client
- The MongoDB database

## Project Location on Windows

Please store your project in the `C:\Users` folder because Docker shares this folder. It's required for the Bindmount part. For instance, `C:\Users\Ahmad\workspace`.

## Working Environment

Use Visual Studio Code to open the project folder and utilize its integrated terminal.

## Initializing MongoDB

Run the following command to start MongoDB:

```bash
docker run \
    --name mongodb \
    --rm \
    -d \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    mongo
```

Verify the status and logs of our MongoDB container using these commands:

```bash
docker ps
docker logs mongodb
```

## Backend Setup: Node.js and Express

In the path `C:\Users\Ahmad\workspace\docker_workshop`, create a backend folder. Install the necessary dependencies using the commands:

```bash
npm init -y
npm install express mongoose cors
```

Create a file called `app.js` and include the following code:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.URL}:27017/todoApp?authSource=admin`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Model
const TodoSchema = mongoose.Schema({
    title: String,
    done: Boolean
});

const Todo = mongoose.model('Todo', TodoSchema);

// Routes
app.get('/todos', async (req, res) => {
    console.log('Fetched all todos');
    const todos = await Todo.find();
    res.send(todos);
});

app.post('/todos', async (req, res) => {
    const newTodo = new Todo(req.body);
    console.log(`Created new todo with id: ${newTodo._id}`);
    await newTodo.save();
    res.send(newTodo);
});

app.patch('/todos/:id', async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(`Updated todo with id: ${updatedTodo._id}`);
    res.send(updatedTodo);
});

app.delete('/todos/:id', async (req, res) => {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    console.log(`Deleted todo with id: ${deletedTodo._id}`);
    res.send(deletedTodo);
});

// Listen
app.listen(8080, () => console.log('Server running on port 8080'));
```

To start the backend, execute these commands:

```bash
export MONGODB_USERNAME=admin
export MONGODB_PASSWORD=password
export URL=localhost
echo $MONGODB_USERNAME
echo $MONGODB_PASSWORD
echo $URL
node app.js
```

## Frontend Setup: React.js

In `C:\Users\Ahmad\workspace\docker_workshop`, execute the following commands:

```bash
npx create-react-app frontend
cd frontend
npm install axios
```

Replace the contents of `src/App.js` with:

```javascript
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
```

Replace the contents of `src/App.css` with:

```css
.app {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.header {
  color: #3f51b5;
  margin: 20px;
}

.input-area {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.input-field {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.add-btn, .done-btn, .delete-btn {
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.add-btn {
  background-color: #3f51b5;
  color: white;
}

.done-btn {
  background-color: #4caf50;
  color: white;
  margin-right: 10px;  /* Add some space to the right of the 'Done' button */
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.todo-text {
  text-align: left;  /* Align the text to the start of the line */
  margin: 0;
  flex: 1;
}

.todo-buttons {
  display: flex;
}

.completed {
  text-decoration: line-through;
}

```

To start the backend, use this command:

```bash
npm start
```

Now, test the application by opening http://localhost:3000/, adding a TODO, marking a TODO as done, and deleting a TODO.


# Add .gitignore file to the backend before commiting the code
1. In your project's backend directory, create a file named `.gitignore`. You can do this using a text editor, or from the command line:

```bash
touch .gitignore
```

2. Open the `.gitignore` file and add this line:

```
node_modules/
```

3. Save and close the `.gitignore` file.