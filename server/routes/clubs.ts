// eslint-disable-next-line
import express, { Request, Response } from 'express'
const { check, validationResult } = require('express-validator')
const router = express.Router()
const auth = require('../middleware/auth')

const Club = require('../models/Club')
const User = require('../models/User')

interface RequestUser extends Request {
  user: string
}

// @route  GET api/clubs
// @desc   Get all clubs
// @access Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const allClubs = await Club.find({})
    res.json(allClubs)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  POST  api/clubs
// @desc   Add new club
// @access Registered users
router.post('/', auth, [ // auth middleware to be added
  check('name', 'club name is required').not().isEmpty(),
  check('country', 'country name is required').not().isEmpty()
], async (req: any, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, country, image } = req.body

  try {
    const existingClub = await Club.findOne({ name })

    if (existingClub) {
      return res.status(400).json({ msg: 'club with this name already exists' })
    }

    const newClub = new Club({
      name,
      country,
      image,
      user: req.user.id
    })

    const club = await newClub.save()

    res.json(club)
  } catch (err) {
    console.error(err)
    res.status(500).send('an error has occurred')
  }
})

// @route  PUT api/clubs
// @desc   Update club information
// @access Admin only
router.put('/:id', auth, async (req: any, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.user.id })
    if (!user.isAdmin) {
      return res.send('unauthorised, admins only')
    }
    await Club.findByIdAndUpdate(req.params.id, req.body)
    res.json(req.body)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  DELETE api/clubs
// @desc   Delete Club
// @access Admin only
router.delete('/:id', auth, async (req: any, res: Response) => { // auth middleware to be added
  try {
    const user = await User.findOne({ _id: req.user.id })
    if (!user.isAdmin) {
      return res.send('unauthorised, admins only')
    }
    await Club.deleteOne({ _id: req.params.id })
    res.send('delete successful')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

module.exports = router
