const { Schema } = require('mongoose');

const mensajeSchema = new Schema(
    {
        texto: { type: String, required: true },
        autor: { type: Object, required: true },
        fyh: { type: String, required: true },
        id: { type: Number, required: true, unique: true }
    },
    {
        timestamps: true
    }
)

module.exports = mensajeSchema
