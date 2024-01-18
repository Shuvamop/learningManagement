const courseModel = require("../../model/courseModel");
const postModel = require("../../model/postModel");
const path = require("path");

const renderAddPostPage = (req, res) => {
  return res.render("Admin/addpost", {
    error: "",
    title: "Add Post Page",
    value: "",
    admin: req.admin,
    url: req.url,
  });
};

// const addPost = async (req, res) => {
//   try {
//     const imageDetails = req.file;
//     const adminId = req?.admin?.id;
//     const { title, subTitle, description } = req.body;
//     console.log(req.body);

//     const postModel = new postModel({
//       title,
//       subTitle,
//       description,
//       image: imageDetails.path,
//       adminId,
//     });

//     await postModel.save();

//     req.flash("success", "Post added successfully.");
//     return res.redirect("/admin/all-posts");
//   } catch (error) {
//     req.flash("error", "Post add failed. Try again..!");
//     return res.redirect("/admin/all-posts");
//   }
// };

const addPost = async (req, res) => {
  const { title, subTitle, description } = req.body;
  const image = req.file?.filename; // Assuming you are using multer for file uploads

  try {
    // Manual validation
    if (!title || !subTitle || !description || !image) {
      return res.render("Admin/addPost/index.ejs", {
        error: "All fields are required",
        title: "Add Post Page",
        value: req.body,
        admin: req.admin,
        url: req.url,
      });
    }

    const newModel = new postModel({
      title,
      subTitle,
      description,
      image,
      adminId: req.admin.id,
    });

    await newModel.save();

    req.flash("success", "Post added successfully.");
    return res.redirect("/admin/all-posts");
  } catch (error) {
    // Handle errors, maybe delete the uploaded image if it fails

    req.flash("error", "Post add failed. Try again..!");
    return res.redirect("/admin/all-posts");
  }
};

const renderAllPostPage = async (req, res) => {
  try {
    const posts = await postModel.find();
    return res.render("Admin/allPosts", {
      error: "",
      flashMsg: {
        error: req.flash("error"),
        msg: req.flash("msg"),
        success: req.flash("success"),
      },
      title: "All Post Page",
      posts,
      admin: req.admin,
      url: req.url,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const switchStatusOfPost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      console.log("Parameter id is missing");
      return res.status(400).send({ message: "Parameter id is missing" });
    }

    const post = await postModel.findById(postId);

    if (!post) {
      console.log("Course not found");
      return res.status(404).send({ message: "post not found" });
    }

    // Toggle the isActive status
    post.isActive = !post.isActive;

    // Save the updated course
    await post.save();

    // Redirect to the course list page
    return res.redirect("/admin/all-posts");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Internal server error", error: err.message });
  }
};

module.exports = {
  renderAddPostPage,
  addPost,
  renderAllPostPage,
  switchStatusOfPost,
};
