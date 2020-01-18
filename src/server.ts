import express, {Request, Response} from 'express'
const connectDB = require('../config/db')

const app = express()
const port = 4000

//connect database
connectDB()

app.get('/', (req: Request, res: Response) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
