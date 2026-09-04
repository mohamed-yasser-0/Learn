const express = require("express")
const { postCourse, getCourse, getSingleCourse, updateCourse, delCourse } = require("../controllers/Course.controller")
const verifyToken = require("../middleware/verifyToken")
const allowdTo = require("../middleware/allowdTo")
const router = express.Router()

router.route("/")
    .post(verifyToken, allowdTo("ADMIN"), postCourse)
    .get(verifyToken, getCourse)
router.route("/:idCourse")
    .get(verifyToken, getSingleCourse)
    .patch(verifyToken, allowdTo("ADMIN"), updateCourse)
    .delete(verifyToken, allowdTo("ADMIN"), delCourse)

module.exports = router