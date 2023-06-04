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