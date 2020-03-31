var mongoose = require('mongoose')

var WorkoutSchema = new mongoose.Schema({
  userId: Number,
  created: { type: Date, default: Date.now },
  deck: [[ mongoose.Schema.Types.Mixed ]],
  exercises: {
    hearts: String,
    diamonds: String,
    clubs: String,
    spades: String
  },
  time: [Number],
  from: {
    id: String,
    time: { type: [Number], default: undefined },
    created: { type: Date },
    name: String,
    email: String
  }
})

module.exports = mongoose.model('Workout', WorkoutSchema)
