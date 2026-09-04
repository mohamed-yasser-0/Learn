const express = require("express")
const { register, login, user } = require("../controllers/Users.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const router = express.Router()



router.get("/", verifyToken, user);
router.post("/register", register);
router.post("/login", login);
module.exports = router