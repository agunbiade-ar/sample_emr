const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { ensureLoginAuthenticated, ensureExceptLogOut } = require('../config/auth')

let Worker = require('../models/worker')

router.get('/login', ensureExceptLogOut, function(req, res){
    res.render('auth/login')
})

router.post('/login', ensureExceptLogOut, function(req, res, next){
    passport.authenticate('local', {
        successRedirect: '/welcome',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next)
})

router.get('/register', ensureExceptLogOut, function(req, res){
    res.render('auth/register')
})

router.get('/register-worker', ensureExceptLogOut, function(req, res){
    res.render('auth/register-worker')
})

router.post('/register-worker', ensureExceptLogOut, function(req, res){
let errors = []

    const { fname, surname, email, age, gender, password, confirm_password, cadre, department } = req.body

        //check required fields
    if(!fname || !surname || !email || !age || !gender || !password || !confirm_password)
        errors.push({msg: 'Please fill all fields correctly'})
    
    //check passwords match
    if(password !== confirm_password)
        errors.push({msg: 'Passwords do not match'})

    if(password.length < 6)
        errors.push({msg: 'Password should be 6 or more characters'})

    if(errors.length){
        res.render('auth/register-worker', {
            errors, fname, surname, email, age, gender, password, confirm_password
        })
    }else{
        Worker.findOne({ email: email}).then( function(user){
            if(user) 
            {
                errors.push({msg: 'That email is already registered'})
            
            res.render('auth/register-worker', {
                errors, fname, surname, email, age, gender, password, confirm_password
            })
        }else{
            const worker = new Worker({fname, surname, email, age, gender, password, cadre, department})
                  
            //hash password
                   bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(worker.password, salt, function(err, hash){
                        if(err) throw err

                        //set password to hash
                        worker.password = hash

                        worker.save().then( (w) => {
                            //flash message
                            req.flash('success_msg', 'You are now registered and can log in')
                            res.redirect('/auth/login')
                        }).catch( 
                            err => {console.error(err); res.render('auth/register-worker', {errors, fname, surname, email, age, gender, password, confirm_password}
                            )})

                    })
                })
             }
        })
    }

})

router.get('/logout', function(req, res){
    req.logout()
    req.flash('success_msg', 'You have been logged out successfully')
    res.redirect('/auth/login')
})

module.exports = router