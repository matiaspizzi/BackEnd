const express = require("express");
const router = express.Router();
const { fork } = require("child_process");
const path = require('path')

router.get('/randoms/:cant?', (req, res) => {
    const cant = req.params.cant
    if(!cant){
        cant = 1000
    }
    console.log(cant)
    const child = fork(path.join(process.cwd(), '/src/utils/calcularRandom.js'))
    child.send({cant: cant})
    child.on('message', (message) => {
        res.json(message)
    })
})

module.exports = router