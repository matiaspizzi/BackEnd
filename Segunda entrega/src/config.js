require('dotenv').config()

const config = {
    DB: 'firebase', //Puede ser: 'firebase', 'mongo' o 'fs'

    fileSystem: {
        carritosPath: 'src/data/carritos.json',
        productosPath: 'src/data/productos.json'
    },
    mongo: {
        url: process.env.MONGO_URL,
        options: {
            serverSelectionTimeoutMS: 5000
        }
    },
    // "initializeApp" se encuentra en ContenedorProductosFirebase.js 
    firebase: {
        collectionNameP: process.env.COLLECTION_NAME_P,
        collectionNameC: process.env.COLLECTION_NAME_C,
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

module.exports = config