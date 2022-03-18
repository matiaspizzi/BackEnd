const mongoose = require("mongoose");
class ContenedorMongo {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
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
      await this.collection(newElem).save();
      return await this.getAll();
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    try {
      let contenido = await this.collection.find();
      return contenido;
    } catch (error) {
      return error;
    }
  }

  async saveProd(prod, cartId) {
    try {
      if (prod) {
        await this.collection.findOneAndUpdate(
          { id: cartId },
          { $push: { productos: prod } }
        );
        return await this.getById(cartId)
      }
    } catch (error) {
      return error;
    }
  }

  async deleteProd(prod, cartId) {
    try {
      const cart = await this.getById(cartId)
      const index = cart.productos.findIndex(e => e.id == prod.id)
      if (index == -1) {
        return { error: `producto ${prod.id} no encontrado` }
      } else {
        await this.collection.updateOne(
          { id: cartId },
          [
            {
              $set: {
                productos: {
                  $let: {
                    vars: { ix: { $indexOfArray: ["$productos", prod] } },
                    in: {
                      $cond: [{ $eq: ["$$ix", 0] }, {
                        $concatArrays: [
                          { $slice: ["$productos", "$$ix"] },
                          { $slice: ["$productos", { $add: [1, "$$ix"] }, { $size: "$productos" }] }
                        ]
                      },
                      {
                        $concatArrays: [
                          { $slice: ["$productos", 0, "$$ix"] },
                          { $slice: ["$productos", { $add: [1, "$$ix"] }, { $size: "$productos" }] }
                        ]
                      }
                      ]
                    }
                  }
                }
              }
            }
          ])
        return await this.getById(cartId)
      }
    } catch (error) {
      return error
    }
  }

  async getById(id) {
    try {
      let elem = await this.collection.find({ id: id });
      if (elem[0]) {
        return elem[0]
      }
      else return { error: `carrito ${id} no encontrado` }
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const cart = await this.getById(id)
      if (cart.id) {
        await this.collection.deleteOne(cart);
        return await this.getAll()
      } else {
        return { error: `carrito ${id} no encontrado` }
      }
    } catch (error) {
      return error;
    }
  }
}

module.exports = ContenedorMongo;
