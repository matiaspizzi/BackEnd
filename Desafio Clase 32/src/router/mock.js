const express = require("express");
const router = express.Router();
const logger = require("../utils/logger.js");

const { generarProductosFaker } = require("../utils/generadorMockProductos.js");

router.get("/productos-test", async (req, res) => {
    res.send(generarProductosFaker());
    logger.info(`${req.method} ${req.path}`)
});

module.exports = router
