const express=require('express');
const Route=express.Router()
const HomeController=require('../../controller/User/HomeController')
const auth=require('../../middleware/verify')
const userAuth = require('../../middleware/userAuth')
const jwt = require('jsonwebtoken')
const userCourseController = require('../../controller/User/userCourseController')
const postController = require('../../controller/User/userPostController')



//Route.get('/',[userAuth.jwtAuth],HomeController.userAuth,[userAuth.isStudent],HomeController.home)
//Route.get('/',[userAuth.jwtAuth],HomeController.userAuth,[userAuth.isAdmin],HomeController.home)

Route.get('/', [userAuth.jwtAuth],HomeController.userAuth, [userAuth.isStudent], HomeController.home);


//Route.get('/', [userAuth.jwtAuth, userAuth.isAdmin, HomeController.userAuth], HomeController.home);
//Route.get('/courseDetail',[userAuth.jwtAuth],HomeController.userAuth,HomeController.courseDetail)
Route.get('/gallery',[userAuth.jwtAuth],HomeController.userAuth,HomeController.gallery)
Route.get('/contact',[userAuth.jwtAuth],HomeController.userAuth,HomeController.contact)
//Route.get('/blogSingle',[userAuth.jwtAuth],HomeController.userAuth,HomeController.blogSingle)
//Route.get('/blogArchive',[userAuth.jwtAuth],HomeController.userAuth,HomeController.blogArchive)
Route.get('/404',[userAuth.jwtAuth],HomeController.userAuth,HomeController.errorpage)



//for student dashboard
Route.get('/allstudent',[userAuth.jwtAuth],HomeController.userAuth,[userAuth.isStudent],HomeController.allstudent)

//for login
Route.get('/userlogin',HomeController.userlogin)
Route.get('/userregistration',HomeController.userregistration)

Route.post('/createRegistration',[auth.checkDuplicate],HomeController.createRegistration)
Route.get('/confirmation/:email/:token',HomeController.confirmation)
Route.post('/userloginpost',HomeController.userloginpost)
Route.get('/userlogout',HomeController.userlogout)


//for course
Route.get('/courses',[userAuth.jwtAuth],HomeController.userAuth,[userAuth.isStudent],userCourseController.renderAllCourses) //both
Route.get("/courses/:id",[userAuth.jwtAuth],HomeController.userAuth,[userAuth.isStudent],userCourseController.renderSingleCourse); //for employee

Route.post("/buy-course",[userAuth.jwtAuth],HomeController.userAuth,[userAuth.isStudent],userCourseController.byCourse); //for user


//for blog page
Route.get("/posts",[userAuth.jwtAuth],HomeController.userAuth,[userAuth.isStudent],postController.renderAllPost);
Route.get("/post/:id",[userAuth.jwtAuth],HomeController.userAuth,[userAuth.isStudent],postController.renderSinglePostPage);
Route.post("/comment/:id",[userAuth.jwtAuth],HomeController.userAuth,[userAuth.isStudent],postController.addComment);
Route.patch("/add-like/:id",[userAuth.jwtAuth],HomeController.userAuth,[userAuth.isStudent], postController.addLike);

module.exports=Route