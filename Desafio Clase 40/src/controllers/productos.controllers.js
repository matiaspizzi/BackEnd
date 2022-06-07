const productosServices = require('../services/productos.services')
const logger = require('../utils/logger.utils.js')

const getAll = async (req, res, next) => {
    try {
        const products = await productosServices.getAll()
        // res.status(200).json({
        //     data: products
        // })
        return products
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const save = async (req, res, next) => {
    try {
        const product = await productosServices.save(req.body)
        // res.status(201).json({
        //     msg: 'Product successfully added',
        //     data: product
        // })
        return product
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const getById = async (req, res, next) => {
    try {
        const product = await productosServices.getById(req.params.id)
        // res.status(200).json({
        //     data: product
        // })
        return product
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const update = async (req, res, next) => {
    try {
        const product = await productosServices.update(req.body, req.params.id)
        // res.status(200).json({
        //     msg: 'Product successfully updated',
        //     data: product
        // })
        return product
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const deleteById = async (req, res, next) => {
    try {
        await productosServices.deleteById(req.params.id)
        // res.status(200).json({
        //     msg: 'Product successfully deleted'
        // })
    } catch (error) {
        logger.error(error)
        throw error
    }  
}

const deleteAll = async (req, res, next) => {
    try {
        await productosServices.deleteAll()
        // res.status(200).json({
        //     msg: 'All products successfully deleted'
        // })
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