const Routes = require("express")
const { CreateTask, GetTasks, UpdateTask, DeleteTask } = require("../controllers/TaskController")
const { Auth } = require("../middleware/auth")


const Taskrouter = Routes()

Taskrouter.post("/new-task",[Auth], CreateTask)
Taskrouter.get("/1-user-tasks", [Auth], GetTasks)
Taskrouter.put("/edit/:id",[Auth], UpdateTask)
Taskrouter.delete("/delete/:id", [Auth], DeleteTask)

module.exports = Taskrouter