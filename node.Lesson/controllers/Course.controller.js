const AsyncWrapper = require("../middleware/AsyncWrapper.js");
const Course = require("../model/course.js");
const { SUCCESS, FAIL } = require("../utils/httpStatusText.js");
const Lesson = require("../model/lessons.js");
const appError = require("../utils/appError.js");


const postCourse = AsyncWrapper(async (req, res, next) => {
    const course = new Course(req.body);
    await course.save();

    res.status(201).json({
        status: SUCCESS,
        message: "تم إضافة الكورس بنجاح",
        data: { course }
    });
});
const getCourse = AsyncWrapper(async (req, res) => {
    const course = await Course.find()
    res.send({
        "status": SUCCESS,
        "data": {
            course
        }
    })
})
const getSingleCourse = AsyncWrapper(async (req, res, next) => {
    const id = req.params.idCourse
    const course = await Course.findById(id)
    if (!course) {
        const error = appError.create("الكورس غير موجود", 404, FAIL)
        return next(error)
    }
    res.send({
        "status": SUCCESS,
        "data": {
            course
        }
    })
})
const updateCourse = AsyncWrapper(async (req, res, next) => {
    const id = req.params.idCourse
    const course = await Course.findById(id)
    if (!course) {
        const error = appError.create("الكورس غير موجود", 404, FAIL)
        return next(error)
    }
    course.title = "newCourse"
    res.send(course)
})
const delCourse = AsyncWrapper(async (req, res, next) => {
    const id = req.params.idCourse;

    const course = await Course.findById(id);

    if (!course) {
        return next(appError.create("الكورس غير موجود", 404, FAIL));
    }

    await Lesson.deleteMany({ courseId: id });

    await Course.findByIdAndDelete(id);

    res.status(200).json({
        status: SUCCESS,
        message: "تم حذف الكورس بنجاح",
        data: {
            courseId: id
        }
    });
});

module.exports = { postCourse, getCourse, getSingleCourse, delCourse, updateCourse }