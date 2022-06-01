var firebase = require("firebase-admin")
const logger = require('../../utils/logger.utils.js')
const MensajesDao = require('../dao/Mensajes.dao.js')
const MensajesDto = require('../dto/Mensajes.dto.js')

class ContenedorMsjs extends MensajesDao{
    constructor() {
        super()
        this.collection = firebase.firestore().collection('mensajes')
    }

    async getAll() {
        try {
            const result = [];
            const snapshot = await this.collection.get();
            snapshot.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() });
            });
            return result;
        } catch (err) {
            logger.error(err)
            throw err;
        }
    }
    
    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get();
            const data = doc.data();
            if (data) return data
            else return { error: `mensaje ${id} no encontrado` }
        } catch (err) {
            logger.error(err)
            throw err;
        }
    }
    
    async save(elem) {
        try {
            let elems = await this.getAll()
            let newId;
            if (elems.length == 0) {
                newId = 1;
            } else {
                newId = elems[elems.length - 1].id + 1;
            }
            const newElem = new MensajesDto(elem, newId);
            await this.collection.doc(`${newId}`).set(newElem);
            return await this.getAll()
        } catch (err) {
            logger.error(err)
            throw err;
        }
    }
    

    async deleteById(id) {
        try {
            const data = await this.getById(id)
            if (data.id) {
                await this.collection.doc(id).delete()
                return await this.getAll();
            } else return data
        } catch (err) {
            logger.error(err)
            throw err;
        }
    }

    async deleteAll() {
        try {
            const snapshot = await this.collection.get();
            snapshot.forEach((doc) => {
                this.collection.doc(doc.id).delete()
            });
            return await this.getAll();
        } catch (err) {
            logger.error(err)
            throw err;
        }
    }
}

module.exports = ContenedorMsjs