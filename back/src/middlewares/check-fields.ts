import { Request, Response, NextFunction } from 'express'
import { UserRequest, UserSignInRequest } from '../interfaces'

export function checkSignUpFields(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body as UserRequest

  switch (true) {
    case !name:
      return res.status(400).send('Name is required')
    case !email:
      return res.status(400).send('Email is required')
    case !password:
      return res.status(400).send('Password is required')
    default:
      next()
  }
}

export function checkSignInFields(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as UserSignInRequest

  switch (true) {
    case !email:
      return res.status(400).send('Email is required')
    case !password:
      return res.status(400).send('Password is required')
    default:
      next()
  }
}
