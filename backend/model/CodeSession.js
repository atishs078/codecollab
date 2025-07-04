const { type } = require('@testing-library/user-event/dist/type')
const mongoose = require ('mongoose')
const saveSession = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    roomId:{
        type:String,
        required:true
    },
    code:{
        type:String,
        default:''
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    language:{
        type:String,
        required:true,
        default:'javascript'
    }
})
module.exports = mongoose.model('CodeSession', saveSession)
