const express = require('express')
const handlebars = require('express-handlebars')

const app = express()


app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs'
}))

app.set('views', 'public')

app.get('/', (req, res) => {
    res.render('datos.hbs', {
    
    })
})

app.use(express.static('public'))

app.listen(8080)