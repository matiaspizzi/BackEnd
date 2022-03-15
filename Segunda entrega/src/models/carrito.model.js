const { Schema, model } = require('mongoose');

const carritoSchema = new Schema({
    productos: {type: Array, required: true},
    timestamp: {type: String, required: true},
    id: {type: Number, required: true, unique: true}
})

const carritoModel = model('carritos', carritoSchema)

module.exports = carritoModel