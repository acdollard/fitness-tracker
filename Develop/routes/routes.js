const express = require("express")
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");
const path = require("path");


module.exports  = function(app){
    //HTML ROUTES--------------------------------
    app.get("/stats", function(req, res) {
        res.sendFile(path.join(__dirname + `/../public/stats.html`))
    })


    app.get("/exercise", function(req, res) {
        res.sendFile(path.join(__dirname + `/../public/exercise.html`))
    })

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname + `/../public/index.html`))
    })


    //API ROUTES----------------------------------
    app.get("/api/workouts", function(req, res) {
        Workout.find({})
            .then(dbWorkouts => {
                res.json(dbWorkouts);
            })
            .catch(err => {
                res.send(err)
            })
    })

//this is a route for adding exercises to a workout
    app.put("/api/workouts/:id", function({body}, res) {
        //first create a new instance of the Exercise Schema with the data that comes in
        const exercise = new Exercise(body);

        //then create a new exercise document
        Exercise.create(exercise)
            //then update the workout by pushing the new exercise into it
            .then(({_id}) => Workout.findOneAndUpdate(
                {_id: mongojs.ObjectId(params.id)},
                {$push: {exercises: _id}}, { new: true}))
            //then send the updated workout back to the front end
            .then(dbExercise => {
                res.json(dbExercise);
            })
            .catch(err => {
                res.send(err);
            })
    })

    app.post("/api/workouts", function(req, res) {
        db.Workout.create({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.send(err)
        })
    })

    app.get("/api/workouts/range", function(req, res) {
        
    })
}

