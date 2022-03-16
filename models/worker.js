const mongoose = require('mongoose')

const health_worker_schema = new mongoose.Schema({
    fname: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    age: {type: Number, required: true},
    gender: {type: String, required: true},
    password: {type: String, required: true},
    cadre: {type: String},
    department: {type: String}
})

module.exports = mongoose.model('Worker', health_worker_schema)