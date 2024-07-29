const bcrypt = require("bcryptjs")
const { Schema, model } = require("mongoose")

const UserSchema = Schema({
    username: {
        type: Schema.Types.String,
        require: true,
    },
    email: {
        type: Schema.Types.String,
        require: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        require: true
    }
},
    {
        timestamps: true
    }
)

UserSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})


const Users = model("users", UserSchema)

module.exports = Users