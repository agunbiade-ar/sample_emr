if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('express-flash')
const session = require('express-session')

let port = (process.env.PORT != undefined) ? process.env.PORT : 3000; 

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended: false, limit: '5mb'}))

app.use(flash())
app.use(session({
    secret: process.env.SECRET_SESSION, 
    resave: false, 
    saveUninitialized: false
}))

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', ()=> console.log("Successfully connected to mongoose"))

app.use('/', indexRouter)
app.use('/auth', authRouter)

app.listen(port)