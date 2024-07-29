const {root_path} = require("../global.config")
const {readFileSync} = require("fs")
const { join } = require("path")
const jwt = require("jsonwebtoken")
const { HttpStatusCodes, JWT_ALGORITHM } = require("../utils/constants")
const Users = require("../models/users")

module.exports.Auth = async(req,res, next)=>{
    try {
        const token = String(req.headers["authorization"]).split(" ")[1]
        const private_key = readFileSync(join(root_path, "private.pem"))
        const token_decoder = jwt.verify(token, private_key, {algorithms:JWT_ALGORITHM})
        const user = await Users.findById({"_id": token_decoder?.id})
        if (user == null) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({message:"Unauthorized access"})
        }
        
        req["user"] = user
        next()
    } catch (error) {
        console.log(error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})
    }
}