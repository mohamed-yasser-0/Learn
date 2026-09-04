const express = require("express")
const { postProgress, getProgress } = require("../controllers/progress.controller")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()


router.route("/watch/:idLesson")
    .post(verifyToken, postProgress)
router.route("/")
    .get(verifyToken, getProgress)


module.exports = router