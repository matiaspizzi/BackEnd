const fs = require('fs')
const config = require('../config')

class ContenedorCarrito {
    constructor() {
        this.ruta = config.fileSystem.carritosPath
    }

    create() {
        const carts = this.getAll()
        let newId
        if (carts.length == 0) {
            newId = 1
        } else {
            newId = carts[carts.length - 1].id + 1
        }
        const newCart = {
            productos: [],
            timestamp: Date.now(),
            id: newId
        }
        carts.push(newCart)
        fs.writeFileSync(this.ruta, JSON.stringify(carts, null, 2))
        return newCart
    }

    getAll() {
        try {
            const carts = fs.readFileSync(this.ruta, 'utf-8')
            return JSON.parse(carts)
        }
        catch (err) {
            return []
        }
    }

    saveProd(elem, id) {
        const carts = this.getAll()
        const index = carts.findIndex(c => c.id == id)
        if (index !== -1) {
            carts[index].productos.push(elem)
            fs.writeFileSync(this.ruta, JSON.stringify(carts, null, 2))
            return carts[index].productos
        } else {
            return { error: `carrito no encontrado` }
        }
    }

    getById(id) {
        const carts = this.getAll()
        const found = carts.find(cart => cart.id == id)
        return found || { error: `carrito no encontrado` }
    }

    deleteProd(prod, cartId) {
        const carts = this.getAll()
        const cartIndex = carts.findIndex(c => c.id == cartId)

        if (cartIndex !== -1) {

            const prodIndex = carts[cartIndex].productos.findIndex(p => p.id == prod.id)

            if (prodIndex !== -1){

                carts[cartIndex].productos.splice(prodIndex, 1)
                fs.writeFileSync(this.ruta, JSON.stringify(carts, null, 2))
                return carts[cartIndex].productos
            } else {
                return { error: `elemento no encontrado` }
            }
        } else {
            return { error: `carrito no encontrado` }
        }
    }

    deleteById(id) {
        const carts = this.getAll()
        const index = carts.findIndex(cart => cart.id == id)
        if (index !== -1) {
            carts.splice(index, 1)
            fs.writeFileSync(this.ruta, JSON.stringify(carts, null, 2))
            return carts
        } else {
            return { error: `elemento no encontrado` }
        }
    }
}

module.exports = ContenedorCarrito