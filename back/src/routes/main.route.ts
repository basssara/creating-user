import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
  return res.status(200).send({ message: 'Hello, TypeScript Express!' })
})

export { routes as mainRoute }
