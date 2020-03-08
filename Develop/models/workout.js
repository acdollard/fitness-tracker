const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const opts = {toJSON: {virtuals:true}}
const workoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    exercises: []
        
}, opts)


workoutSchema.virtual('totalDuration').get(function() {
let totalDuration = 0; 
for (const exercise of this.exercises){
  totalDuration += this.duration
}
return totalDuration;
}

)

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout; 