const mongoose = require("mongoose");
const mensajeSchema = require("../../models/mensaje.models");
const config = require("../../../config");
const IDao = require('../IDao')
const logger = require('../../../utils/logger.utils')

let messageMongoInstance = null;

class MensajesMongoDAO extends IDao {
    constructor() {
        super()
        this.collection = mongoose.model(config.mongo.collectionMessages, mensajeSchema);
    }

    static getInstance() {
        if (!messageMongoInstance) {
            messageMongoInstance = new MensajesMongoDAO()
        }
        return messageMongoInstance;
    }

    async save(elem) {
        try {
            let elementos = await this.getAll()
            let newId;
            if (elementos.length == 0) {
                newId = 1;
            } else {
                newId = elementos[elementos.length - 1].id + 1;
            }
            const newElem = { ...elem, id: newId, fyh: new Date().toLocaleString() };
            const messm = await this.collection(newElem);
            await messm.save();
            return await this.getAll()
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async getAll() {
        try {
            let contenido = await this.collection.find();
            return contenido;
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async getById(id) {
        try {
            let elem = await this.collection.find({ id: id });
            if (elem[0]) {
                return elem[0]
            } else { return { error: `Producto ${id} no encontrado` } }
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async deleteById(id) {
        try {
            await this.collection.deleteOne({ id: id });
            return await this.getAll()
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async deleteAll() {
        try {
            await this.collection.deleteMany();
            return await this.getAll()
        } catch (error) {
            logger.error(error)
            return error;
        }
    }
}

module.exports = MensajesMongoDAO;