const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // الطالب
    required: true
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true
  },
  degree: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;