// eslint-disable-next-line
import { Request, Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken')
const config = require('config')

interface RequestUser extends Request {
  user: any
}

module.exports = (req: RequestUser, res: Response, next: NextFunction) => {
  // get token from the header
  const token = req.header('x-auth-token')

  // check if token is not there
  if (!token) {
    return res.status(401).json({ msg: 'No Token, Authorizaton denied' })
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
