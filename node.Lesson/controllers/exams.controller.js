const AsyncWrapper = require("../middleware/AsyncWrapper.js");
const Course = require("../model/course.js");
const { SUCCESS, FAIL } = require("../utils/httpStatusText.js");
const Lesson = require("../model/lessons.js");
const appError = require("../utils/appError.js");
const Exam = require("../model/exam.js");


const postExam = AsyncWrapper(async (req, res, next) => {
    const exam = new Exam(req.body);
    await exam.save();

    res.status(201).json({
        status: SUCCESS,
        message: "تم إضافة الاختبار بنجاح",
        data: { exam }
    });
});
const getExam = AsyncWrapper(async (req, res, next) => {
    const exams = await Exam.find()
    res.status(201).json({
        status: SUCCESS,
        data: { exams }
    });
});
const getSingleExam = AsyncWrapper(async (req, res, next) => {
    const id = req.params.idExam
    const exam = await Exam.findById(id)
    if (!exam) {
        const error = appError.create("الاختبار غير موجود", 404, FAIL)
        return next(error)
    }
    res.status(201).json({
        status: SUCCESS,
        data: { exam }
    });
});
const deleteExam = AsyncWrapper(async (req, res, next) => {
    const id = req.params.idExam
    const exam = await Exam.findByIdAndDelete(id)
    if (!exam) {
        const error = appError.create("الاختبار غير موجود", 404, FAIL)
        return next(error)
    }
    res.status(201).json({
        status: SUCCESS,
        message: "تم حذف الاختبار بنجاح",
        data: { exam }
    });
});

module.exports = { postExam, getExam, getSingleExam, deleteExam }