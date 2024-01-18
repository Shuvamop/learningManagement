const mongoose =require('mongoose')
const Schema = mongoose.Schema


const tokenSchema = new Schema({

    _userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'loginModel'
    },
    token:{
        type:String,
        required:true
    },
    expireAt:{
        type:Date,
        default:Date.now,
        index:{
            expires:8640000
        }  
    }
})

module.exports=mongoose.model('loginTokenModel',tokenSchema)