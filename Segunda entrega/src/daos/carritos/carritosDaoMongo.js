const ContenedorCarritosMongo = require('../../contenedores/ContenedorCarritosMongo.js')
const carritoSchema = require('../../models/carrito.model.js')

const carritosApi = new ContenedorCarritosMongo('carritos', carritoSchema)

module.exports = carritosApi