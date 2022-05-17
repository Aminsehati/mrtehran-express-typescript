import { Document } from "mongoose";

export interface Track extends Document {
    imgUrl: string;
    audioUrl: string;
    trackName: string;
    view: number;
    like: number;
    artists: string[];
    playlists: string[];
    hasPodcast: boolean
}