const ContenedorCarritosFS = require('../../contenedores/ContenedorCarritosFS.js')
const config = require('../../config.js')

const carritosApi = new ContenedorCarritosFS(config.fileSystem.carritosPath)

module.exports = carritosApi