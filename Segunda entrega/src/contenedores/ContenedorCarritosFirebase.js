var firebase = require("firebase-admin");
class ContenedorFirebase {
    constructor(collection) {
        this.collection = firebase.firestore().collection(collection)
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
            const newElem = { productos: [], timestamp: Date.now(), id: newId };
            await this.collection.doc(`${newId}`).set(newElem);
            return await this.getAll();
        } catch (error) {
            return error;
        }
    }

    async getAll() {
        try {
            const result = [];
            const snapshot = await this.collection.get();
            snapshot.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() });
            });
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async saveProd(prod, cartId) {
        try {
            const cart = await this.getById(cartId)
            cart.productos.push(prod)
            const newCart = { ...cart, timestamp: Date.now() }
            await this.collection.doc(cartId).update(newCart)
            return await this.getById(cartId)
        } catch (error) {
            return error;
        }
    }

    async deleteProd(prod, cartId) {
        try {
            const cart = await this.getById(cartId)
            if (cart.id) {
                const prodIndex = cart.productos.findIndex(p => p.id === prod.id)
                if (prodIndex !== -1) {
                    cart.productos.splice(prodIndex, 1)
                    const newCart = { ...cart, timestamp: Date.now() }
                    await this.collection.doc(cartId).update(newCart)
                    return await this.getById(cartId)
                } else {
                    return { error: `Producto ${prod.id} no encontrado` }
                }
            } else return cart
        } catch (error) {
            return error;
        }
    }

    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get();
            const data = doc.data();
            if (data) return data
            else return { error: `carrito ${id} no encontrado` }
        } catch (error) {
            return error;
        }
    }

    async deleteById(id) {
        try {
            const data = await this.getById(id)
            if (data.id) {
                await this.collection.doc(id).delete()
                return await this.getAll();
            } else return data
        } catch (error) {
            return error;
        }
    }
}

module.exports = ContenedorFirebase