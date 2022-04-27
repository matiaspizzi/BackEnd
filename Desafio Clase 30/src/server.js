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

if (cluster.isMaster && config.modo.toLowerCase() == 'cluster') {
    console.log(config.cantProcesadores)
    console.log(`PID MASTER ${process.pid}`)

    for (let i = 0; i < config.cantProcesadores; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
}

else {
    const PORT = config.port

    app.get('/', (req, res) => {
        console.log(`Servidor express en ${PORT} - PID ${process.pid} - ${new Date().toLocaleString()}`)
    })

    app.listen(PORT, err => {
        if (!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
    })
}

