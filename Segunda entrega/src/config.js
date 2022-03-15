const config = {
    fileSystem: {
        carritosPath: 'src/data/carritos.json',
        productosPath: 'src/data/productos.json'
    },
    mongo: {
        url: 'mongodb+srv://matias:matias@cluster0.6y6tj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        options: {
            serverSelectionTimeoutMS: 5000
        }
    },
    firebase: {
    }
}

module.exports = config