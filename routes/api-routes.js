const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts/all", (req, res) => {
  Workout.find({}).then(dbWorkouts => {
      res.json(dbWorkouts);
    }).catch(err => {
      res.json(err);
    });
});

router.get("/api/workouts/range", ({ query }, res) => {
  Workout.find({ day: {$gte: new Date(new Date().setDate(new Date().getDate()-7)), $lte: new Date()}})
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    }).catch(err => {
      res.json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  Workout.create({}).then(dbWorkout => {
      res.json(dbWorkout);
    }).catch(err => {
      res.json(err);
    });
});

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

router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    }).catch(err => {
      res.json(err);
    });
});

module.exports = router;