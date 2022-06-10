const { faker } = require('@faker-js/faker');
faker.locale = 'es'

const getProducto = () => {
    const newProduct = {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.image()
    }
    return newProduct
}

module.exports = { getProducto }
