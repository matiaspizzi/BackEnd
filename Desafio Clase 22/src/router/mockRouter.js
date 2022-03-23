const express = require("express");
const router = express.Router();

const productosMock = require("../utils/generadorMockProductos.js");

router.get("/", async (req, res) => {
        res.send(productosMock);
});

module.exports = router;
