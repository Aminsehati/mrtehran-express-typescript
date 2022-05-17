import { Document } from 'mongoose'
export interface Artist extends Document{
    name: string;
    imgUrl: string;
    coverImgUrl: string;
    Followers: number;
}