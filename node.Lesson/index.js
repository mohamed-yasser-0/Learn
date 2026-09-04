const express = require("express")
const cors = require("cors")

const mongoose = require('mongoose');

const dns = require('dns');
dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8"]);
const { postCourse, getCourse, getSingleCourse, delCourse, updateCourse } = require("./controllers/Course.controller.js");
const courseRouter = require("./routes/course.routes.js");
const lessonRouter = require("./routes/lessons.routes.js");
const examRouter = require("./routes/exam.routes.js");
const examDegRouter = require("./routes/deg.routes.js");
const progress = require("./routes/progress.routes.js");
const usersRouter = require("./routes/users.routes.js");
require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected successfully with MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting MongoDB:", err.message);
    });

app.use("/api/course", courseRouter)
app.use("/api/lessons", lessonRouter)
app.use("/api/exam", examRouter)
app.use("/api/deg", examDegRouter)
app.use("/api/progress", progress)
app.use("/api/users", usersRouter)

app.use((req, res, next) => {
    res.json({ status: 'ERROR', message: 'this resource not found' })
})

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || 'ERROR',
        message: error.message || 'Something went wrong'
    });
});
const PORT = process.env.PORT || 1000

app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})