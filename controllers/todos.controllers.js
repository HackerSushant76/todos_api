const { Todo } = require("../models/todos.model");

const getTodos = async (req, res) => {
  const {date} = req.query
  const todos = await Todo.find({date});
  res.send(todos);
};

const getTodoById = async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    res.send(todo);
  }

const addTodo = async (req, res) => {
  const { title, status, date } = req.body;
  const todo = new Todo({ title, status,date });
  await todo.save();
  res.send("Todos added successfully");
};

const updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const data = await Todo.findById(todoId);
  await Todo.findByIdAndUpdate(todoId, { status: !data.status });
  res.send("todos updated");
};

const deleteTodo = async (req, res) => {
  const { todoId } = req.params;
  await Todo.findByIdAndDelete(todoId);
  res.send("todo deleted");
};

module.exports = {getTodos,addTodo,updateTodo,deleteTodo,getTodoById}