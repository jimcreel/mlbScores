const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true, minlength: 6},
    favTeams: {type: Array, require: true}
});

module.exports = mongoose.model('User', userSchema);