const express = require("express")
const { postExam, getExam, getSingleExam, deleteExam } = require("../controllers/exams.controller.js")
const verifyToken = require("../middleware/verifyToken")
const allowdTo = require("../middleware/allowdTo")
const { delCourse } = require("../controllers/Course.controller.js")
const router = express.Router()

router.route("/")
    .post(verifyToken, allowdTo("ADMIN"), postExam)
    .get(verifyToken, getExam)
router.route("/:idExam")
    .get(verifyToken, getSingleExam)
    // .patch(verifyToken, allowdTo("ADMIN"), updateCourse)
    .delete(verifyToken, allowdTo("ADMIN"), deleteExam)

module.exports = router