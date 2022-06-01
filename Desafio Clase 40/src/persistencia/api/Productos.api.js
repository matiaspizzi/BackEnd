const ContenedorProd = require('../contenedores/Productos.contenedores.js')

class ProductosApi {
    constructor() {
        this.productosDao = new ContenedorProd()
    }

    async getAll() {
        return await this.productosDao.getAll()
    }

    async getById(id) {
        return await this.productosDao.getById(id)
    }

    async save(producto) {
        return await this.productosDao.save(producto)
    }

    async deleteById(id) {
        return await this.productosDao.deleteById(id)
    }

    async deleteAll() {
        return await this.productosDao.deleteAll()
    }
}

module.exports = ProductosApi;