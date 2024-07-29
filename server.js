const express = require("express")
const { PORT, MONGODB_URL } = require("./config/env")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Authrouter = require("./routes/users")
const Taskrouter = require("./routes/task")


const app = express()
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Method","GET,PUT,POST,DELETE")
    res.setHeader("X-Powered-By", null)
    res.setHeader("Access-Control-Allow-Headers",['Content-Type', 'Authorization'])
    next()
})

mongoose.connect(MONGODB_URL)
const db = mongoose.connection
db.on("error", (error)=> console.log(error))
db.once("open", ()=> console.log("database connected"))


app.use("/api/user", Authrouter)
app.use("/api/task", Taskrouter)

app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`);
})