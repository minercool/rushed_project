const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    birth_day : String,
    email : String,
    password : String,
    phone : String,
    role : {type : String , default : "user"},
    status : {type : String , default : "active"}

})

module.exports = mongoose.model('User',userSchema)