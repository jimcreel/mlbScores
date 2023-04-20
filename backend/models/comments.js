const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: {type: String, require: true},
    comment: {type: String, require: true},
    countryId: {type: String, require: true}

});

module.exports = mongoose.model('Comment', commentSchema);