const { Schema } = require('mongoose');

const productoSchema = new Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        id: { type: Number, required: true, unique: true }
    },
    {
        timestamps: true
    }
)

module.exports = productoSchema