const mongoose = require('mongoose')
const AuthSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('user', AuthSchema)