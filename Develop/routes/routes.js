const express = require("express")
const Workout = require("../models/workout");
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
                console.log("WHAT THE FUCK IS UP");
                res.json(dbWorkouts);
            })
            .catch(err => {
                res.send(err)
            })
    })

//this is a route for adding exercises to a workout
    app.put("/api/workouts/:id", function(req, res) {
        console.log(req.params.id);
        console.log(req.body)
        Workout.findByIdAndUpdate(req.params.id , { $push: { exercises: req.body } }, { new: true })
        .then(dbLibrary => {
          res.json(dbLibrary);
        })
        .catch(err => {
          res.json(err);
        });


    })

    app.post("/api/workouts", function(req, res) {
        Workout.create({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.send(err)
        })
    })

    app.get("/api/workouts/range", function(req, res) {
        console.log(new Date().setDate(new Date().getDate()-7))
        Workout.find({})
        .then(dbRange => {
            // console.log(dbRange);
            res.json(dbRange);
        })
        .catch(err => {
            res.send(err)
        })
    })
}

