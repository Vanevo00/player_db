// eslint-disable-next-line
import express, { Request, Response } from 'express'
const { check, validationResult } = require('express-validator')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router()

const User = require('../models/User') //importing the User model

//@route  POST api/users
//@desc   Register a user
//@access Public
router.post('/', [
  check('username', 'username must consist of 3 or more characters').isLength({min: 3}),
  check('email', 'please include a valid email').isEmail(),
  check('password', 'please enter a password with 6 or more characters').isLength({min: 6})
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const { username, password, image, favorite_club } = req.body
  const email = req.body.email.toLowerCase()

  try {
    let user =  await User.findOne({email}) //try to find user by the email

    if (user) {
      return res.status(400).json({msg: 'user with this email address already exists'})
    }

    user = new User ({
      username,
      email,
      password,
      image,
      favorite_club
    })

    //password encryption
    const saltRounds = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, saltRounds)

    await user.save()

    //json web token creation
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, config.get('jwtSecret'),{
      expiresIn: 3600
    }, (err: {}, token: string) => {
      if (err) throw err
      res.json({ token })
    })
  } catch(err) {
    console.error(err.message)
    res.status(500).send('server error')
  }


})

module.exports = router
