const express = require("express");
const passport = require("passport");
const router = express.Router();
const path  = require('path')
const logger = require("../utils/logger.js");

router.get('/login', (req, res) => {
    const email = req.session?.email
    if (email) {
        res.redirect('/')
    } else {
        res.render(path.join(process.cwd(), '/src/views/login.ejs'))
        logger.info(`${req.method} ${req.path}`)
    }
})

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback: true
}))

router.get('/logout', (req, res) => {
    req.logout()
    logger.info(`${req.method} ${req.path}`)
    res.redirect('/')
})

router.get('/register', (req, res) => {
    const email = req.session?.email
    if (email) {
        res.redirect('/')
    } else {
        res.render(path.join(process.cwd(), '/src/views/register.ejs'))
        logger.info(`${req.method} ${req.path}`)
    }
})

router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/register',
    passReqToCallback: true
}))

module.exports = router