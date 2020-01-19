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
    required : true,
    minLength: 6
  },
  image: {
    type: String
  },
  favorite_club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club"
  },
  is_admin: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
})

module.exports = mongoose.model('user', UserSchema)
