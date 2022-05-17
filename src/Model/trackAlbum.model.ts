import mongoose from 'mongoose'
const trackAlbumSchema = new mongoose.Schema({
    trackName: {
        type: String,
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    album: {
        type: mongoose.Types.ObjectId,
        ref: "albums"
    },
    view: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})
export default mongoose.model("tracksalbums", trackAlbumSchema)