import { Document } from 'mongoose'
export interface Album extends Document {
    name: string
    imgUrl: string
    artists: string[]
}