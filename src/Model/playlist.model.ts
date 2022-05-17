import mongoose from 'mongoose'
import { PlayList } from '../interface/playlist.interface'
const playListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    coverImgUrl: {
        type: String,
        required: true
    },
    Followers: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
export default mongoose.model<PlayList>("playlists", playListSchema)