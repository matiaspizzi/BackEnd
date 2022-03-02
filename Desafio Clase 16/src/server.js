const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorProd = require('../contenedores/ContenedorProd.js')
const ContenedorMsjs = require('../contenedores/ContenedorMsjs.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorProd('productos')
const mensajesApi = new ContenedorMsjs('mensajes')


io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    socket.emit('productos', await productosApi.getAll())

    socket.on('update', async producto => {
        productosApi.save(producto)
        io.sockets.emit('productos', await productosApi.getAll())
    })

    socket.emit('mensajes', await mensajesApi.getAll());

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.save(mensaje)
        io.sockets.emit('mensajes', await mensajesApi.getAll())
    })
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

const connectedServer = httpServer.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
