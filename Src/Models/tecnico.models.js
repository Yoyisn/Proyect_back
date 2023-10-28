const mongoose = require('mongoose');

const tecnicoSchema = new mongoose.Schema({
    client: {
        type: String,
        default: 'Tecnico',
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Tecnico', tecnicoSchema);