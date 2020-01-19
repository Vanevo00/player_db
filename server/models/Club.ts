export {} // avoiding TS redeclaration error
const mongoose = require('mongoose')

const ClubSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'users'
  }
})

module.exports = mongoose.model('club', ClubSchema)
