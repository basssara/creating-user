import { Session } from 'express-session'

export declare interface CustomSession extends Session {
  userId?: string
}
