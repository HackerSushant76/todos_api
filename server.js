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
const { userSignup, userLogin } = require("./controllers/user.controller");
const authentication = require("./middlewares/Authentication");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hii from backend");
});

app.post("/signup", userSignup);

app.post("/login", userLogin);

app.get("/todos", authentication, getTodos);

app.get("/todos/:id", authentication, getTodoById);
app.post("/todos/create", authentication, addTodo);

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
