const {options} = require('./options/SQLite3.js')
const knex = require('knex')(options)

const cars = [
    { name: "Ferrari", price: 200000 },
    { name: "Lamborghini", price: 400000 },
    { name: "Bugatti", price: 600000 },
    { name: "Porsche", price: 800000 },
    { name: "Mercedes", price: 1000000 },
    { name: "Audi", price: 1200000 },
    { name: "BMW", price: 1400000 },
    { name: "Volkswagen", price: 1600000 },
  ];
  
  knex('cars').insert(cars)
  .then(() => { console.log('data inserted') })
  .catch((err) => { console.log(err); throw err })
  .finally(() => {
      knex.destroy()
  })