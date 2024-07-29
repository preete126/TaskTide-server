const Task = require("../models/task")
const { HttpStatusCodes } = require("../utils/constants")


module.exports.CreateTask = async (req, res) => {
    const { title, description } = req.body
    try {
        const task = new Task({
            user: req.user._id,
            title,
            description
        }).save()
        res.status(HttpStatusCodes.SUCCESS).json({ message: "Task created successfully" })
    } catch (error) {
        console.log(error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" })
    }
}

module.exports.GetTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ "user": req.user._id })
        res.status(HttpStatusCodes.SUCCESS).send(tasks)
    } catch (error) {
        console.log(error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" })
    }
}

module.exports.UpdateTask = async (req, res) => {
    const { title, description, completed } = req.body

    try {
        let task = await Task.findById({ "_id": req.params.id })
        if (task == null) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({ message: "Task not found" })
        }
        if (String(task.user) !== String(req.user._id)) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: "Unauthorized user!" })
        }

        task = await Task.findByIdAndUpdate(req.params.id, {
            $set: { title, description, completed },
        },
            { new: true }
        )
        res.status(HttpStatusCodes.OK).json(task)
    } catch (error) {
        console.log(error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" })
    }
}

module.exports.DeleteTask = async(req,res)=>{
    try {
        let task = await Task.findById({ "_id": req.params.id })
        if (task == null) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({ message: "Task not found" })
        }

        if ((String(task.user) !== String(req.user._id))) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: "Unauthorized user!" })
        }
         
        task = await Task.findOneAndDelete({"_id": req.params.id})
        res.status(HttpStatusCodes.OK).json({message:'Task deleted successfully'})
    } catch (error) {
        console.log(error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" })
    }
}