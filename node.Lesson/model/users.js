const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    number: {
        type: Number,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    level: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    token:{
        type: String,
    },
    role:{
        type: String,
        enum:["USER","ADMIN"],
        default: "USER"
    },
});

module.exports = mongoose.model('User', userSchema);