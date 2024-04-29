import { Schema, model } from 'mongoose'
import { ProfilePhotoInterface } from '../interfaces'

const profilePhotoSchema = new Schema<ProfilePhotoInterface & { userId: string }>({
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  originalname: {
    type: String,
  },
  encoding: {
    type: String,
  },
  mimetype: {
    type: String,
  },
  destination: {
    type: String,
  },
  filename: {
    type: String,
  },
  path: {
    type: String,
  },
  size: {
    type: Number,
  },
  format: {
    type: String,
  },
})

const ProfilePhoto = model<ProfilePhotoInterface & { userId: string }>('ProfilePhoto', profilePhotoSchema)

export { ProfilePhoto }
