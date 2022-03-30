const express = require('express')
const config = require('../src/config.js')
const { normalizarMensajes } = require('../src/normalizr/mensajes.js')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path  = require('path')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorProd = require('../contenedores/ContenedorProd.js')
const ContenedorMsjs = require('../contenedores/ContenedorMsjs.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

app.set('view engine', 'ejs');

const productosApi = new ContenedorProd('productos')
const mensajesApi = new ContenedorMsjs(config.firebase.collectionName)

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!')

    socket.emit('productos', await productosApi.getAll())

    socket.on('update', async producto => {
        productosApi.save(producto)
        io.sockets.emit('productos', await productosApi.getAll())
    })

    socket.emit('mensajes', normalizarMensajes(await mensajesApi.getAll()));

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.save(mensaje)
        io.sockets.emit('mensajes', normalizarMensajes(await mensajesApi.getAll()))
    })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.use(cookieParser());
app.use(session(config.session));

app.use('/api/productos-test', require('./router/mockRouter.js'));

const auth = require('./auth/index.js')

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', auth, (req, res) => {
    res.render(path.join(process.cwd(), '/src/views/pages/home.ejs'), { nombre: req.session.nombre })
})

app.post('/login', (req, res) => {
    req.session.nombre = req.body.nombre
    res.redirect('/home')
})

app.get('/login', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), '/src/views/login.html'))
    }
})

app.get('/logout', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/src/views/pages/logout.ejs'), { nombre })
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})
connectedServer.on('error', error => console.log(`${error}`))
