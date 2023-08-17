const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true, minlength: 6},
    favTeams: {type: Array}
});

module.exports = mongoose.model('User', userSchema);