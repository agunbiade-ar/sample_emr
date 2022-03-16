const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

let Worker = require('../models/worker')

router.get('/login', function(req, res){
    res.render('auth/login')
})

router.get('/register', function(req, res){
    res.render('auth/register')
})

router.get('/register-worker', function(req, res){
    res.render('auth/register-worker')
})

router.post('/register-worker', function(req, res){
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
                errors.push({msg: 'That email already registered'})
            
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

module.exports = router