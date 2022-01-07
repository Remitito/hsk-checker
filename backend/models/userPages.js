const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserPageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    hsk1: {
        type: Number,
        required: true
    },
    hsk2: {
        type: Number,
        required: true
    },
    hsk3: {
        type: Number,
        required: true
    },
    hsk4: {
        type: Number,
        required: true
    },
    hsk5: {
        type: Number,
        required: true
    },
    hsk6: {
        type: Number,
        required: true
    }
})

module.exports = UserPage = mongoose.model('UserPage', UserPageSchema);