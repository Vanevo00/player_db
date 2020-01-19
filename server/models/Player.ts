export {} // avoiding TS redeclaration error
const mongoose = require('mongoose')

const PlayerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  alias: {
    type: String
  },
  club: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'clubs',
    required: true
  },
  birthDate: {
    type: Date
  },
  mainImage: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'users'
  }
})

module.exports = mongoose.model('player', PlayerSchema)
