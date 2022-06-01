const CustomError = require('../errores/CustomError.errores.js');

class ProductosDao {

    async getAll() {
        throw new CustomError (500, 'Falta implementar getAll')
    }

    async getById(id) {
        throw new CustomError (500, 'Falta implementar getById')
    }

    async save(producto) {
        throw new CustomError (500, 'Falta implementar add')
    }

    async deleteById(id) {
        throw new CustomError (500, 'Falta implementar deleteById')
    }

    async deleteAll() {
        throw new CustomError (500, 'Falta implementar deleteAll')
    }
}

module.exports = ProductosDao;