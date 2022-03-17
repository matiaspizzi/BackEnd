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
            const newCart = {...cart, timestamp: Date.now() }
            await this.collection.doc(cartId).update(newCart)
            return await this.getById(cartId)
        } catch (error) {
            return error;
        }
    }

    async deleteProd(prod, cartId) {
        try {
            const cart = await this.getById(cartId)
            const prodIndex = cart.productos.findIndex(p => p.id === prod.id)
            if(prodIndex !== -1){
                cart.productos.splice(prodIndex, 1)
                const newCart = {...cart, timestamp: Date.now() }
                await this.collection.doc(cartId).update(newCart)
                return await this.getById(cartId)
            } else {
                return {error: `Producto id:${prod.id} no encontrado`}
            }
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get();
            const data = doc.data();
            return data
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async deleteById(id) {
        try {
            await this.collection.doc(id).delete();
            return await this.getAll();
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = ContenedorFirebase