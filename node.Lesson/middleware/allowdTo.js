const { FAIL } = require("../utils/httpStatusText");

module.exports = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            return next();
        }

        return res.status(403).send({
            status: FAIL,
            data: "Forbidden"
        })
    }
}