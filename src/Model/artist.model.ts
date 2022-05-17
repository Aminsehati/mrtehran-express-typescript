import mongoose from 'mongoose'
import { Artist } from '../interface/artist.interface'
const ArtistSchema = new mongoose.Schema({
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
export default mongoose.model<Artist>("artists", ArtistSchema);