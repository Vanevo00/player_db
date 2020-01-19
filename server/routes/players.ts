// eslint-disable-next-line
import express, { Request, Response } from 'express'
const { check, validationResult } = require('express-validator')
const router = express.Router()
const auth = require('../middleware/auth')

const Player = require('../models/Player')
const User = require('../models/User')

// @route  GET api/players
// @desc   Get all players
// @access Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const allPlayers = await Player.find({})
    res.json(allPlayers)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  POST  api/players
// @desc   Add new player
// @access Registered users
router.post('/', auth, [ // auth middleware to be added
  check('firstName', 'first name is required').not().isEmpty(),
  check('lastName', 'first name is required').not().isEmpty(),
  check('club', 'a player has to belong to a club').not().isEmpty()
], async (req: any, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { firstName, lastName, alias, club, birthDate, mainImage } = req.body

  try {
    const newPlayer = new Player({
      firstName,
      lastName,
      alias,
      club,
      birthDate,
      mainImage,
      user: req.user.id
    })

    const player = await newPlayer.save()

    res.json(player)
  } catch (err) {
    console.error(err)
    res.status(500).send('an error has occurred')
  }
})

// @route  PUT api/players
// @desc   Update player information
// @access Admin or creator
router.put('/:id', auth, async (req: any, res: Response) => {
  try {
    const [loggedInUser, playerToBeUpdated] = await Promise.all([
      User.findOne({ _id: req.user.id }),
      Player.findOne({ _id: req.params.id})
    ])
    if (loggedInUser.isAdmin || String(playerToBeUpdated.user) === String(loggedInUser._id)) {
      await Player.findByIdAndUpdate(req.params.id, req.body)
      res.json(req.body)
    } else {
      res.send('unauthorised')
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  DELETE api/players
// @desc   Delete Players
// @access Admin or creator only
router.delete('/:id', auth, async (req: any, res: Response) => { // auth middleware to be added
  try {
    const [loggedInUser, playerToBeUpdated] = await Promise.all([
      User.findOne({ _id: req.user.id }),
      Player.findOne({ _id: req.params.id})
    ])
    if (loggedInUser.isAdmin || String(playerToBeUpdated.user) === String(loggedInUser._id)) {
      await Player.deleteOne({ _id: req.params.id })
      res.send('delete successful')
    } else {
      res.send('unauthorised')
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

module.exports = router
