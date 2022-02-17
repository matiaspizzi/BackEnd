const express = require("express")
const router = express.Router()

const ContenedorProductos = require('../contenedores/ContenedorProductos.js')
const productosApi = new ContenedorProductos()

router.get('/:id?', (req, res) => {
    const id = req.params.id
    if(!id){
        res.send(productosApi.getAll())
    } else {
        res.send(productosApi.getById(id))
    }
});

router.post('/', (req, res) => {
    const prod = {
        title: req.body.title,
        price: req.body.price, 
        thumbnail: req.body.thumbnail, 
    }
    productosApi.save(prod)
    res.send(productosApi.getAll())
});

router.put('/:id', (req, res) => {
    const prod = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    productosApi.update(prod, req.params.id)
    res.send(productosApi.getAll())
});

router.delete('/:id', (req, res) => {
    productosApi.deleteById(req.params.id)
    res.send(productosApi.getAll())
});

module.exports = router