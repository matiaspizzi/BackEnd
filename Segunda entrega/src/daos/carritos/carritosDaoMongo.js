const ContenedorCarritosMongo = require('../../contenedores/ContenedorCarritosMongo.js')
const carritoSchema = require('../../models/carrito.model.js')
const config = require('../../config.js')

const carritosApi = new ContenedorCarritosMongo(config.mongo.collectionNameCarritos, carritoSchema)

module.exports = carritosApi