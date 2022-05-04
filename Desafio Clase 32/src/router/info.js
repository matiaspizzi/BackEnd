const express = require("express");
const router = express.Router();
const path  = require('path')
const config = require('../config')
const logger = require("../utils/logger.js");

const info = {
    args: JSON.stringify(config.yarg),
    os: process.platform,
    nodev: process.version,
    mem: process.memoryUsage().rss,
    path: process.execPath,
    processId: process.pid,
    dir: process.cwd(),
    cantProcesadores: config.cantProcesadores
}

router.get('/info', (req, res) => {
    res.render(path.join(process.cwd(), '/src/views/info.ejs'), { info })
    logger.info(`${req.method} ${req.path}`)
})

module.exports = router