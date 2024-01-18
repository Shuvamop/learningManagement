const mongoose=require('mongoose')
const schema=mongoose.Schema

const facilityschema=new schema({
    title:{
        type:String,
        required:true
    },
    subtitle:{
        type:String,
        required:true
    },
   
    image:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('facilityModel',facilityschema)