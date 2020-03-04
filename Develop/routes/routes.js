const express = require("express")
const db = require("../models/workout");
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
        db.Workout.find({})
            .then(dbWorkouts => {
                res.json(dbWorkouts);
            })
            .catch(err => {
                res.send(err)
            })
    })

    app.put("/api/workouts/:id", function(req, res) {
        
    })

    app.post("/api/workouts", function(req, res) {
        db.Workout.create({body})
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

