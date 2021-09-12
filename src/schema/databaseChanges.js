const mongoose = require('mongoose');
const { Schema } = mongoose;

const DatabaseChanges = new Schema({
    userId: { type: Schema.Types.ObjectId, required: false, ref: 'users'},
    collectionName: { type: String, required: true },
    methodName: { type: String, required: true },
    previousData: { type: String, required: false },
    nextData: { type: String, required: false },
});

module.exports = DatabaseChanges;