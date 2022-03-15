const express = require("express")
const router = express.Router()

const ContenedorCarrito = require('../contenedores/ContenedorCarrito.js')
const carritoApi = new ContenedorCarrito()

const ContenedorProductos = require('../contenedores/ContenedorProductos.js')
const productosApi = new ContenedorProductos()

router.post('/', (req, res) => {
    res.send(carritoApi.create())
});

router.delete('/:id', (req, res) => {
    carritoApi.deleteById(req.params.id)
    res.send(carritoApi.getAll())
});

router.get('/:id/productos', (req, res) => {
    cart = carritoApi.getById(req.params.id)
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
        const prods = carritoApi.save(prod, cartId)
        res.send(prods)
    } else {
        res.send(prod)
    } 
})

router.delete('/:id/productos/:id_prod', (req, res) => {
    const cartId = req.params.id
    const prodId = req.params.id_prod
    const prods = carritoApi.delete(prodId, cartId)
    res.send(prods)
});

module.exports = router