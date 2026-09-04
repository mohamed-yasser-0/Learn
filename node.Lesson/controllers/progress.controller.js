const AsyncWrapper = require("../middleware/AsyncWrapper.js");
const Course = require("../model/course.js");
const Lesson = require("../model/lessons.js");
const Progress = require("../model/progress.js");
const appError = require("../utils/appError.js");
const { SUCCESS, FAIL } = require("../utils/httpStatusText.js");

const postProgress = AsyncWrapper(async (req, res, next) => {
    const id = req.params.idLesson;

    const lesson = await Lesson.findById(id);

    if (!lesson) {
        return next(appError.create("الدرس غير موجود", 404, FAIL));
    }

    const existingProgress = await Progress.findOne({
        userId: req.user.id,
        lessonId: id
    });

    if (existingProgress) {
        return next(appError.create("تم تسجيل هذا الدرس مسبقاً", 400, FAIL));
    }

    const progress = new Progress({
        ...req.body,
        lessonId: id,
        userId: req.user.id,
        courseId: lesson.idCours
    });

    await progress.save();

    res.status(201).json({
        status: SUCCESS,
        message: "تم تسجيل التقدم بنجاح",
        data: { progress }
    });
});
const getProgress = AsyncWrapper(async (req, res, next) => {

    const progress = await Progress.find({ userId: req.user.id });

    if (!progress || progress.length === 0) {
        const error = appError.create("No progress found", 404, FAIL);
        return next(error);
    }

    res.send({
        status: SUCCESS,
        data: progress
    });
});
module.exports = { postProgress, getProgress }