const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false, default: '' },
    instagram: { type: String, required: false, unique: true },
    email: { type: String, required: false, unique: true },
    phone: { type: String, required: false, unique: true },
    pix: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    creationDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
});

module.exports = UserSchema;