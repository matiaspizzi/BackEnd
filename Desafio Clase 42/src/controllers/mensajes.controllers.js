const mensajesServices = require('../services/mensajes.services')
const logger = require('../utils/logger.utils.js')

const getAll = async (req, res, next) => {
    try {
        const message = await mensajesServices.getAll()
        // res.status(200).json({
        //     data: message
        // })
        return message
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const save = async (mensaje, req, res, next) => {
    try {
        const message = await mensajesServices.save(mensaje || req.body)
        // res.status(201).json({
        //     msg: 'message successfully added',
        //     data: message
        // })
        return message
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const getById = async (req, res, next) => {
    try {
        const message = await mensajesServices.getById(req.params.id)
        // res.status(200).json({
        //     data: message
        // })
        return message
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const deleteById = async (req, res, next) => {
    try {
        await mensajesServices.deleteById(req.params.id)
        // res.status(200).json({
        //     msg: 'message successfully deleted'
        // })
        return message
    } catch (error) {
        logger.error(error)
        throw error
    }  
}

const deleteAll = async (req, res, next) => {
    try {
        await mensajesServices.deleteAll()
        // res.status(200).json({
        //     msg: 'All messages successfully deleted'
        // })
        return message
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
    deleteAll
}