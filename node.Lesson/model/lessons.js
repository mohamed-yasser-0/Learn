const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  idCours: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  videoUrl: {
    type: String,
    required: true
  },
  duration: {
    type: Number
  },

  summaryPoints: [
    {
      type: String
    }
  ],

  quiz: {
    questions: [
      {
        text: {
          type: String
        },
        options: [
          {
            type: String
          }
        ],
        correct: {
          type: Number
        }
      }
    ]
  }

});

module.exports = mongoose.model('Lesson', lessonSchema);