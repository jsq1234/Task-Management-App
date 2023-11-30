const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: [String]
    },
    priority: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        required: true,
    }},
    { timestamps : true }
);

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;

