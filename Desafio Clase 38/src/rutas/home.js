const express = require("express");
const router = express.Router();
const path = require('path')
const auth = require("../middlewares/auth.js");

router.get('/home', auth, (req, res) => {
    res.render(path.join(process.cwd(), '/src/views/home.ejs'))
})

module.exports = router