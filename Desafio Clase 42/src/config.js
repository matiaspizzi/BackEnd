require('dotenv').config()
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const yargs = require('yargs/yargs')(process.argv.slice(2))
const os = require('os')
const logger = require('./utils/logger.utils.js')

const args = yargs
    .alias({
        p: 'port',
        m: 'modo'
    })
    .default({
        port: 8080,
        modo: 'fork'
    })    
    .argv

const config = {
    persistencia: "mongo", // memoria, mongo o sqlite
    yarg: args,
    port: args.port,
    modo: args.modo,
    cantProcesadores: os.cpus().length,
    mongo: {
        url: process.env.MONGO_ATLAS_URL,
        database: "Desafios",
        collectionProducts: "products",
        collectionMessages: "Messages"
    },
    session: {
        store: MongoStore.create({ mongoUrl: `${process.env.MONGO_ATLAS_URL}`}),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000,
        },
    },
    sqlite: {
        productos:{
            client: 'sqlite3',
            connection: {
                filename: `${__dirname}/DB/productos.sqlite`
            },
            useNullAsDefault: true
        },
        mensajes:{
            client: 'sqlite3',
            connection: {
                filename: `${__dirname}/DB/mensajes.sqlite`
            },
            useNullAsDefault: true
        }
    },
}

mongoose.connect(config.mongo.url, {})
    .then(() => logger.info('MongoDB connected'))
    .catch(err => logger.error(err))

module.exports = config