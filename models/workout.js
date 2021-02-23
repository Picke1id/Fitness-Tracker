// Setting Dependency
const mongoose = require("mongoose");

// Setting Mongoose Schema variable
const Schema = mongoose.Schema;

// Creating Method for Schema
const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now
        },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: "Enter an exercise type"
                },
                name: {
                    type: String,
                    trim: true,
                    required: "Enter a name for this exercise"
                },
                duration: {
                    type: Number,
                    required: "Enter the duration of this exercise (minutes)"
                },
                weight: {
                    type: Number,
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                distance: {
                    type: Number
                }
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// Creating virtual method to track duration of exercise(s)
workoutSchema.virtual("totalDuration").get(function(){
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

// Creating variable to attach schema to database
const Workout = mongoose.model("Workout", workoutSchema);

// Exporting model to be used in index.js file
module.exports = Workout;