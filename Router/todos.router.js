const express = require("express");
const { Todo } = require("../models/todos.model");
const cors = require("cors");

const todosRouter = express.Router()
todosRouter.use(cors({
    origin: '*'
}));

todosRouter.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

todosRouter.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.send(todo);
});
todosRouter.post("/todos/create", async (req, res) => {
  const {title,status} = req.body
  const todo = new Todo({title,status})
  await todo.save()
  res.send("Todos added successfully");
});

module.exports = {todosRouter}