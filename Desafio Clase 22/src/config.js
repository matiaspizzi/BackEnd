require('dotenv').config()
const firebase = require("firebase-admin");

const config = {
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

firebase.initializeApp({
    credential: firebase.credential.cert(config.firebase)
});

module.exports = config