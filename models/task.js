const { Schema, model } = require("mongoose")
const { schema } = require("./users")


const TaskSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: Schema.Types.String,
    required: true
  },
  description: {
    type: Schema.Types.String
  },
  completed: {
    type: Schema.Types.Boolean,
    default: false
  },
  date: {
    type: Schema.Types.Date,
    default: Date.now
  }
})

const Task = model("tasks", TaskSchema)

module.exports = Task