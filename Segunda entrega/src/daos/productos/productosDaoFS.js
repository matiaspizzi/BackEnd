const ContenedorProductosFS = require('../../contenedores/ContenedorProductosFS.js')
const config = require('../../config.js')

const productosApi = new ContenedorProductosFS(config.fileSystem.productosPath)

module.exports = productosApi