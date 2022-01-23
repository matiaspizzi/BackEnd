const express = require('express');
const { Router } = express;

const app = express();
const router = Router();

const productos = Router();

class Producto{
    constructor(title, price, thumbnail, id){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id
    }

    
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));


const arrayProductos = [
    {
        "title": "Producto1",
        "price": 100,
        "thumbnail": "xxxxx",
        "id": 1
    },
    {
        "title": "Producto2",
        "price": 100,
        "thumbnail": "xxxxx",
        "id": 2
    }
]

productos.get('/', (req, res) => {

    res.send(arrayProductos);
})

productos.get('/:id', (req, res) => {
    const id = req.params.id;
    const prod = arrayProductos.find(e => e.id == id);
    if(!prod){
        res.status(404).json({error: "producto no encontrado"});
    }
    res.send(prod);
})

productos.post('/', (req, res) => {
    const title = req.body.title;
    const price = req.body.price;
    const thumbnail = req.body.thumbnail;
    const id = arrayProductos.length+1;
    const prod = new Producto(title, price, thumbnail, id);    
    arrayProductos.push(prod);
    res.send(arrayProductos);
})

productos.put('/:id', (req, res) => {
    const id = req.params.id;
    const prod = arrayProductos.find(e => e.id == id);
    prod.title = req.body.title;
    prod.price = req.body.price;
    prod.thumbnail = req.body.thumbnail;
    res.send(arrayProductos);
})

productos.delete('/:id', (req, res) => {
    const id = req.params.id;
    const prod = arrayProductos.find(e => e.id == id);
    const ind = arrayProductos.indexOf(prod);
    arrayProductos.splice(ind, 1);
    res.send(arrayProductos);
})




app.use('/api/productos', productos);

app.listen(8080, (req, res) => {
    console.log(`Example app listening at http://localhost:8080`);
})

