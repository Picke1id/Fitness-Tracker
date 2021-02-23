// Setting Dependencies
const router = require("express").Router();
const Workout = require("../models/workout.js");

// Get Route to Display All Workouts
router.get("/api/workouts/all", (req, res) => {
  Workout.find({}).then(dbWorkouts => {
      res.json(dbWorkouts);
    }).catch(err => {
      res.json(err);
    });
});

// Get Route to Retrieve a Range of Workouts
router.get("/api/workouts/range", ({ query }, res) => {
  Workout.find({ day: {$gte: new Date(new Date().setDate(new Date().getDate()-7)), $lte: new Date()}})
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    }).catch(err => {
      res.json(err);
    });
});

// Post Route to Enter New Exercise into Database
router.post("/api/workouts", (req, res) => {
  Workout.create({}).then(dbWorkout => {
      res.json(dbWorkout);
    }).catch(err => {
      res.json(err);
    });
});

// Put Route to Update Exercise
router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  ).then(dbWorkout => {
      res.json(dbWorkout);
    }).catch(err => {
      res.json(err);
    });
});

// Delete Route to Remove an Exercise from the Database 
router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    }).catch(err => {
      res.json(err);
    });
});

// Exporting Routes to server.js file
module.exports = router;