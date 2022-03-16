const express = require('express')
const router = express.Router()

router.get('/', function(req, res){
    // res.send('hello world')
    res.redirect('/auth/login')
})

router.get('/welcome', function(req, res){
    res.send('welcome: successfully logged in ')
})

module.exports = router