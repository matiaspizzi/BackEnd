const express = require("express");
const passport = require("passport");
const router = express.Router();
const path  = require('path')

router.get('/login', (req, res) => {
    const email = req.session?.email
    if (email) {
        res.redirect('/')
    } else {
        res.render(path.join(process.cwd(), '/src/views/login.views.ejs'))
    }
})

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback: true
}))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router