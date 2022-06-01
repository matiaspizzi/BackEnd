const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    format: format.combine(
        format.simple(), 
        format.printf(info => `[${new Date().toLocaleString()}] [${info.level}]: ${info.message}`)
    ),
    transports: [
        new transports.Console({ level: 'info' }),
        new transports.File({ filename: `${__dirname}/../logs/warn-error.log`, level: 'warn' })
    ]
})

module.exports = logger