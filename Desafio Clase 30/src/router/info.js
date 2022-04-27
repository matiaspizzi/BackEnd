const express = require("express");
const router = express.Router();
const path  = require('path')
const config = require('../config')

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

router.get('/', (req, res) => {
    res.render(path.join(process.cwd(), '/src/views/info.ejs'), { info })
})

module.exports = router