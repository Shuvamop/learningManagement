const userModel = require("../../model/loginModel");
const courseModel = require("../../model/courseModel");

const renderAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({ isActive: true });

    return res.render("User/courses/course.ejs", {
      error: "",
      title: "Courses Page",
      value: "",
      courses,
      user: req.user,
      url: req.url,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: `The error is ${err.message}` });
  }
};

const renderSingleCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    if (!courseId) {
      throw new Error("Bad Request");
    }

    const course = await courseModel.findOne({
      _id: courseId,
      isActive: true,
    });

    const relatedCourse = await courseModel.find({
      isActive: true,
      _id: { $ne: courseId },
    });

    return res.render("User/courses/courseDetail", {
      error: "",
      title: "Courses Page",
      course,
      relatedCourse,
      user: req.user,
      url: req.url,
    });
  } catch (error) {
    console.error(error?.message);
    return res.redirect("/");
  }
};

// const byCourse = async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const courseId = req.body.courseId;

//     const user = await userModel.findById(userId);
//     const course = await courseModel.findById(courseId);

//     if (!user || !course) {
//       return res.status(401).send('Could not find the user or course');
//     }

//     if (!user.coursesIds.includes(course._id)) {
//       await userModel.findByIdAndUpdate(user._id, {
//         $push: { coursesIds: course._id },
//       });
//     }

//     if (!course.purchaseIds.includes(user._id)) {
//       await courseModel.findByIdAndUpdate(course._id, {
//         $push: { purchaseIds: user._id },
//       });
//     }

//     return res.status(200).json({ message: 'Course purchase successful' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send('Some internal error');
//   }
// };

// const byCourse = async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const courseId = req.body.courseId;

//     const user = await userModel.findById(userId);
//     const course = await courseModel.findById(courseId);

//     if (!user || !course) {
//       return res.status(401).send('Could not find the user or course');
//     }

//     if (!user.coursesIds.includes(course._id)) {
//       await userModel.findByIdAndUpdate(user._id, {
//         $push: { coursesIds: course._id },
//       });
//     }
//     if (!course.purchaseIds.includes(user._id)) {
//       await courseModel.findByIdAndUpdate(course._id, {
//         $push: { purchaseIds: user._id },
//       });
//     }

//     return res.status(200).json({ message: 'Course purchase successful' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send('Some internal error');
//   }
// };

// const byCourse = async (req, res) => {
//   const payload = req.body;

//   try {
//     const user = await userModel.findById(payload.userId);
//     const course = await courseModel.findById(payload.courseId);

//     console.log(user);
//     console.log(course);

//     if (!user || !course) {
//       return res.status(404).json({ error: 'Not Found' });
//     }

//     if (!user.coursesIds.includes(course._id)) {
//       await userModel.findByIdAndUpdate(user._id, {
//         $push: { coursesIds: course._id },
//       });
//     }

//     if (!course.purchaseIds.includes(user._id)) {
//       await courseModel.findByIdAndUpdate(course._id, {
//         $push: { purchaseIds: user._id },
//       });
//     }

//     req.flash('success', 'Purchase successful.');
//     return res.status(200).json({ data: 'success', status: 200 });
//   } catch (error) {
//     console.error(error);
//     req.flash('error', 'Failed to purchase.');
//     return res.status(error?.status || 500).json({ error: error?.message });
//   }
// };

const byCourse = async (req, res) => {
  const payload = req.body;

  try {
    const user = await userModel.findById(payload.userId);
    const course = await courseModel.findById(payload.courseId);

    if (!user || !course) {
      return res.status(404).json({ error: "Not Found" });
    }

    if (!user.coursesIds.includes(course._id)) {
      await userModel.findByIdAndUpdate(user._id, {
        $push: { coursesIds: course._id },
      });
    }

    if (!course.purchaseIds.includes(String(user._id))) {
      await courseModel.findByIdAndUpdate(course._id, {
        $push: { purchaseIds: String(user._id) },
      });
    }
    req.flash("success", "Purchase successful.");
    return res.redirect("/courses"); // Redirect to the course details page or any other appropriate page
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to purchase.");
    return res.redirect("/courses"); // Redirect to the course details page or any other appropriate page
  }
};

module.exports = {
  renderAllCourses,
  renderSingleCourse,
  byCourse,
};
