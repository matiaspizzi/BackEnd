const options = {
    client: 'sqlite3',
    connection: {
        filename: `${__dirname}/DB/productos.sqlite`
    },
    useNullAsDefault: true
}

module.exports = {
    options
}