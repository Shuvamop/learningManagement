const userModel = require("../../model/loginModel");
const tokenModel = require("../../model/loginTokenModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");

const bannerModel =require('../../model/bannerModel')
const featureModel = require('../../model/featureModel')
const aboutModel = require('../../model/aboutModel')
const facilityModel = require('../../model/facilityModel')
const teacherModel = require('../../model/teacherModel')
const courseModel = require('../../model/courseModel')

const home =async(req, res) => {
  try {
    const banerdata = await bannerModel.find()
    const featuredata = await featureModel.find()
    const aboutdata = await aboutModel.find()
    const facilitydata = await facilityModel.find()
    const teacherdata = await teacherModel.find()
    const coursedata = await courseModel.find()

    res.render("User/home", {
      title: "home page",
      userData: req.user,
      banerdata :banerdata,
      featuredata:featuredata,
      aboutdata:aboutdata,
      facilitydata:facilitydata,
      teacherdata:teacherdata,
      coursedata:coursedata
    });
  } catch (error) {
    // Handle the error appropriately, e.g., send an error response or log the error
    console.error('Error in home route:', error);
    res.status(500).send('Internal Server Error');
  }
};


// const course = (req, res) => {
//   res.render("User/course", {
//     title: "course page",
//   });
// };

const courseDetail = (req, res) => {
  res.render("User/courseDetail", {
    title: "CourseDetail",
  });
};

const gallery = (req, res) => {
  res.render("User/gallery", {
    title: "Gallery Page",
  });
};

const contact = (req, res) => {
  res.render("User/contact", {
    title: "Contact Page",
  });
};

// const blogSingle = (req, res) => {
//   res.render("User/blogSingle", {
//     title: "blogSingle",
//   });
// };

const errorpage = (req, res) => {
  res.render("User/404", {
    title: "Error Page",
  });
};

// const blogArchive = (req, res) => {
//   res.render("User/blogArchive", {
//     title: "blogArchive",
//   });
// };

const userlogin = (req, res) => {
  const message = req.flash("message");
  res.render("User/userlogin", {
    title: "User Login Page",
    message,
    userData: req.user,
  });
};

const userregistration = (req, res) => {
  const message = req.flash("message");
  res.render("User/userregistration", {
    title: "User Registration Form",
    message,
    data: req.user,
  });
};

const createRegistration = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      bcrypt.genSaltSync(10)
    );

    const user = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });

    const tokenValue = await crypto.randomBytes(16).toString("hex");

    const token = await tokenModel.create({
      _userId: user._id,
      token: tokenValue,
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: "Shuvam",
      to: user.email,
      subject: "Account Verification",
      text: `Hello ${user.name}, 
              \n\nPlease click the link to verify your account:
              \n\nhttp://${req.headers.host}/confirmation/${user.email}/${token.token}\n\nThank You!`,
    };

    await transporter.sendMail(mailOptions);

    req.flash(
      "message",
      "A verification link has been sent to your email. Please check, and it will expire within 24 hours."
    );
    console.log(
      "A verification link has been sent to your email. Please check, and it will expire within 24 hours."
    );
    return res.redirect("/userlogin");
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Error while registration: ${err.message}`);
  }
};

const confirmation = async (req, res) => {
  try {
    const token = await tokenModel.findOne({ token: req.params.token });
    if (!token) {
      req.flash("message", "token may be expires");
      console.log("token may be expires");
      return res.redirect("/");
    }
    const user = await userModel.findOne({
      _id: token._userId,
      email: req.params.email,
    });
    if (user) {
      if (user.isVerified) {
        req.flash("message", "user already verified");
        console.log("user already verified");
        return res.redirect("/");
      } else {
        user.isVerified = true;
        await user.save();
        req.flash("message", "Your accound veried successfully");
        console.log("Your accound veried successfully");
        return res.redirect("/userlogin");
      }
    } else {
      req.flash("message", "cound not find the user");
      console.log("cound not find the user");
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(`Error while registration: ${err.message}`);
  }
};

// const userloginpost = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });

//     if (user) {
//       if (!user.status) {
//         req.flash(
//           "message",
//           "Your account is inactive. Please contact support."
//         );
//         console.log("Account is inactive");
//         return res.redirect("/userlogin");
//       }

//       if (user.isVerified) {

//         if(user.isActive===false){}

//         const isPassword = bcrypt.compareSync(req.body.password, user.password);

//         if (isPassword) {
//           const token = jwt.sign(
//             {
//               _id: user._id,
//               name: user.name,
//               email: user.email,
//               role:user.role
//             },
//             process.env.JWT_KEY,
//             { expiresIn: "5h" }
//           );
//           req.user = {
//             id: user._id,
//             name: user.name,
//             phone: user.phone,
//             email: user.email,
//             role:user.role
//           };

//           res.cookie("userToken", token);
//           console.log(user);
//           return res.redirect("/");
//         } else {
//           req.flash("message", "Invalid Password");
//           console.log("Invalid Password");
//           return res.redirect("/userlogin");
//         }
//       } else {
//         req.flash("message", "User not verified");
//         console.log("User not verified");
//         return res.redirect("/userlogin");
//       }
//     } else {
//       req.flash("message", "User not found");
//       console.log("User not found");
//       return res.redirect("/userlogin");
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send(`Error during login: ${err.message}`);
//   }
// };


const userloginpost = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      req.flash("message", "User not found");
      console.log("User not found");
      return res.redirect("/userlogin");
    }

    if (!user.status) {
      req.flash(
        "message",
        "Your account is inactive. Please contact support."
      );
      console.log("Account is inactive");
      return res.redirect("/userlogin");
    }

    if (!user.isVerified) {
      req.flash("message", "User not verified");
      console.log("User not verified");
      return res.redirect("/userlogin");
    }

    // Assuming you want to check if the user is inactive
    if (!user.isActive) {
      // Handle inactive user
      req.flash("message", "User is inactive");
      console.log("User is inactive");
      return res.redirect("/userlogin");
    }

    const isPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!isPassword) {
      req.flash("message", "Invalid Password");
      console.log("Invalid Password");
      return res.redirect("/userlogin");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      process.env.JWT_KEY,
      { expiresIn: "5h" }
    );

    req.user = {
      id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role
    };

    

    res.cookie("userToken", token);
    console.log(user);
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Error during login: ${err.message}`);
  }
};


const userAuth = (req, res, next) => {
  if (req.user) {
    console.log(req.user);
    next();
  } else {
    console.log("Could not get the data");
    res.redirect("/userlogin"); // Redirect to the home page or login page
  }
};

const userlogout = (req, res) => {
  res.clearCookie("userToken");
  res.redirect("/userlogin");
};

const allstudent=async(req,res)=>{
  try{

    const users = await userModel.find({role:'student'})
    res.render('User/allstudent/student.ejs',{
      title: 'All Student',
            users,
          
    })

  }catch(err){
    console.log(err);
        // Handle the error, e.g., send an error response
        res.status(500).json({ error: 'Internal Server Error' });
  }

}

module.exports = {
  home,
  courseDetail,
  gallery,
  contact,
  errorpage,
  userlogin,
  userregistration,
  createRegistration,
  confirmation,
  userloginpost,
  userAuth,
  userlogout,
  allstudent
};
