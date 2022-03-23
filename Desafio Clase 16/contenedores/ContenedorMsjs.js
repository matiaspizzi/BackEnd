const {options} = require('../src/options/mariaDB')
const knex = require('knex')(options)

class ContenedorMsjs{
    constructor(tabla){
        this.tabla = tabla

        knex.schema.dropTableIfExists(`${this.tabla}`)
        .then(() => {
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
            })
        })
    }

    async getAll(){
        try{
            return await knex.from(`${this.tabla}`).select("*")
        } catch(err) {
            console.log(err)
            throw err
        } 
    }
    
    async getById(id){
        try{
            return await knex.from(`${this.tabla}`).where({ id: id }).select()
        } catch(err) {
            console.log(err)
            throw err
        }
    }
    
    async save(obj){
        try{
            return await knex(`${this.tabla}`).insert(obj)
        } catch(err) {
            console.log(err)
            throw err
        }
    }
    

    async deleteById(id){
        try{
            return await knex.from(`${this.tabla}`).where({ id: id }).del()
        } catch(err) {
            console.log(err)
            throw err
        }
    }

    async deleteAll(){
        try{
            return await knex.from(`${this.tabla}`).del()
        } catch(err) {
            console.log(err)
            throw err
        }
    }
}

module.exports = ContenedorMsjs