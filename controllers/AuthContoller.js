const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const { startSession } = require("mongoose")
const Users = require("../models/users")
const { HttpStatusCodes, JWT_ALGORITHM } = require("../utils/constants")
const {readFileSync} = require("fs")
const { join } = require("path")
const { root_path } = require("../global.config")
const jwt = require("jsonwebtoken")



module.exports.Registration = async(req,res)=>{
    const {username, email, password} = req.body

    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(HttpStatusCodes.CONFLICT).json({message:"invalid input fields", errors:errors.array()});
    }

    const session = await startSession();
    session.startTransaction();

    try {
        let user = await Users.findOne({ email });
        if (user) {
          return res.status(HttpStatusCodes.BAD_REQUEST).json({ msg: 'User already exists' });
        }
        user = new Users({
            username,
            email,
            password
        }).save({session: session})
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({message: "User Registration failed"});
    }

    await session.commitTransaction();
    res.status(HttpStatusCodes.SUCCESS).json({message: "User Registered successfully"});
    await session.endSession();
}


module.exports.Login = async (req, res)=>{
    const {email,password} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(HttpStatusCodes.BAD_REQUEST).json({message:"Input error!", errors:errors.array()})
    }

    try {
        //find user with email address
        const user = await Users.findOne({email})

        if(user == null){
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({message:"Incorrect email address."})
        }
         
        // verify password
        const verifyPassword = await bcrypt.compare(password, user.password)
        if (!verifyPassword) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({message:"Incorrect password."})
        }

        //obtain token with jwt
        
        let payload = {
            name: user.name,
            id: user._id
        }
        const private_key = readFileSync(join(root_path, "private.pem"))
        const token = jwt.sign(payload, private_key, {algorithm: JWT_ALGORITHM, expiresIn:3600})
        user.password = null
        res.status(HttpStatusCodes.SUCCESS).json({message:"User login successful", token:token, user:user})

    } catch (error) {
        console.log(error)
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({message: "An unexpected error occured"})
    }
}
