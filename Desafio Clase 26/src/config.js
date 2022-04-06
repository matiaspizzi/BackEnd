require('dotenv').config()
const firebase = require("firebase-admin");
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')

const config = {
    mongo: {
        url: process.env.MONGO_ATLAS_URL,
        database: "Desafios",
        collection: "users"
    },
    session: {
        store: MongoStore.create({ mongoUrl: process.env.MONGO_ATLAS_URL}),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000,
        },
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: `${__dirname}/DB/productos.sqlite`
        },
        useNullAsDefault: true
    },
    firebase: {
        collectionName: 'mensajesEj22',
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUT_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
    }
}

mongoose.connect(config.mongo.url, {})
    .then(db => console.log('MongoDB connected'))
    .catch(err => console.log(err))

firebase.initializeApp({
    credential: firebase.credential.cert(config.firebase)
});

module.exports = config