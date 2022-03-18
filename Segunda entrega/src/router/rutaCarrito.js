const express = require("express");
const router = express.Router();

const configDB = require("../config");

let productosApi;
let carritosApi;

switch (configDB.DB) {
    case 'mongo':
        productosApi = require("../daos/productos/productosDaoMongo.js");
        carritosApi = require("../daos/carritos/carritosDaoMongo.js");
        break;
    case 'firebase':
        productosApi = require("../daos/productos/productosDaoFirebase.js");
        carritosApi = require("../daos/carritos/carritosDaoFirebase.js");
        break;
    case 'fs':
        productosApi = require("../daos/productos/productosDaoFS.js");
        carritosApi = require("../daos/carritos/carritosDaoFS.js");
}

router.post('/', async (req, res) => {
    res.send(await carritosApi.create());
});

router.delete('/:id', async (req, res) => {
    res.send(await carritosApi.deleteById(req.params.id));
});

router.get('/:id/productos', async (req, res) => {
    cart = await carritosApi.getById(req.params.id);
    if (cart.id) {
        res.send(cart.productos);
    } else {
        res.send({ error: `carrito id:${req.params.id} no encontrado` });
    }
});

router.post('/:id/productos/:id_prod', async (req, res) => {
    const cartId = req.params.id;
    const prod = await productosApi.getById(req.params.id_prod);
    if (prod.id) {
        res.send(await carritosApi.saveProd(prod, cartId));
    } else {
        res.send(prod);
    }
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
    const cartId = req.params.id;
    const prodId = req.params.id_prod;
    const prod = await productosApi.getById(prodId);
    if (prod.id) {
        res.send(await carritosApi.deleteProd(prod, cartId));
    } else {
        res.send(prod);
    }

});

module.exports = router;
