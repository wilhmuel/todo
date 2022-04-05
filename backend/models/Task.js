const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: String,
    status: String
});

module.exports = mongoose.model('Tasks', TaskSchema);