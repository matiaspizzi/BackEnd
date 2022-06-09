const express = require("express")
const router = express.Router()

const ProductosController = require('../../controllers/productos.controllers.js')

router.get('/:id?', async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.send(await ProductosController.getAll())
    } else {
        res.send(await ProductosController.getById(id))
    }
});

router.post('/', async (req, res) => {
    const prod = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
    }
    await ProductosController.save(prod)
    res.send(await ProductosController.getAll())
});

router.put('/:id', async (req, res) => {
    const prod = {}
    if (req.body.title) { prod.title = req.body.title }
    if (req.body.price) { prod.price = req.body.price }
    if (req.body.thumbnail) { prod.thumbnail = req.body.thumbnail }
    res.send(await ProductosController.update(prod, req.params.id))
});

router.delete('/:id', async (req, res) => {
    res.send(await ProductosController.deleteById(req.params.id))
});

module.exports = router