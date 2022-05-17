import mongoose from "mongoose";
import { Track } from '../interface/track.interface'
const trackSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        required: true
    },
    audioUrl: {
        type: String,
        required: true,
    },
    trackName: {
        type: String,
        required: true
    },
    view: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    },
    artists: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'artists'
        }
    ],
    playlists: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'playlists'
        }
    ],
    hasPodcast: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.model<Track>("tracks", trackSchema);