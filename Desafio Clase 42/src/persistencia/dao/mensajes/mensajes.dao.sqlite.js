const config = require('../../../config.js')
const knex = require('knex')(config.sqlite.mensajes)
const logger = require('../../../utils/logger.utils.js')
const IDao = require('../IDao.js')

let messageSqliteInstance = null;

class MensajesSqliteDAO extends IDao{
    constructor() {
        super()
        this.tabla = 'mensajes'

        knex.schema.dropTableIfExists(`${this.tabla}`)
        .then(() => {
            knex.schema.createTable(`${this.tabla}`, table => {
                table.increments('id').primary().notNullable()
                table.string('texto').notNullable()
                table.object('autor').notNullable()
                table.string('fyh').notNullable()
            }).then(() => {
                logger.info('Message database table created')
            }).catch((err) => {
                logger.error(err)
                throw err
            })
        })
    }

    static getInstance() {
        if (!messageSqliteInstance) {
            messageSqliteInstance = new MensajesSqliteDAO()
        }
        return messageSqliteInstance;
    }

    async getById(id) {
        try{
            return await knex.from(`${this.tabla}`).where({ id: id }).select()
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
          const [newMessageId] = await knex.insert(elem).from(`${this.tabla}`)
          const [newMessage] = await knex.select('*').from(`${this.tabla}`).where('id', newMessageId)
          return newMessage
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

module.exports = MensajesSqliteDAO