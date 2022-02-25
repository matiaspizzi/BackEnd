const options = {
    client: 'sqlite3',
    connection: {
        filename: `${__dirname}/DB/productos.sql`
    },
    useNullAsDefault: true
}

module.exports = {
    options
}