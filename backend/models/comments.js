const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: {type: String, require: true},
    comment: {type: String, require: true},
    gameId: {type: String, require: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

module.exports = mongoose.model('Comment', commentSchema);