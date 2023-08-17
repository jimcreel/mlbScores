const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: {type: String},
    comment: {type: String, required: true},
    gameId: {type: String, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

module.exports = mongoose.model('Comment', commentSchema);