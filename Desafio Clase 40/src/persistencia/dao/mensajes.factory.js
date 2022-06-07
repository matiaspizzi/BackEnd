const MemoryDao = require('./mensajes/mensajes.dao.memory')
const MongoDao = require('./mensajes/mensajes.dao.mongo')
const SqliteDao = require('./mensajes/mensajes.dao.sqlite')

class MensajesFactoryDAO {
    static getPersistencia(database) {
        switch (database) {
            case 'memoria':
                return MemoryDao.getInstance()
            case 'mongo':
                return MongoDao.getInstance()
            case 'sqlite':
                return SqliteDao.getInstance()
        }
    }
}

module.exports = MensajesFactoryDAO;