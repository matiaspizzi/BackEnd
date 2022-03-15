const ContenedorMongo = require('../../contenedores/ContenedorMongo.js')
const productoSchema = require('../../models/producto.model.js')

const productosApi = new ContenedorMongo('productos', productoSchema)

module.exports = productosApi