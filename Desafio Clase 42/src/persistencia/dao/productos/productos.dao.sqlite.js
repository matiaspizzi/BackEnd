const config = require('../../../config.js')
const knex = require('knex')(config.sqlite.productos)
const logger = require('../../../utils/logger.utils.js')
const IDao = require('../IDao.js')

let productSqliteInstance = null;

class ProductosSqliteDAO extends IDao{
    constructor() {
        super()
        this.tabla = 'productos'

        knex.schema.dropTableIfExists(`${this.tabla}`)
        .then(() => {
            knex.schema.createTable(`${this.tabla}`, table => {
                table.increments('id').primary().notNullable()
                table.string('title').notNullable()
                table.integer('price').notNullable()
                table.string('thumbnail').notNullable()
            }).then(() => {
                logger.info('Product database table created')
            }).catch((err) => {
                logger.error(err)
                throw err
            })
        })
    }

    static getInstance() {
        if (!productSqliteInstance) {
            productSqliteInstance = new ProductosSqliteDAO()
        }
        return productSqliteInstance;
    }

    async getById(id) {
        try{
            return await knex.from(`${this.tabla}`).where({ id: id }).select()
        } catch(err) {
            logger.error(err)
            throw err
        }
    }
    
    async update (elem, id) {
        try{
            return await knex.from(`${this.tabla}`).where({ id: id }).update(elem)
        } catch(err) {
            logger.error(err)
            throw err
        }
    }
    
    async getAll() {
        try{
            return await knex.from(`${this.tabla}`).select("*")
        } catch(err) {
            logger.error(err)
            throw err
        }
    }

    async save(elem) {
        try {
          const [newProductId] = await knex.insert(elem).from(`${this.tabla}`)
          const [newProduct] = await knex.select('*').from(`${this.tabla}`).where('id', newProductId)
          return newProduct
        } catch (err) {
            logger.error(err)
            throw err
        }
      }

    async deleteById(id) {
        try{
            return await knex.from(`${this.tabla}`).where({ id: id }).del()
        } catch (err) {
            logger.error(err)
            throw err  
        }
    }

    async deleteAll() {
        try{
            return await knex.from(`${this.tabla}`).del()
        }catch (err) {
            logger.error(err)
            throw err 
        }
    }
}

module.exports = ProductosSqliteDAO