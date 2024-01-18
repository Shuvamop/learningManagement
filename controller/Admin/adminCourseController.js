const courseModel = require('../../model/courseModel')
const path = require('path')


const renderAddCoursesPage =(req,res)=>{    
    res.render('Admin/addCourses',{
        error: "",
        title:"Admin AddCourse Page",
        value: "allActiveCourses",
        admin:req.admin
    })
}

const addCourses = async (req, res) => {
    try {
      const banner = req.file;
      const adminId = req?.admin?.id;
  
      const model = new courseModel({
        tropic: req.body.tropic,
        description: req.body.description,
        price: parseInt(req.body.price, 10),
        courseDuration: req.body.courseDuration,
        schedule: {
          days: [req.body.scheduleDay1, req.body.scheduleDay2, req.body.scheduleDay3],
          time: req.body.scheduleTime,
          location: req.body.scheduleLocation,
        },
        adminId,
        image: banner?.filename,
      });
  
      await model.save();
  
      req.flash("msg", "Course added successfully.");
      return res.redirect("/admin/view/addcourse");
    } catch (error) {
      console.error(error.message);
     // banner && destroyAFile(banner.filename);
      return res.redirect("/admin/login");
    }
}; 

const allCourse = async (req, res) => {
  try {
    const courses = await courseModel.find();

    return res.render("Admin/allCourse", {
      error: "",
      title: "All Course Page",
      courses,
      admin: req.admin,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const switchStatusOfCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Check if courseId is missing
    if (!courseId) {
      console.log('Parameter id is missing');
      return res.status(400).send({ message: 'Parameter id is missing' });
    }

    // Find the course by ID
    const course = await courseModel.findById(courseId);

    // Check if the course is not found
    if (!course) {
      console.log('Course not found');
      return res.status(404).send({ message: 'Course not found' });
    }

    // Toggle the isActive status
    course.isActive = !course.isActive;

    // Save the updated course
    await course.save();

    // Redirect to the course list page
    return res.redirect('/admin/allcourse');
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};



module.exports={
    renderAddCoursesPage,
    addCourses,
    allCourse,
    switchStatusOfCourse
}