const config = require('../config')
const ProductosDAO = require('../persistencia/dao/productos.factory').getPersistencia(config.persistencia)

const getAll = async () => {
    const products = await ProductosDAO.getAll()
    return products
}

const getById = async (id) => {
    const product = await ProductosDAO.getById(id)
    return product
}

const save = async (product) => {
    const newProduct = await ProductosDAO.save(product)
    return newProduct
}

const update = async (product, id) => {
    const updated = await ProductosDAO.update(product, id)
    return updated
}

const deleteById = async (id) => {
    return await ProductosDAO.deleteById(id)
}

const deleteAll = async () => {
    return await ProductosDAO.deleteAll()
}

module.exports = {
    getAll,
    getById,
    save,
    update,
    deleteById,
    deleteAll
}