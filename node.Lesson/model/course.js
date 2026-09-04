
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },

    description: {
        type: String,
        required: true,
    },

    cat: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    imgeCourse:{
        type: String,
        required: true
    }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
