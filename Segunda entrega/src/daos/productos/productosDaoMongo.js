const ContenedorProductosMongo = require('../../contenedores/ContenedorProductosMongo.js')
const productoSchema = require('../../models/producto.model.js')

const productosApi = new ContenedorProductosMongo('productos', productoSchema)

module.exports = productosApi