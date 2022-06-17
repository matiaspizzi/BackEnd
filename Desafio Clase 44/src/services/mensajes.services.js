const config = require('../config')
const MensajesDAO = require('../persistencia/dao/mensajes.factory').getPersistencia(config.persistencia)

const getAll = async () => {
    const messages = await MensajesDAO.getAll()
    return messages
}

const getById = async (id) => {
    const message = await MensajesDAO.getById(id)
    return message
}

const save = async (message) => {
    return await MensajesDAO.save(message)
}

const deleteById = async (id) => {
    return await MensajesDAO.deleteById(id)
}

const deleteAll = async () => {
    return await MensajesDAO.deleteAll()
}

module.exports = {
    getAll,
    getById,
    save,
    deleteById,
    deleteAll
}