require('dotenv').config()
const mongoose = require('mongoose');
const mongodbUri = process.env.MONGODBURI;

(async function () {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB');

})().catch(err=>console.log(err));

module.exports = {
    Comment: require('./comments')
}