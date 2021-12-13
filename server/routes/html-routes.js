// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/routine", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/routine.html"));
  });

  app.get("/gym", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/gym.html"));
  });

  app.get("/home", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/home.html"));
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../../public/pages/login.html"));
  });

  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/signup.html"));
  });

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/landing.html"));
  });

  // 404 Page Error
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/404.html"));
  });
};
