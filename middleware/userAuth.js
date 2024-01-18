const jwt = require('jsonwebtoken')


exports.jwtAuth = async (req, res, next) => {
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken, process.env.JWT_KEY, (err, data) => {
            if (err) {
                console.error(err);
                next(); // Continue to the next middleware or route
            } else {
                req.user = data;
                console.log(req.user);
                next();
            }
        });
    } else {
        next();
    }
};


//   exports.isStudent = (req, res, next) => {
//     try {
//       if (req.user && req.user.role === "student") {
//         next();
//       } else {
//         return res.status(401).json({
//           status: false,
//           message: "This is a protected route for Students",
        
//         });
//       }
//     } catch (err) {
//       console.log(err.message);
//       return res.status(500).json({
//         status: false,
//         message: "User role is not matching",
//       });
//     }
// };
  


exports.isStudent = (req, res, next) => {
  try {
      if (req.user && (req.user.role === "student" || req.user.role === "admin")) {
          next();
      } else {
          console.log('Not a Student or Admin'); 
          return res.status(401).json({
              status: false,
              message: "This is a protected route for Students and Admins",
          });
      }
  } catch (err) {
      console.log(err.message);
      return res.status(500).json({
          status: false,
          message: "User role is not matching",
      });
  }
};




exports.isAdmin = (req, res, next) => {
    try {
        console.log('User Role:', req.user.role); // Add this line
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            console.log('Not an Admin'); // Add this line
            return res.status(401).json({
                status: false,
                message: "This is a protected route for Admins",
            });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            status: false,
            message: "User role is not matching",
        });
    }
};
