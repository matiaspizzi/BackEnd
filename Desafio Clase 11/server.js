const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

httpServer.listen(8080, () => {
    console.log('Server listening at 8080')
})

io.on('connection', (socket) => {
    console.log('usuario conetado')
    socket.emit('mi mensaje', 'Este es mi mensaje desde el servidor')
})