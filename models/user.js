var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: { type: Number, index: true }
})

module.exports = mongoose.model('User', UserSchema)
