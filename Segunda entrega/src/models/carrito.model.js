const { Schema } = require('mongoose');

const carritoSchema = new Schema(
{
    productos: {type: Array, required: true}, 
    id: {type: Number, required: true, unique: true}
},
{
    timestamps: true
}
)

module.exports = carritoSchema