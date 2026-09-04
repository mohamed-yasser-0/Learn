const express = require("express")
const { postDeg, getSingleDeg } = require("../controllers/deg.controller.js")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()

router.route("/")
    .post(verifyToken, postDeg)
    .get(verifyToken, getSingleDeg)
module.exports = router