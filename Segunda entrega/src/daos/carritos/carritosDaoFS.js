const ContenedorCarritosFS = require('../../contenedores/ContenedorCarritoFS.js')
const config = require('../../config.js')

const carritosApi = new ContenedorCarritosFS(config)

module.exports = carritosApi