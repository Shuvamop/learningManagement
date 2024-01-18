const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    phone: { type: String },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    admin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    coursesIds: {
      type: [mongoose.Schema.ObjectId],
      ref: "courseModel",
      default: [],
    },
    // avatar: {
    //   type: String,
    //   require: true,
    //   default: "user.png",
    //   get: (avatar) => `${process.env.SERVER_URL}${avatar}`,
    // },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);
module.exports = mongoose.model("loginModel", userSchema);
