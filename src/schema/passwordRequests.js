const mongoose = require('mongoose');
const { Schema } = mongoose;

const PasswordChanges = new Schema({
    hash: { required: true, type: String, unique: true },
    active: { required: true, type: Boolean, default: true },
});

module.exports = PasswordChanges;