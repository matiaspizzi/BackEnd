
const ProductosController = require('../controllers/productos.controllers.js')

async function getProductos () {
    return await ProductosController.getAll()
}

async function getProducto ({id}) {
    return await ProductosController.getById(id)
}

async function saveProducto ({datos}) {
    return await ProductosController.save(datos)
}

async function updateProducto ({id, datos}) {
    return await ProductosController.update(datos, id)
}

async function deleteProducto ({id}) {
    return await ProductosController.deleteById(id)
}

module.exports = { getProductos, getProducto, saveProducto, updateProducto, deleteProducto }
