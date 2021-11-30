// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const EMAIL_VALIDATION =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const caber = require("caber");
const warmup = caber.parse(
  "Jumping Jacks\nWalking Knee Hugs\nArm Circles\nSide Shuffles\nBackpedaling\nLunges\nLeg Swings\nInch Worms\nCrab Walk\nNeck Stretch\nTricep Stretch\nShoulder Stretch\nDynamic Chest\nMid Back Turn\nHip Circles\nToe Touches\nNeck Tilts"
);

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    // Test to make sure email is valid, if not send back an error
    if (!EMAIL_VALIDATION.test(req.body.email)) {
      return res.status(400).json({ error: true, type: "invalidEmail" });
    }

    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/login");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/userData", function (req, res) {
    console.log(req.user);
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.User.findOne({
        where: {
          id: req.user.id,
        },
      }).then(function (data) {
        res.json(
          data
          // equipment: data.equipment
          // id: data.id,
          // email: data.email,
          // equipment: data.equipment
        );
      });
      // instead of grabbing logged in user, go to the database where user's id = id, then grab his info and res.json that information to the front-end
    }
  });

  app.get("/api/warmup", function (req, res) {
    res.json(warmup);
  });
  //Route to update user data
  app.put("/api/userData", function (req, res) {
    db.User.update(
      {
        equipment: req.body.equipment,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then(function (user) {
      res.json(user);
    });
  });
};
