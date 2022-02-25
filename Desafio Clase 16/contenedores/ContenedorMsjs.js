const {options} = require('../src/options/mariaDB')
const knex = require('knex')(options)

class ContenedorMsjs{
    constructor(tabla){
        this.tabla = tabla

        knex.schema.createTable(`${this.tabla}`, table => {
            table.increments('id').primary().notNullable()
            table.string('autor').notNullable()
            table.string('texto').notNullable()
            table.string('fyh').notNullable()
        }).then(() => {
            console.log('table created')
        }).catch((err) => {
            console.log(err)
            throw err
        }).finally(() => {
            knex.destroy()
        })
    }

    getAll(){
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
    
    getById(id){
        knex.from(`${this.tabla}`).where({ id: id }).select()
        .then((rows) => {
            for (row of rows){ console.log(`${row['id']} ${row['name']} ${row['price']}`) }
        }).catch((err) => {
            console.log(err)
            throw err
        }).finally(() =>{
            knex.destroy()
        }) 
    }
    
    save(obj){
        knex(`${this.tabla}`).insert(obj)
        .then(() => { console.log('data inserted') })
        .catch((err) => { console.log(err); throw err })
        .finally(() => {
            knex.destroy()
        })
    }
    

    deleteById(id){
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

    deleteAll(){
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

module.exports = ContenedorMsjs