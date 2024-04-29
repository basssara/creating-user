import { Router } from 'express'
import { signUp, singIn } from '../controller/auth.controller'
import { uploadMiddleware } from '../middlewares/upload-photo'
import { checkSignInFields, checkSignUpFields } from '../middlewares/check-fields'

const routes = Router()

routes.post('/sign-in', checkSignInFields, singIn)
routes.post('/sign-up', uploadMiddleware, signUp)

export { routes as authRoutes }
