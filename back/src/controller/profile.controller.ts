import { Request, Response } from 'express'
import { ProfilePhoto, User } from '../models'
import { UserUpdateRequest } from '../interfaces'

export async function userProfile(req: Request, res: Response) {
  const param = req.params.id

  const user = await User.findOne({ _id: param })

  if (!user) {
    return res.status(404).send('User not found')
  }

  const userInfo = {
    id: user._id,
    profilePhoto: user.profilePhoto,
    name: user.name,
    dateBirth: user.dateBirth ?? 'Not specified',
  }

  res.status(200).json({ data: userInfo, status: 'ok' })
}

export async function userProfileUpdate(req: Request, res: Response) {
  const param = req.params.id
  const body = req.body as UserUpdateRequest

  const user = await User.findOne({ _id: param })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  await User.updateOne({
    name: body.name,
    email: body.email,
    password: body.password,
    dateBirth: body.dateBirth,
    sex: body.sex,
    profilePhoto: body.profilePhoto,
  })

  return res.status(204).json({ message: 'User profile updated', status: 'No Content' })
}
