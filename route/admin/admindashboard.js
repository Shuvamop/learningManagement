const express=require('express');
const Route=express.Router()
const DashboardController=require('../../controller/Admin/DashboardController')
//const BannerController= require('../../controller/Admin/adminHomeContent/bannerController')
const adminAuth = require('../../middleware/admin/adminAuth')
const verify=require('../../middleware/verify')
const singleUplaod = require('../../multerConfig')
const adminCourseController = require('../../controller/Admin/adminCourseController')
const postcontroller = require('../../controller/Admin/adminPostController')
const adminHomeController = require('../../controller/Admin/adminHomeController')

//for admin dashboard
Route.get('/dashboard',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,DashboardController.dashboard)
//Route.get('/dashboard', [adminAuth.jwtAdminAuth, adminAuth.isAdmin],DashboardController.adminAuth, DashboardController.dashboard);

//Route.get('/dashboard', adminAuth.jwtAdminAuth, DashboardController.isAdmin, DashboardController.dashboard);
Route.get('/',DashboardController.login)
Route.post('/adminloginpost',DashboardController.adminloginpost)
Route.get('/adminlogout',DashboardController.adminlogout)

//admin for all student status
Route.get('/alluser',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,[adminAuth.isAdmin],DashboardController.alluser)
Route.get("/activate-user/:id",[adminAuth.jwtAdminAuth],DashboardController.adminAuth,[adminAuth.isAdmin],DashboardController.switchStatusOfUser);


//for admin homeContent
//Route.get('/bannerlisting',BannerController.bannerlisting)

//for course 
Route.get('/view/addcourse',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,adminCourseController.renderAddCoursesPage)
Route.post('/add/course',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,singleUplaod.single('image'),adminCourseController.addCourses) //employee
Route.get('/allcourse',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,adminCourseController.allCourse)
Route.get('/activate/course/:id',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,adminCourseController.switchStatusOfCourse)

//for post
Route.get("/add-post",[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,postcontroller.renderAddPostPage);
Route.post("/add/post",[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,singleUplaod.single('image'),postcontroller.addPost);
Route.get("/all-posts",[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,postcontroller.renderAllPostPage);
Route.get("/activate-post/:id",[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,postcontroller.switchStatusOfPost);


//admin homecontroller
//banner
Route.get('/banner',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,adminHomeController.adminhome_banner)
Route.post('/bannercreate/varsity',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,singleUplaod.single('image'),adminHomeController.bannercreate)

//feature
Route.get('/feature',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,adminHomeController.adminhome_feature)
Route.post('/featurecreate/varsity',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,singleUplaod.single('image'),adminHomeController.featurecreate)

//about
Route.get('/about',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,adminHomeController.adminhome_about)
Route.post('/aboutcreate/varsity',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,singleUplaod.single('image'),adminHomeController.aboutcreate)

//facility

Route.get('/facility',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,adminHomeController.adminhome_facility)
Route.post('/facilitycreate/varsity',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,singleUplaod.single('image'),adminHomeController.facilitycreate)

//teacher

Route.get('/teacher',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,adminHomeController.adminhome_teacher)
Route.post('/teachecreate/varsity',[adminAuth.jwtAdminAuth],DashboardController.adminAuth,adminAuth.isAdmin,singleUplaod.single('image'),adminHomeController.teachercreate)

module.exports=Route