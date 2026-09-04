const AsyncWrapper = require("../middleware/AsyncWrapper.js");
const Course = require("../model/course.js");
const Lesson = require("../model/lessons.js");
const appError = require("../utils/appError.js");
const { SUCCESS, FAIL } = require("../utils/httpStatusText.js");

const postLessons = AsyncWrapper(async (req, res, next) => {
    const id = req.params.idCourse;
    const course = await Course.findById(id);
    if (!course) {
        return next(appError.create("الكورس غير موجود", 404, FAIL));
    }
    const lesson = new Lesson({
        ...req.body,
        idCours: id
    });

    await lesson.save();

    res.status(201).json({
        status: SUCCESS,
        message: "تم إضافة الدرس بنجاح",
        data: { lesson }
    });
});
const getLessons = AsyncWrapper(async (req, res, next) => {
    const id = req.params.idCourse
    const course = await Course.findById(id)
    if (!course) {
        const error = appError.create("الكورس غير موجود", 404, FAIL)
        return next(error)
    }
    const lessons = await Lesson.find({ idCours: id })
    res.send({
        "status": SUCCESS,
        "data": {
            lessons
        }
    })
})
const getSingleLesson = AsyncWrapper(async (req, res, next) => {

    const idLesso = req.params.idLesson
    const lesson = await Lesson.findById(idLesso)
    if (!lesson) {
        const error = appError.create("الدرس غير موجود", 404, FAIL)
        return next(error)
    }

    res.send({
        "status": SUCCESS,
        "data": {
            lesson
        }
    })
})
const deleteleLesson = AsyncWrapper(async (req, res, next) => {

    const idLesso = req.params.idLesson
    const lesson = await Lesson.findByIdAndDelete(idLesso)
    if (!lesson) {
        const error = appError.create("الدرس غير موجود", 404, FAIL)
        return next(error)
    }

    res.send({
        "status": SUCCESS,
        "data": {
            lesson
        }
    })
})
module.exports = { postLessons, getSingleLesson, getLessons, deleteleLesson }