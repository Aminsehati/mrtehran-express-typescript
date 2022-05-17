import mongoose from "mongoose";
const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    artists: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'artists'
        }
    ],
}, {
    timestamps: true
})

export default mongoose.model("albums", albumSchema);