const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const {
  deleteTodo,
  updateTodo,
  addTodo,
  getTodos,
  getTodoById,
} = require("./controllers/todos.controllers");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hii from backend");
});

app.get("/todos", getTodos);

app.get("/todos/:id", getTodoById);
app.post("/todos/create", addTodo);

app.patch("/todos/:todoId", updateTodo);

app.delete("/todos/:todoId", deleteTodo);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log("error in db connection");
    console.log(err);
  }
  console.log(`listening on ${PORT}`);
});
