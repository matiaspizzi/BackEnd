const logger = require('../utils/logger.js')

function loggerRoutes(req, res, next) {
    logger.info(`${req.method} ${req.path} ${res.statusCode}`)
    next()
}

module.exports = loggerRoutes