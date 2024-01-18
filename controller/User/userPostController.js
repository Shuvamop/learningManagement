const postModel = require("../../model/postModel");
const commentModel = require("../../model/commentModel");

const renderAllPost = async (req, res) => {
  try {
    const posts = await postModel.find({ isActive: true });
    return res.render("User/posts/blogArchive", {
      error: "",
      title: "Blog Page",
      value: "",
      posts,
      user: req.user,
      url: req.url,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: `The error is ${err.message}` });
  }
};

const renderSinglePostPage = async (req, res) => {
  const param = req.params;
  try {
    if (!param.id) {
      return res.status(401).send("id not found");
    }
    const post = await postModel.findOne({
      _id: param.id,
      isActive: true,
    });

    const relatedPost = await postModel.find({
      isActive: true,
      _id: { $ne: param.id },
    });

    const aggregationPostComment = await postModel.aggregate([
      { $match: { _id: post._id } },
      {
        $lookup: {
          from: "commentmodels",
          localField: "commentIds",
          foreignField: "_id",
          as: "commentInfo",
          pipeline: [
            {
              $lookup: {
                from: "loginmodels",
                localField: "userId",
                foreignField: "_id",
                as: "authInfo",
              },
            },
            {
              $project: {
                email: 0,
                password: 0,
              },
            },
          ],
        },
      },
      {
        $project: {
          title: 0,
          banner: 0,
          subTitle: 0,
          description: 0,
          publishedDate: 0,
          isActive: 0,
          adminId: 0,
          like: 0,
          __v: 0,
          updatedAt: 0,
          commentIds: 0,
        },
      },
    ]);

    return res.render("User/posts/blogSingle", {
      error: "",
      title: "Post Page",
      flashMsg: {
        error: req.flash("error"),
        success: req.flash("success"),
        msg: req.flash("msg"),
      },
      post,
      comments: aggregationPostComment[0]?.commentInfo,
      relatedPost,
      user: req.user,
      url: req.url,
    });
  } catch (error) {
    console.log(error?.message);
    return res.redirect("/login");
  }
};

// const addComment = async (req, res) => {
//   try {
//     console.log('shuvam');
//     const newComment = await commentModel.create({
//       body: req.body.comment,
//       userId: req?.user?.id,
//       postId: req.params.id,
//     });

//     await postModel.findByIdAndUpdate(newComment.postId, {
//       $push: { commentIds: newComment._id },
//     });

//     req.flash("success", "Comment added successfully");
//     return res.redirect(`/post/${req.params.id}#commentSection`);
//   } catch (error) {
//     // console.log(error?.message);
//     // req.flash("error", "Comment addition failed. Please try again!");
//     // return res.redirect(`/post/${req.params.id}#commentSection`);
//     console.error(error);  // Log the error for debugging
//     req.flash("error", "Comment addition failed. Please try again!");
//     return res.redirect(`/post/${req.params.id}#commentSection`);
//   }
// };

// const addComment = async (req, res) => {
//   try {
//     // Check if user is authenticated
//     if (!req?.user?.id) {
//       req.flash("error", "User not authenticated");
//       return res.redirect(`/post/${req.params.id}#commentSection`);
//     }

//     // Check if comment body is provided
//     if (!req.body.comment) {
//       req.flash("error", "Comment body is missing");
//       return res.redirect(`/post/${req.params.id}#commentSection`);
//     }

//     const newComment = await commentModel.create({
//       body: req.body.comment,
//       userId: req.user.id,
//       postId: req.params.id,
//     });

//     await postModel.findByIdAndUpdate(newComment.postId, {
//       $push: { commentIds: newComment._id },
//     });

//     req.flash("success", "Comment added successfully");
//     return res.redirect(`/post/${req.params.id}#commentSection`);
//   } catch (error) {
//     console.error(error);
//     req.flash("error", "Comment addition failed. Please try again!");
//     return res.redirect(`/post/${req.params.id}#commentSection`);
//   }
// };


const addComment = async (req, res) => {
  const param = req.params;
  const payload = req.body;
  
  try {
    const Model = new commentModel({
      body: payload.comment,
      userId: req.user._id,
      postId: param.id,
    });
    const newComment = await Model.save();
    await postModel.findByIdAndUpdate(newComment.postId, {
      $push: { commentIds: newComment.id }
    });
    req.flash("success", "Comment added successFully");
    return res.redirect(`/post/${param.id}#commentSection`);
  } catch (error) {
    console.log(error?.message);
    req.flash("error", "Comment added failed..! try again!");
    return res.redirect(`/post/${param.id}#commentSection`);
  }
};

const addLike = async (req, res) => {
  try {
    const postId = req.params.id;

    // Check if user is authenticated
    

    // Validate postId
    if (!postId) {
      throw new Error("Bad request. Post ID is required.");
    }

    // Find the post
    const post = await postModel.findById(postId);

    // Check if the post exists
    if (!post) {
      throw new Error("Post not found.");
    }

    // Update the post with an increased like count
    const updatedPost = await postModel.findByIdAndUpdate(
      post._id,
      { $inc: { like: 1 } }, // Increment the 'like' field by 1
      { new: true }
    );

    // Send the updated like count in the response
    return res.status(200).json({
      message: "Success",
      status: 200,
      like: updatedPost.like,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};





module.exports = {
  renderAllPost,
  renderSinglePostPage,
  addComment,
  addLike
};
