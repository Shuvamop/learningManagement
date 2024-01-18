const userModel=require('../../model/loginModel')
const jwt =require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const flash=require('connect-flash')



const dashboard=(req,res)=>{
    res.render('Admin/admindashboard',{
        title:"dashboard",
        admindata:req.admin
    })

}
const login=(req,res)=>{
    const message = req.flash('message')
    res.render('Admin/adminlogin',{
        title:"dashboard",
        message
    })

}

const adminloginpost=async(req,res)=>{
    try{
        const data = await userModel.findOne({ email: req.body.email });

        if (data) {
            if (data.status === false) {
                if (data.admin === true) {
                    const pwd = data.password;

                    if (bcrypt.compareSync(req.body.password, pwd)) {
                        const token = jwt.sign({
                            id: data._id,
                            name: data.name,
                            email: data.email,
                            role:data.role
                        }, process.env.JWT_KEY, { expiresIn: "24h" });

                        res.cookie('adminToken', token);
                        res.redirect('/admin/dashboard');
                    } else {
                        req.flash('message', "Password Not Match.....");
                        console.log("Password Not Match.....");
                        res.redirect('/admin');
                    }
                } else {
                    req.flash('message', "You are not Admin");
                    console.log("Admin False...");
                    res.redirect('/admin');
                }
            } else {
                req.flash('message', "Email Not Exist.......");
                console.log('Email Not Exist.......');
                res.redirect('/admin');
            }
        } else {
            req.flash('message', "Email Not Found.......");
            console.log('Email Not Found.......');
            res.redirect('/admin');
        }

    }catch(err){
        console.error(err);
        req.flash('message', "An error occurred. Please try again later.");
        res.redirect('/admin');

    }

}

const adminAuth = (req, res, next) => {
    if (req.admin) {
        console.log(req.admin);
        next();
    } else {
        console.log('Err While Admin Auth');
        res.redirect('/admin')
    }
}

const adminlogout=(req,res)=>{
    res.clearCookie('adminToken')
    res.redirect('/admin')

}

const alluser = async (req, res) => {
    try {
        const users = await userModel.find({ role: 'student' });
        res.render('Admin/alluser/index', {
            title: 'All User',
            admin: req.admin,
            users,
            url: req.url
        });
    } catch (err) {
        console.log(err);
        // Handle the error, e.g., send an error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// const switchStatusOfUser = async (req, res) => {
//   try {
//     // Ensure that req.params.id is present
//     if (!req.params.id) {
//       console.error("Parameter 'id' is missing.");
//       // Flash an error message and redirect to the users page
//       req.flash("switch", "Failed!");
//       return res.redirect("/admin/users");
//     }

//     // Find the user by ID to get the previous isActive value
//     const prevValue = await userModel.findById(req.params.id);

//     // Update the user's isActive property to its opposite value
//     await userModel.findByIdAndUpdate(req.params.id, {
//       isActive: !prevValue.isActive,
//     });

//     // Flash a success message and redirect to the users page
//     req.flash("switch", "Success.");
//     return res.redirect("/admin/alluser");
//   } catch (error) {
//     console.error(error);
//     // Flash an error message and redirect to the users page
//     req.flash("switch", "Failed!");
//     return res.redirect("/admin/alluser");
//   }
// };

const switchStatusOfUser = async (req, res) => {
    try {
      // Ensure that req.params.id is present
      if (!req.params.id) {
        console.error("Parameter 'id' is missing.");
        throw new Error("Parameter 'id' is missing.");
      }
  
      // Find the user by ID to get the previous isActive value
      const user = await userModel.findById(req.params.id);
  
      // Ensure the user is found
      if (!user) {
        console.error("User not found.");
        throw new Error("User not found.");
      }
  
      // Toggle the isActive property
      user.isActive = !user.isActive;
  
      // Save the updated user
      await user.save();
  
      // Flash a success message and redirect to the users page
      req.flash("switch", "Success.");
      return res.redirect("/admin/alluser");
    } catch (error) {
      console.error(error);
  
      // Flash an error message and redirect to the users page
      req.flash("switch", "Failed!");
      return res.redirect("/admin/alluser");
    }
};
  

module.exports={
    dashboard,login,
    adminloginpost,
    adminAuth,
    adminlogout,
    alluser,
    switchStatusOfUser
}