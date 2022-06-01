const { faker } = require('@faker-js/faker');
faker.locale = 'es'

function generarProductosFaker() {
 let products = []
 for (let i = 0; i < 5; i++) {
  const newProduct = {
   id: faker.datatype.uuid(),
   title: faker.commerce.product(),
   price: faker.commerce.price(),
   thumbnail: faker.image.image()
  }
  products.push(newProduct)
 }
 return products
}

module.exports = { generarProductosFaker };