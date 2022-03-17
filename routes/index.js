const express = require('express')
const router = express.Router()
const { ensureLoginAuthenticated, ensureExceptLogOut } = require('../config/auth')

router.get('/', function(req, res){
    // res.send('hello world')
    res.redirect('/auth/login')
})

router.get('/welcome', ensureLoginAuthenticated, function(req, res){
    console.log(req.user.name)
    res.send(`welcome: successfully logged in ` )
})

module.exports = router