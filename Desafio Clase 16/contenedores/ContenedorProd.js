const {options} = require('../src/options/SQLite3')
const knex = require('knex')(options)

class ContenedorProd {
    constructor(tabla) {
        this.tabla = tabla

        knex.schema.dropTableIfExists(`${this.tabla}`)
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
        })
    }

    async getById(id) {
        try{
            return await knex.from(`${this.tabla}`).where({ id: id }).select()
        } catch(err) {
            console.log(err)
            throw err
        }
    }

    async getAll() {
        try{
            return await knex.from(`${this.tabla}`).select("*")
        } catch(err) {
            console.log(err)
        }
    }

    async save(elem) {
        try {
          const [newProductId] = await knex.insert(elem).from(`${this.tabla}`)
          const [newProduct] = await knex.select('*').from(`${this.tabla}`).where('id', newProductId)
          console.log('Producto agregado', newProduct)
          return newProduct
        } catch (error) {
          console.log(error);  
        }
      }

    async update(elem, id) {
        try{
            return await knex.table(`${this.tabla}`).where({ id: id }).update({ elem })
        } catch (error) {
            console.log(error);  
        }
    }

    async deleteById(id) {
        try{
            return await knex.from(`${this.tabla}`).where({ id: id }).del()
        } catch (error) {
            console.log(error);  
        }
    }

    async deleteAll() {
        try{
            return await knex.from(`${this.tabla}`).del()
        }catch (error) {
            console.log(error);  
        }
    }
}

module.exports = ContenedorProd
