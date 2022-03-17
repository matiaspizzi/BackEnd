require('dotenv').config()

const config = {
    DB: 'fs', //Puede ser: 'firebase', 'mongo' o 'fs'

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
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHdW8J2j9Qru+4\nMWa8CYGto1ldRYl+FSFG6m2jXWyIOd8kyxoTwRGHOswqzVmMatk9Ju/ydRdNRIPn\n2M15UhaHpxc6T2wLhnTuljBdgcVGXvFUZtiM9dMxckvYqnAFfTGOVE9oSZ6FRfDI\nrOg7F/pWCHOd+9cI61P653C8WSdKHIkEcjvkgiLyps7+MveU/9Kq40EvQfSBYAcS\nTpQq7LFCCswXweFO/D4KQa/Frq9j7inMywMSy0a6BzK9A7GA/SMuDtAOk+yYLYW7\nymXFF/UyDzRWXYrQ7hJngW4U4aiV5kGIt0anMQIAJV7jAYHehxnGaGtExRrPthPe\nv9T8EjrJAgMBAAECggEADlGuDWglgjxy0Xd7c32fuYhX8KgesyZfb5TCFvespFl6\nPW0Ww8sJH/sOv/Ziyr+7dYZLdM2m5PlJmm4AL0jfPPEYC+u6exfVonC2C2p28AK+\nIsPo4TK/LQYyb30p4lz+3yPKmRcq6hCvtOpj2CU0J7O+4B09rmJdkq5Fk8H3PfzO\ns1kmOM3iUmdp0lGeDPuuGyG90XZZ3agW7Xp/0a/0ndcFNUINFWtK0aas/ZmjIjec\ndsfQ9ecBlDf1EV8dJg+6WAqQkao3and/LpSQvInmq3ENwbGOK/FW6oxH9Z4o5DNA\njABegMDKqIpNPfkW3hLIVHg5WA6dXUm1NZI/iJb0wQKBgQDuyUYEJZVMO/kQEIlp\nqKEONBj+78KmOdv99tLnbtWfLQr9IkttpFyP1RbMy3k/nCS6iUpUmJw82nW1ABly\nxjyPzmkUf6+13NZ4Htm5pbc/7zBpER8RzoIHyZF9Pv0DpM69N98yuHEcrsZFoj2l\nRQPxOzyNiNn3dM5HMDWNHjTJQQKBgQDV1mIhC4msZlBBG/TTjtZtamY5xqPKlRT9\njEhM/nwOQ5Fzw2yERvt8uS8ffs2PEzVe5ERcI/vhCC2HNwL81ZH/Zm02njaU8v6L\nZtrncG/Ud9IxmTmcNQR4QzVuSztv6x6CSC7+UVdQidGlojm7mo7zV7Atn0zb4Ila\ny/A42CHHiQKBgG6oYcUcMaMBi/tw3m1Tk0eExyylqbvkxllcIALWbzLz6crDMNdf\nuvGA268OgGMFFlRHuWWYz5a32qKFqEVzLq+qBTJVtfT+oXlLOrT44gJD81hNceuL\nmuDG/aBgJ1qf7prroIjdxrV3HTU56X2EjT4mqHoiuHgf7lQ5OCfsnqPBAoGAGObu\nZorBbaI8llh7Gmf38KYDYZcQW/cgiqZbhRvdtouH1MNdT8o0X0HxiulpZtAF1xce\nHtzR6FLbenOdlXQJnISBE2s5T/88RV+k/m7JlySdBcmiO96wtpCdGEsKkO4Aj4t4\nbYVrdaWXFILf1kkZfJ0plyaF/NUZKcm2H+iLhoECgYEAtxIgTi6Oj18d+sKfz9sU\nHgH7yZqe6rgv4edRz6DGZVB906tTFo0+Q0vURJF+EsFAdVBn7ovQeVmbUrm5bFC6\npkBSB1PHDw66hAjHqmUt93Hov3GlhfHVGT9zdlrL9UKCtfACI7WBnfc3wW/YZFpc\nm2QVPb8ZYwiDHngBjirCAZA=\n-----END PRIVATE KEY-----\n",
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUT_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
    }
}

module.exports = config