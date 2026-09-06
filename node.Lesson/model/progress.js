
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        lessonId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        duration: {
            type: Number,
            default: 0,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        quizScore: {
            type: [Number],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

progressSchema.index(
    { userId: 1, lessonId: 1 },
    { unique: true }
);
module.exports = mongoose.model("Progress", progressSchema);