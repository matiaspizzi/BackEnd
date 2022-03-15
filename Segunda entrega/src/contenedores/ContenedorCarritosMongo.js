const mongoose = require("mongoose");
const config = require("../config.js");

mongoose.connect(config.mongo.url, config.mongo.options);

class ContenedorMongo {
  constructor(coll, schema) {
    this.coleccion = mongoose.model(coll, schema);
  }

  async create() {
    try {
      const carritos = await this.getAll();
      let newId = 0
      if (carritos.length == 0) {
        newId = 1;
      } else {
        newId = carritos[carritos.length - 1].id + 1;
      }
      const newElem = { productos: [], timestamp: Date.now(), id: newId };
      const elem = new this.coleccion(newElem);
      await elem.save();
      return this.getAll();
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

  async saveProd(prod, cartId) {
    try {
      const cart = await this.getById(cartId);
      console.log(cart)
      if (cart) {
        const newCart = cart.productos.push(prod);
        return await this.coleccion.findOneAndUpdate({ id: cartId }, newCart, {
          new: true,
        });
      }
    } catch (error) {
      return error;
    }
  }

  async deleteProd(prodId, cartId) {
    try {
      const cart = await this.getById(cartId);
      if (cart) {
        const index = cart.productos.findIndex((prod) => prod.id == prodId);
        if (index = !-1) {
          const newCart = cart.productos.splice(index, 1);
          return await this.coleccion.findOneAndUpdate(
            { id: cartId },
            newCart,
            { new: true }
          );
        }
      } else {
        return { error: `carrito no encontrado` };
      }
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
      return this.getAll();
    } catch (error) {
      return error;
    }
  }
}

module.exports = ContenedorMongo;
