const express = require('express')
const config = require('./config.js')
const { normalizarMensajes } = require('../src/normalizr/mensajes.js')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const passport = require('passport')
const flash = require('connect-flash')
const morgan = require('morgan')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorProd = require('./contenedores/ContenedorProd.js')
const ContenedorMsjs = require('./contenedores/ContenedorMsjs.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

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

app.use(morgan('dev'))

app.use(cookieParser());
app.use(session(config.session))

require('./passport/local-auth.js')
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage')
    app.locals.loginMessage = req.flash('loginMessage')
    app.locals.user = req.user
    next()
})

app.set('view engine', 'ejs');

app.use('/api', require('./router/mock.js'))
app.use('/api', require('./router/randoms.js'))
app.use('/', require('./router/login&register.js'))
app.use('/info', require('./router/info.js'))

const auth = require('./auth/index.js')

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', auth, (req, res) => {
    res.render(path.join(process.cwd(), '/src/views/home.ejs'), { email: req.session.email })
})

const PORT = config.port
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})
connectedServer.on('error', error => console.log(`${error}`))
