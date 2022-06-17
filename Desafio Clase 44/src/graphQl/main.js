const crypto = require('crypto');

class Producto {
    constructor(id, {nombre, precio, thumbnail}) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.thumbnail = thumbnail;
    }
}

const productosMap = {}

function getProductos () {
    const productos = Object.values(productosMap);
    return productos
}

function getProducto ({id}) {
    if(!productosMap[id]) throw new Error(`Producto ${id} no encontrado`)
    return productosMap[id]
}

function saveProducto ({datos}) {
    const id = crypto.randomBytes(10).toString('hex');
    const producto = new Producto(id, datos);
    productosMap[id] = producto;
    return producto;
}

function updateProducto ({id, datos}) {
    if(!productosMap[id]) throw new Error(`Producto ${id} no encontrado`)
    const producto = new Producto(id, datos);
    productosMap[id] = producto;
    return producto;
}

function deleteProducto ({id}) {
    if(!productosMap[id]) throw new Error(`Producto ${id} no encontrado`)
    delete productosMap[id];
    return {id}
}

module.exports = { getProductos, getProducto, saveProducto, updateProducto, deleteProducto }
