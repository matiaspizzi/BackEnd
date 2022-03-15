const mongoose = require("mongoose");
const config = require("../config.js");

mongoose.connect(config.mongo.url, config.mongo.options);

class ContenedorMongo {
  constructor(coll, schema) {
    this.coleccion = mongoose.model(coll, schema);
  }

  async save(elem) {
    try {
      let elementos = this.getAll()
      let newId;
      if (elementos.length == 0) {
        newId = 1;
      } else {
        newId = elementos[elementos.length - 1].id + 1;
      }
      const newElem = { ...elem, timestamp: Date.now(), id: newId };
      const prodm = new this.coleccion(newElem);
      await prodm.save();
      return this.getAll()
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getAll() {
    try {
      let contenido = await this.coleccion.find();
      return contenido;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      let elem = await this.coleccion.find({ id: id });
      if (elem) return elem;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      await this.coleccion.deleteOne({ id: id });
      return this.getAll()
    } catch (error) {
      return error;
    }
  }

  async update(elem, id) {
    try {
      return await this.coleccion.findOneAndUpdate({ id: id }, elem, {new: true});
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteAll() {
    try {
      await this.coleccion.deleteMany();
      return this.getAll()
    } catch (error) {
      return error;
    }
  }
}

module.exports = ContenedorMongo;
