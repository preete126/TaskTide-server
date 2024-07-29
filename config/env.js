require("dotenv").config()

const {
PORT,
MONGODB_URL,
BASE64PP
} = process.env

module.exports = {
    PORT,
    MONGODB_URL,
    BASE64PP
}