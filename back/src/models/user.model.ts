import { Schema, model } from 'mongoose'
import { UserRequest } from '../interfaces'

const userSchema = new Schema<UserRequest>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  dateBirth: {
    type: Date,
    required: false,
  },
  sex: {
    type: String,
    required: false,
  },
  profilePhoto: {
    type: String,
    required: false,
  },
})

const User = model<UserRequest>('User', userSchema)

export { User }
