const ContenedorCarritosFirebase = require('../../contenedores/ContenedorCarritosFirebase.js')
const config = require('../../config.js')

const carritosApi = new ContenedorCarritosFirebase(config.firebase.collectionNameCarritos)

module.exports = carritosApi