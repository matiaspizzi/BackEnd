const productosServices = require('../services/productos.services')
const logger = require('../utils/logger.utils.js')

const getAll = async () => {
    try {
        const products = await productosServices.getAll()
        return products
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const save = async (producto) => {
    try {
        const product = await productosServices.save(producto)
        return product
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const getById = async (id) => {
    try {
        const product = await productosServices.getById(id)
        return product
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const update = async (producto, id) => {
    try {
        const product = await productosServices.update(producto, id)
        return product
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const deleteById = async (id) => {
    try {
        await productosServices.deleteById(id)
    } catch (error) {
        logger.error(error)
        throw error
    }  
}

const deleteAll = async () => {
    try {
        await productosServices.deleteAll()
    } catch (error) {
        logger.error(error)
        throw error
    }
}

module.exports = {
    getAll,
    getById,
    save,
    deleteById,
    deleteAll,
    update
}