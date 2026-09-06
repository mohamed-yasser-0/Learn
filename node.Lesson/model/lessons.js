const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },

  idCours: {
    type: String,
  },

  order: {
    type: Number,
  },

  type: {
    type: String,
    enum: ["video", "quiz"],
    required: true,
  },

  description: {
    type: String,
  },

  // خاص بالفيديو فقط
  videoUrl: {
    type: String,
    required: function () {
      return this.type === "video";
    },
  },

  duration: {
    type: Number,
  },

  summaryPoints: [
    {
      type: String,
    },
  ],

  // خاص بالكويز فقط
  quiz: {
    questions: [
      {
        question: {
          type: String,
          required: true,
        },

        options: {
          type: [String],
          required: true,
        },

        correctAnswer: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

module.exports = mongoose.model("Lesson", lessonSchema);