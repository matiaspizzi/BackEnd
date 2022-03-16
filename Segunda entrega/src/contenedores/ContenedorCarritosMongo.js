const mongoose = require("mongoose");
const config = require("../config.js");

mongoose.connect(config.mongo.url, config.mongo.options);

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
      await new this.collection(newElem).save();
      return this.getAll();
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
      return await this.collection.findOneAndUpdate(
        { id: cartId },
        { $push: { productos: prod } }
      );
    } catch (error) {
      return error;
    }
  }

  async deleteProd(prod, cartId) {
    try {
      return await this.collection.updateOne(
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
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  async getById(id) {
    try {
      let elem = await this.collection.find({ id: id });
      if (elem) return elem;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      await this.collection.deleteOne({ id: id });
      return this.getAll();
    } catch (error) {
      return error;
    }
  }
}

module.exports = ContenedorMongo;
