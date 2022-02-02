const express = require('express')
const { Router } = express;
const handlebars = require('express-handlebars')

const app = express()

const productos = Router();

class Producto {
    constructor(title, price, thumbnail, id) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id;
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const arrayProductos = []


app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs'
}))

app.set('view engine', 'ejs')

app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index.ejs', {arrayProductos})
})

productos.get("/:id", (req, res) => {
    const id = req.params.id;
    const prod = arrayProductos.find((e) => e.id == id);
    res.render('datos', {prod})
});

productos.post("/", (req, res) => {
    const title = req.body.title;
    const price = req.body.price;
    const thumbnail = req.body.thumbnail;
    const id = arrayProductos.length + 1;
    const prod = new Producto(title, price, thumbnail, id);
    arrayProductos.push(prod);
    res.redirect('/');
});

productos.put("/:id", (req, res) => {
    const id = req.params.id;
    const prod = arrayProductos.find((e) => e.id == id);
    prod.title = req.body.title;
    prod.price = req.body.price;
    prod.thumbnail = req.body.thumbnail;
    res.send(arrayProductos);
});

productos.delete("/:id", (req, res) => {
    const id = req.params.id;
    const prod = arrayProductos.find((e) => e.id == id);
    const ind = arrayProductos.indexOf(prod);
    arrayProductos.splice(ind, 1);
    res.send(arrayProductos);
});

app.use("/api/productos", productos);

app.use(express.static('public'))

app.listen(8080, (req, res) => {
    console.log(`Example app listening at http://localhost:8080`);
});