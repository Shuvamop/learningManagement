const mongoose= require('mongoose')
const schema=mongoose.Schema

const teacherschema=new schema({
    name:{type:String,required:true},
    position:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true}
})

module.exports=mongoose.model('teacherModel',teacherschema)