const MemoryDao = require('./productos/productos.dao.memory')
const MongoDao = require('./productos/productos.dao.mongo')
const SqliteDao = require('./productos/productos.dao.sqlite')

class ProductosFactoryDAO {
    static getPersistencia(database) {
        switch (database) {
            case 'memoria':
                return MemoryDao.getInstance()
            case 'mongo':
                return MongoDao.getInstance()
            case 'sqlite':
                return SqliteDao.getInstance()
            default:
                return MemoryDao.getInstance()
        }
    }
}

module.exports = ProductosFactoryDAO;