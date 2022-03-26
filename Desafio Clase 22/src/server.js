const express = require('express')
const config = require('../src/config.js')
const normalizr = require('normalizr')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorProd = require('../contenedores/ContenedorProd.js')
const ContenedorMsjs = require('../contenedores/ContenedorMsjs.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorProd('productos')
const mensajesApi = new ContenedorMsjs(config.firebase.collectionName)

// -----------------Normalizr-----------------
const autor = new normalizr.schema.Entity('autor', { }, { idAttribute: 'email' })
const texto = new normalizr.schema.Entity('texto', { autor: autor },{ idAttribute: 'id' })
const centroMensajes = new normalizr.schema.Entity('centroMensajes', {
  autores: [autor],
  mensajes: [texto]
}, { idAttribute: 'id' })

function normalizar(mensajes) {
  const normalizar = mensajes.map((mensaje) => ({
    autor: mensaje.autor,
    fecha: mensaje.fyh,
    texto: mensaje.texto,
    id: mensaje.id.toString()
  }));

  const normalizado = normalizr.normalize(
    { id: 'mensajes', mensajes: normalizar },
    centroMensajes
  );
  
  return normalizado
}
// -----------------Normalizr-----------------

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    socket.emit('productos', await productosApi.getAll())

    socket.on('update', async producto => {
        productosApi.save(producto)
        io.sockets.emit('productos', await productosApi.getAll())
    })

    socket.emit('mensajes', normalizar(await mensajesApi.getAll()));

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.save(mensaje)
        io.sockets.emit('mensajes', await mensajesApi.getAll())
    })
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.use('/api/productos-test', require('./router/mockRouter.js'));

const connectedServer = httpServer.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
