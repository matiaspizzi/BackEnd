const express = require('express')
const config = require('./config.js')
const { normalizarMensajes } = require('./utils/normalizr.js')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const cluster = require('cluster')
const compression = require('compression')
const loggerMiddleware = require('./middlewares/logger.js')
const logger = require('./utils/logger.js')
const http = require('http')
const {Server: Socket} = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = new Socket(server);

const ContenedorProd = require('./persistencia/contenedores/ContenedorProductos.js')
const ContenedorMsjs = require('./persistencia/contenedores/ContenedorMensajes.js')

const productosApi = new ContenedorProd(config.firebase.collectionNameProd)
const mensajesApi = new ContenedorMsjs(config.firebase.collectionNameMsjs)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(compression())
app.use(cookieParser());
app.use(session(config.session))
require('./middlewares/passport.js')
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(loggerMiddleware)
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage')
    app.locals.loginMessage = req.flash('loginMessage')
    app.locals.user = req.user
    next()
})

app.set('view engine', 'ejs');

app.use('/api', require('./rutas/mock.js'))
app.use('/api', require('./rutas/randoms.js'))
app.use('/', require('./rutas/home.js'))
app.use('/', require('./rutas/register.js'))
app.use('/', require('./rutas/login.js'))
app.use('/', require('./rutas/info.js'))

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.use(function (req, res, next) {
    if(res.status(404)){
        res.send({ error: -2, descripcion: `ruta ${req.path} método ${req.method} no implementada` });
        logger.warn(`${req.method} ${req.path} no implementado`)
        return;
    }
});

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
} else {
    const PORT = process.env.PORT || config.port || 80
    server.listen(PORT, err => {
        logger.info(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
    })
    server.on('error', err => {
        logger.error(err)
    })
}

