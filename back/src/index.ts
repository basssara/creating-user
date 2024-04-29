import express, { Request, Response } from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { connectDB } from './utils'
import { authRoutes, userListRoute, mainRoute, profileRoute } from './routes'

dotenv.config()

const app = express()
const port = process.env.PORT || 3003

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(express.json())
app.use(
  session({
    secret: process.env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  }),
)
app.use(cookieParser())
app.use('/profile-photo', express.static('uploads'))

app.use('/api', authRoutes)
app.use('/api', userListRoute)
app.use('/api', mainRoute)
app.use('/api', profileRoute)

async function start() {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
    })
  } catch (err: unknown) {
    console.error(err)
  }
}

start()
