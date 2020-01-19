// eslint-disable-next-line
import express, { Request, Response } from 'express'
const connectDB = require('../config/db')

const app = express()
const port = 4000

// connect database
connectDB()

// middleware
// @ts-ignore
app.use(express.json({ extended: false })) // to accept body data

// define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/clubs', require('./routes/clubs'))
app.use('/api/auth', require('./routes/auth'))

app.get('/', (req: Request, res: Response) => res.send('Welcome to player_db API'))

app.listen(port, () => console.log(`API listening on port ${port}`))
