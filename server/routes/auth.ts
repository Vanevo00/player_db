// eslint-disable-next-line
import express, { Request, Response } from 'express'
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')

const User = require('../models/User')

// @route  GET api/auth
// @desc   get logged-in user
// @access Private
router.get('/', auth, async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  POST api/auth
// @desc   auth user and get token
// @access Public
router.post('/', [
  check('username', 'please include a valid username').not().isEmpty(),
  check('password', 'password is required ').exists()
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Password' }] })
    }

    // json web token creation
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, config.get('jwtSecret'), {}, (err: string, token: string) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('server error')
  }
})

module.exports = router
