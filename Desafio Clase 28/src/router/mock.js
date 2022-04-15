const express = require("express");
const router = express.Router();

const { generarProductosFaker } = require("../utils/generadorMockProductos.js");

router.get("/productos-test", async (req, res) => {
    res.send(generarProductosFaker());
});

module.exports = router
