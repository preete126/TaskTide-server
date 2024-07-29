const HttpStatusCodes = {
    SUCCESS: 201,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST:400,
    NOT_FOUND:404,
    OK:200,
    CONFLICT:409
}
const JWT_ALGORITHM = "RS256"
module.exports = {
    HttpStatusCodes,
    JWT_ALGORITHM
}