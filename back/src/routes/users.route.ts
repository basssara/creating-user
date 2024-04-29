import { Router } from 'express'
import { userProfile, usersList } from '../controller'
import authMiddleware from '../middlewares/auth.middleware'

const routes = Router()

routes.get('/people', authMiddleware, usersList)
routes.get('/user/:id', authMiddleware, userProfile)

export { routes as userListRoute }
