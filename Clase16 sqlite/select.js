const {options} = require('./options/SQLite3.js')
const knex = require('knex')(options)

knex.from('cars').select('*')
.then((rows) => {
    console.log(rows)
}).catch((err) => {
    console.log(err)
    throw err
}).finally(() =>{
    knex.destroy()
})