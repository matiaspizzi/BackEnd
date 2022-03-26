require('dotenv').config()
const mongoose = require("mongoose");
const firebase = require("firebase-admin");

const config = {
    DB: 'firebase', // <-------- Puede ser: 'firebase', 'mongo' o 'fs'

    fileSystem: {
        carritosPath: 'src/data/carritos.json',
        productosPath: 'src/data/productos.json'
    },
    mongo: {
        collectionNameProductos: 'productos',
        collectionNameCarritos: 'carritos',
        url: process.env.MONGO_URL,
        options: {
            serverSelectionTimeoutMS: 5000
        }
    }, 
    firebase: {
        collectionNameProductos: 'productos',
        collectionNameCarritos: 'carritos',
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

mongoose.connect(config.mongo.url, config.mongo.options);

firebase.initializeApp({
    credential: firebase.credential.cert(config.firebase)
});

if (config.DB != 'mongo' && config.DB != 'fs' && config.DB != 'firebase') {
    console.log("\n\t----------------------------\nPor favor declarar persistencia de datos en config.js\n\t----------------------------\n")
}

module.exports = config