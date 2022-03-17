const ContenedorProductosFirebase = require('../../contenedores/ContenedorProductosFirebase.js')
const config = require('../../config.js')

const productosApi = new ContenedorProductosFirebase(config.firebase.collectionNameP)

module.exports = productosApi