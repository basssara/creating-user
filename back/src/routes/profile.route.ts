import { Router, Request, Response } from 'express'
import { userProfile } from '../controller'
import authMiddleware from '../middlewares/auth.middleware'

const routes = Router()

routes.get('/account/:id', authMiddleware, userProfile)

export { routes as profileRoute }
