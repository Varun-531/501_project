// middleware.js

function isAdmin(req, res, next) {
    // Check if the user is an admin
    if (req.user && req.user.is_admin) {
      return next();
    } else {
      res.redirect("/home"); // Redirect non-admin users
    }
  }
  
  module.exports = { isAdmin };
  