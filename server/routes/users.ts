// eslint-disable-next-line
import express, { Request, Response } from 'express'
const { check, validationResult } = require('express-validator')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router()

const User = require('../models/User') // importing the User model
const auth = require('../middleware/auth')

// @route  GET api/users
// @desc   Get a list of all users
// @access Admin only
router.get('/', auth, async (req: any, res: Response) => {
  try {
    const loggedInUser = await User.findOne({ _id: req.user.id })
    if (!loggedInUser.isAdmin) {
      return res.send('unauthorised, admins only')
    }
    const allUsers = await User.find({})
    res.json(allUsers)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  POST api/users
// @desc   Register a user
// @access Public
router.post('/', [
  check('username', 'username must consist of 3 or more characters').isLength({ min: 3 }),
  check('email', 'please include a valid email').isEmail(),
  check('password', 'please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, password, image, favoriteClub } = req.body
  const email = req.body.email.toLowerCase()

  try {
    let user = await User.findOne({ username }) // try to find user by the email

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'user with this username already exists' }] })
    }

    user = await User.findOne({ email }) // try to find user by the email

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'user with this email address already exists' }] })
    }

    user = new User({
      username,
      email,
      password,
      image,
      favoriteClub
    })

    // password encryption
    const saltRounds = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, saltRounds)

    await user.save()

    // json web token creation
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, config.get('jwtSecret'), {}, (err: {}, token: string) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  PUT api/users
// @desc   Update User information
// @access Admin only
router.put('/:id', auth, async (req: any, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.user.id })
    if (!user.isAdmin) {
      return res.send('unauthorised, admins only')
    }
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.json(req.body)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  DELETE api/users
// @desc   Delete User
// @access Admin only
router.delete('/:id', auth, async (req: any, res: Response) => { // auth middleware to be added
  try {
    const user = await User.findOne({ _id: req.user.id })
    if (!user.isAdmin) {
      return res.send('unauthorised, admins only')
    }
    await User.deleteOne({ _id: req.params.id })
    res.send('delete successful')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

module.exports = router
