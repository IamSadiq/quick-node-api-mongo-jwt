const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    password: String,
    verified: Boolean,
    createdAt: String
});

module.exports = mongoose.model('User', UserSchema);