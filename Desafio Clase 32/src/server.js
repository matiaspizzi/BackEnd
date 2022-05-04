const express = require('express')
const config = require('./config.js')
const { normalizarMensajes } = require('../src/normalizr/mensajes.js')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const passport = require('passport')
const flash = require('connect-flash')
const morgan = require('morgan')
const cluster = require('cluster')
const compression = require('compression')
const logger = require('./utils/logger.js')

const { Server: HttpServer, Server } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorProd = require('./contenedores/ContenedorProd.js')
const ContenedorMsjs = require('./contenedores/ContenedorMsjs.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorProd('productos')
const mensajesApi = new ContenedorMsjs(config.firebase.collectionName)

io.on('connection', async socket => {
    logger.info('Nuevo cliente conectado')

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
app.use(compression())

// app.use(morgan('dev'))

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
app.use('/', require('./router/info.js'))

const auth = require('./auth/index.js')

app.get('/', (req, res) => {
    res.redirect('/home')
    logger.info(`${req.method} ${req.path}`)
})

app.get('/home', auth, (req, res) => {
    res.render(path.join(process.cwd(), '/src/views/home.ejs'), { email: req.session.email })
    logger.info(`${req.method} ${req.path}`)
})

app.use(function (req, res, next) {
    if(res.status(404)){
        res.send({ error: -2, descripcion: `ruta ${req.path} método ${req.method} no implementada` });
        logger.warn(`${req.method} ${req.path} no implementado`)
        return;
    }
});

if (cluster.isMaster && config.modo.toLowerCase() == 'cluster') {
    logger.info(`CANT PROCE ${config.cantProcesadores}`)
    logger.info(`PID MASTER ${process.pid}`)

    for (let i = 0; i < config.cantProcesadores; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        logger.warn(`Worker, ${worker.process.pid} died `)
        cluster.fork()
    })
}

else {
    const PORT = config.port

    const server = app.listen(PORT, err => {
        logger.info(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
    })

    server.on('error', err => {
        logger.error(err)
    })
}

