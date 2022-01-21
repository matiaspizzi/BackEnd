
// Data

const fs = require('fs');

class Contenedor{
    constructor(nombre){
        this.nombre = nombre;
    }

    getAll(){
        let archivo = fs.readFileSync(`./productos/${this.nombre}.txt`, 'utf-8');
        let data = JSON.parse(archivo);
        return data;
    }
}

const Productos = new Contenedor("Productos");
const productos = Productos.getAll()

// Servidor

const express = require('express');

const app = express();

const port = 8080;

app.get('/productos', (req, res) => {
    res.send(`${JSON.stringify(productos)}`);
})

let position = Math.floor(Math.random()*productos.length);
const resp = productos[position];

app.get('/productoRandom', (req, res) => {
    res.send(`${JSON.stringify(resp)}`);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})