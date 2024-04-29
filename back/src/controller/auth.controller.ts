import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ProfilePhoto, User } from '../models'
import { ProfilePhotoInterface, UserRequest, UserSignInRequest } from '../interfaces'

export async function singIn(req: Request, res: Response) {
  const body = req.body as UserSignInRequest

  const user = await User.findOne({ email: body.email })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const comparedPassword = bcrypt.compareSync(body.password, user.password)

  if (!comparedPassword) {
    return res.status(400).json({ message: 'Invalid password' })
  }

  const accessToken = jwt.sign({ id: user._id.toString(), email: user.email }, `${process.env.SECRET_KEY}`, {
    expiresIn: '5m',
  })

  const refreshToken = jwt.sign({ id: user._id.toString(), email: user.email }, `${process.env.SECRET_KEY}`, {
    expiresIn: '30d',
  })

  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })

  return res.status(200).json({
    status: 'ok',
    message: 'Welcome',
    tokens: { accessToken, refreshToken },
  })
}

export async function signUp(req: Request, res: Response) {
  const body = req.body as UserRequest
  const file = req.file as Omit<ProfilePhotoInterface, 'format'>
  const hashedPassword = await bcrypt.hash(body.password, 7)

  const isExist = await User.findOne({ email: body.email })

  if (isExist) {
    return res.status(409).json({ message: 'User already exists' })
  }

  const conditions = ['jpg', 'jpeg', 'png']

  const condition = conditions.some((f) => file.originalname.includes(f))

  let splited

  if (condition) {
    splited = file.originalname.split('.')[1]
    body.profilePhoto = '/profile-photo/' + file.filename
  } else {
    return res.send(400).json({ message: 'Invalid file format' })
  }

  const user = await new User({ ...body, profilePhoto: body.profilePhoto, password: hashedPassword }).save()

  new ProfilePhoto({ userId: user.id, format: splited, ...file }).save()

  const accessToken = jwt.sign({ id: user._id.toString(), email: user.email }, `${process.env.SECRET_KEY}`, {
    expiresIn: '5m',
  })

  const refreshToken = jwt.sign({ id: user._id.toString(), email: user.email }, `${process.env.SECRET_KEY}`, {
    expiresIn: '30d',
  })

  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })

  return res.status(201).json({ message: 'User created', status: 'No content', tokens: { accessToken, refreshToken } })
}
