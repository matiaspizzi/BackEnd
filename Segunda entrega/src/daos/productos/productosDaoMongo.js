const ContenedorProductosMongo = require('../../contenedores/ContenedorProductosMongo.js')
const productoSchema = require('../../models/producto.model.js')
const config = require('../../config.js')

const productosApi = new ContenedorProductosMongo(config.mongo.collectionNameProductos, productoSchema)

module.exports = productosApi