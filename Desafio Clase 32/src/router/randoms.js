const express = require("express");
const router = express.Router();
const { fork } = require("child_process");
const path = require('path')
const logger = require("../utils/logger.js");

router.get('/randoms', (req, res) => {
    const cant = req.query.cant ? req.query.cant : 100000000
    const child = fork(path.join(process.cwd(), '/src/utils/calcularRandom.js'))
    child.send({cant: cant})
    child.on('message', (message) => {
        res.json(message)
    })
    logger.info(`${req.method} ${req.path}`)
})

module.exports = router