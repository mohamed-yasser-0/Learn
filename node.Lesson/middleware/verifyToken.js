const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const { FAIL } = require("../utils/httpStatusText");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        const error = appError.create("No token provided", 401, FAIL);
        return next(error);
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded;
        next();
    } catch {
        const error = appError.create("Invalid token", 401, FAIL);
        return next(error);
    }

}
module.exports = verifyToken