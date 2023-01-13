const { default: mongoose } = require("mongoose");

const todoSchema = mongoose.Schema({
    title: {type: String , required: true},
    status: {type: Boolean , required: true},
    date: {type: String, required: true}
})
const Todo = mongoose.model("todos1" , todoSchema) 

module.exports = {Todo}