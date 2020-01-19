const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  image: {
    type: String
  },
  favoriteClub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clubs'
  },
  is_admin: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('user', UserSchema)
