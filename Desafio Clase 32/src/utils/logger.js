const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.simple(), 
        format.printf(info => `[${new Date().toLocaleString()}] [${info.level}]: ${info.message}`)
    ),
    transports: [
        new transports.Console({ level: 'info' }),
        new transports.File({ filename: `${__dirname}/../logs/warn.log`, level: 'warn' }),
        new transports.File({ filename: `${__dirname}/../logs/error.log`, level: 'error' }),
    ]
})

module.exports = logger