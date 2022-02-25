const {options} = require('../src/options/SQLite3')
const knex = require('knex')(options)

class ContenedorProd {
    constructor(tabla) {
        this.tabla = tabla

        knex.schema.createTable(`${this.tabla}`, table => {
            table.increments('id').primary().notNullable()
            table.string('title').notNullable()
            table.integer('price').notNullable()
            table.string('thumbnail').notNullable()
        }).then(() => {
            console.log('table created')
        }).catch((err) => {
            console.log(err)
            throw err
        }).finally(() => {
            knex.destroy()
        })
    }

    getById(id) {
        knex.from(`${this.tabla}`).where({ id: id }).select()
        .then((elem) => {
            console.log(`${elem}`)
        }).catch((err) => {
            console.log(err)
            throw err
        }).finally(() =>{
            knex.destroy()
        }) 
    }

    getAll() {
        knex.from(`${this.tabla}`).select("*")
        .then((rows) => {
            for (row of rows){ console.log(`${row['id']} ${row['name']} ${row['price']}`) }
        }).catch((err) => {
            console.log(err)
            throw err
        }).finally(() =>{
            knex.destroy()
        }) 
    }

    save(elem) {
        knex(`${this.tabla}`).insert(obj)
        .then(() => { console.log('data inserted') })
        .catch((err) => { console.log(err); throw err })
        .finally(() => {
            knex.destroy()
        })
    }

    update(elem, id) {
        knex.table(`${this.tabla}`).where({ id: id }).update({ elem })
    }

    deleteById(id) {
        knex.from(`${this.tabla}`).where({ id: id }).del()
        .then((rows) => {
            for (row of rows){ console.log(`${row['id']} ${row['name']} ${row['price']}`) }
        }).catch((err) => {
            console.log(err)
            throw err
        }).finally(() =>{
            knex.destroy()
        }) 
    }

    deleteAll() {
        knex.from(`${this.tabla}`).del()
        .then(() => {
            console.log("data deleted")
        }).catch((err) => {
            console.log(err)
            throw err
        }).finally(() =>{
            knex.destroy()
        })
    }
}

module.exports = ContenedorProd
