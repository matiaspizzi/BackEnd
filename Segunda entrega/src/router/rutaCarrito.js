const express = require("express")
const router = express.Router()

const carritosApi = require('../daos/carritos/carritosDaoMongo.js')
const productosApi = require('../daos/productos/productosDaoMongo.js')

router.post('/', (req, res) => {
    res.send(carritosApi.create())
});

router.delete('/:id', (req, res) => {
    carritosApi.deleteById(req.params.id)
    res.send(carritosApi.getAll())
});

router.get('/:id/productos', (req, res) => {
    cart = carritosApi.getById(req.params.id)
    if(cart.productos){
        res.send(cart.productos)
    } else {
        res.send(cart)
    }
});

router.post('/:id/productos/:id_prod', (req, res) => {
    const cartId = req.params.id
    const prod = productosApi.getById(req.params.id_prod)
    if(prod.id){
        const prods = carritosApi.saveProd(prod, cartId)
        res.send(prods)
    } else {
        res.send(prod)
    } 
})

router.delete('/:id/productos/:id_prod', (req, res) => {
    const cartId = req.params.id
    const prodId = req.params.id_prod
    const prods = carritosApi.deleteProd(prodId, cartId)
    res.send(prods)
});

module.exports = router