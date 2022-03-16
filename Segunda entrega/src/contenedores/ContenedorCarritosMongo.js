const mongoose = require("mongoose");
const config = require("../config.js");

mongoose.connect(config.mongo.url, config.mongo.options);

class ContenedorMongo {
  constructor(coll, schema) {
    this.coleccion = mongoose.model(coll, schema);
  }

  async create() {
    try {
      const carts = await this.getAll();
      let newId = 0;
      if (carts.length == 0) {
        newId = 1;
      } else {
        newId = carts[carts.length - 1].id + 1;
      }
      const newElem = { productos: [], id: newId };
      await new this.coleccion(newElem).save();
      return this.getAll();
    } catch (error) {
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

  async saveProd(prod, cartId) {
    try {
      return await this.coleccion.findOneAndUpdate(
        { id: cartId },
        { $push: { productos: prod } }
      );
    } catch (error) {
      return error;
    }
  }

  async deleteProd(prod, cartId) {
    try {
      return await this.coleccion.findOneAndUpdate(
        { id: cartId },
        { $pull: { productos: prod } })
    } catch (error) {
      console.log(error)
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
      return this.getAll();
    } catch (error) {
      return error;
    }
  }
}

module.exports = ContenedorMongo;
