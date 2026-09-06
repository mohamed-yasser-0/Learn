const express = require("express")
const { postProgress, getProgress } = require("../controllers/progress.controller")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()


router.route("/watch/:idCourse")
    .post(verifyToken, postProgress)
    .get(verifyToken, getProgress)


module.exports = router