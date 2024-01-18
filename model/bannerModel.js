const mongoose=require('mongoose')
const schema=mongoose.Schema
const bannerschema=new schema({
    title:{
        type:String,
        required:true
    },
    subtitle:{
        type:String,
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('bannerModel',bannerschema)