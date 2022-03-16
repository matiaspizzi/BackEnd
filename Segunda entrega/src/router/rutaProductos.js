const express = require("express")
const router = express.Router()

const productosApi = require('../daos/productos/productosDaoFS.js')
const auth = require('../middlewares/auth.js')

router.get('/:id?', async (req, res) => {
    const id = req.params.id
    if(!id){
        res.send(await productosApi.getAll())
    } else {
        res.send(await productosApi.getById(id))
    }
});

router.post('/', auth.isAuthorized, async (req, res) => {
    const prod = {
        title: req.body.title,
        price: req.body.price, 
        thumbnail: req.body.thumbnail, 
        id: req.body.id
    }
    await productosApi.save(prod)
    res.send(await productosApi.getAll())
});

router.put('/:id', auth.isAuthorized, async (req, res) => {
    const prod = {}
    if(req.body.title) {prod.title = req.body.title}
    if(req.body.price) {prod.price = req.body.price}
    if(req.body.thumbnail) {prod.thumbnail = req.body.thumbnail}
    res.send(await productosApi.update(prod, req.params.id))
});

router.delete('/:id', auth.isAuthorized, async (req, res) => {
    res.send(await productosApi.deleteById(req.params.id))
});

module.exports = router