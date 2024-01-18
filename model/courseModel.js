const mongoose= require('mongoose')
const Schema = mongoose.Schema


const courseSchema = new Schema({
    tropic: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    isActive: { type: Boolean, default: true },
    // banner: {
    //   type: String,
    //   get: (img) => `${process.env.SERVER_URL}/banner/${img}`,
    //   require: true,
    // },
    image:{
        type:String,
        require:true

    },
    adminId: { type: mongoose.Schema.ObjectId, ref: "loginModel", require: true },
    purchaseIds: { type: [mongoose.Schema.ObjectId], ref: "loginModel", default: [] },
    courseDuration: { type: String, require: true },
    schedule: {
      days: { type: [String], require: true }, // ["Monday", "Wednesday", "Friday"]
      time: { type: String, require: true }, // "9:00 AM - 10:30 AM"
      location: { type: String, require: true }, //"California,USA"
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }

)

module.exports=mongoose.model('courseModel',courseSchema)



