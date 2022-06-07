const mongoose = require("mongoose");
const productoSchema = require("../../models/producto.models");
const config = require("../../../config");
const logger = require("../../../utils/logger.utils");
const IDao = require('../IDao')

let productMongoInstance = null;

class ProductosMongoDAO extends IDao {
    constructor() {
        super()
        this.collection = mongoose.model(config.mongo.collectionProducts, productoSchema);
    }

    static getInstance() {
        if (!productMongoInstance) {
            productMongoInstance = new ProductosMongoDAO()
        }
        return productMongoInstance;
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
            const newElem = { ...elem, id: newId };
            const prodm = await this.collection(newElem);
            await prodm.save();
            return await this.getAll()
        } catch (error) {
            logger.error(err)
            return error;
        }
    }

    async getAll() {
        try {
            let contenido = await this.collection.find();
            return contenido;
        } catch (error) {
            logger.error(err)
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
            logger.error(err)
            return error;
        }
    }

    async update(elem, id) {
        try {
            await this.collection.updateOne({ id: id }, elem)
            return await this.getById(id);
        } catch (error) {
            logger.error(err)
            return error;
        }
    }

    async deleteById(id) {
        try {
            await this.collection.deleteOne({ id: id });
            return await this.getAll()
        } catch (error) {
            logger.error(err)
            return error;
        }
    }

    async deleteAll() {
        try {
            await this.collection.deleteMany();
            return await this.getAll()
        } catch (error) {
            logger.error(err)
            return error;
        }
    }
}

module.exports = ProductosMongoDAO;