const {options} = require('./options/SQLite3.js')
const knex = require('knex')(options)

knex.schema.createTable('cars', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.integer('price')
}).then(() => {
    console.log('table created')
}).catch((err) => {
    console.log(err)
    throw err
}).finally(() => {
    knex.destroy()
})


// knex('cars').del().then(() =>{ console.log('data deleted')})
// .catch((err) => console.log(err))
// .finally(() => {
//     knex.destroy()
// })