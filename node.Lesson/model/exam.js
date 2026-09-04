const mongoose = require("mongoose");

// SubSchema للسؤال
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String], // Array of strings
        required: true,
        validate: {
            validator: function (arr) {
                return arr.length >= 2; // لازم على الأقل اختيارين
            },
            message: "At least 2 options required",
        },
    },
    correct: {
        type: Number, // index بتاع الإجابة الصح
        required: true,
    },
});

// Schema الامتحان
const examSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            enum: ["سهل", "متوسط", "صعب"],
            default: "سهل",
        },
        questions: [questionSchema], // array من الأسئلة
    },
    {
        timestamps: true, // createdAt + updatedAt
    }
);

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;