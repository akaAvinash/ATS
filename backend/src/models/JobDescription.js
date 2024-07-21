// src/models/JobDescription.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobDescriptionSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('JobDescription', JobDescriptionSchema);
