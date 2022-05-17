import { Document } from 'mongoose'
export interface PlayList extends Document{
    name: string;
    imgUrl: string;
    coverImgUrl: string;
    Followers: number;
}