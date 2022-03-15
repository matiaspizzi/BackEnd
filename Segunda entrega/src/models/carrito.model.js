const { Schema } = require('mongoose');

const carritoSchema = new Schema({
    productos: {type: Array, required: true},
    timestamp: {type: String, required: true},
    id: {type: Number, required: true, unique: true}
})

module.exports = carritoSchema