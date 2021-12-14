// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const EMAIL_VALIDATION =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.User.findOne({
        where: {
          id: req.user.id,
        },
      }).then(function (data) {
        res.json(data);
      });
    }
  });

  // Helper Function to grab all Warmups
  function generateWarmups() {
    return new Promise((resolve) => {
      const warmups = [];
      db.Exercise.findAll({
        where: {
          category: "Warmup",
        },
      }).then(function (data) {
        data.forEach((warmup) => {
          warmups.push(warmup.dataValues.exercise_name);
        });
        resolve(warmups);
      });
    });
  }

  // Helper Function to grab all exercises applicable to the user's gym
  function generateExercises(equipment) {
    return new Promise((resolve) => {
      const exercises = [];
      equipment.forEach((element, index, array) => {
        db.Exercise.findAll({
          where: {
            equipment: element,
          },
        }).then(function (data) {
          data.forEach((exercise) => {
            exercises.push({
              exercise_name: exercise.dataValues.exercise_name,
              category: exercise.dataValues.category,
              equipment: exercise.dataValues.equipment,
            });
          });
          if (index === array.length - 1) {
            resolve(exercises);
          }
        });
      });
    });
  }

  app.get("/api/getExercises", async function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      const warmups = await generateWarmups();
      const equipment = JSON.parse(req.user.equipment);
      equipment.push("None");
      const exercises = await generateExercises(equipment);

      res.json({ warmups: warmups, exercises: exercises });
    }
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
