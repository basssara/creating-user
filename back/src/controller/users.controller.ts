import { Request, Response } from 'express'
import { UsersListResponse } from '../interfaces'
import { ProfilePhoto, User } from '../models'

export async function usersList(req: Request, res: Response) {
  const result: UsersListResponse[] = []

  const users = await User.find()

  for (const user of users) {
    result.push({
      id: user.id,
      name: user.name,
      dateBirth: user.dateBirth ?? 'Not specified',
      profilePhoto: !user.profilePhoto ? '/profile-photo/blank.png' : user.profilePhoto,
    })
  }

  res.status(200).setHeader('Content-Type', 'application/json').json({ data: result, status: 'ok' })
}
