const express = require("express");
const app = express();

const port = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use("/api/productos", require('../router/rutaProductos'));
app.use("/api/carrito", require('../router/rutaCarrito'));

app.listen(8080, (req, res) => {
    console.log(`App listening at http://localhost:${port}`);
});