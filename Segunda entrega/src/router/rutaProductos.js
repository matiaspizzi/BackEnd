const express = require("express")
const router = express.Router()

const productosApi = require('../daos/productos/productosDaoMongo.js')
const auth = require('../middlewares/auth.js')

router.get('/:id?', (req, res) => {
    const id = req.params.id
    if(!id){
        res.send(productosApi.getAll())
    } else {
        res.send(productosApi.getById(id))
    }
});

router.post('/', auth.isAuthorized,  (req, res) => {
    const prod = {
        title: req.body.title,
        price: req.body.price, 
        thumbnail: req.body.thumbnail, 
        id: req.body.id
    }
    productosApi.save(prod)
    res.send(productosApi.getAll())
});

router.put('/:id', auth.isAuthorized, (req, res) => {
    const prod = {}
    if(req.body.title) {prod.title = req.body.title}
    if(req.body.price) {prod.price = req.body.price}
    if(req.body.thumbnail) {prod.thumbnail = req.body.thumbnail}
    res.send(productosApi.update(prod, req.params.id))
});

router.delete('/:id', auth.isAuthorized, (req, res) => {
    res.send(productosApi.deleteById(req.params.id))
});

module.exports = router