import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a song title"]
    },
    artist: {
        type: String,
        required: [true, "Please provide artist name"]
    },
    image: {
        type: String,
    },
   track: {
    type: String,
    required: [true, "Please add track"]
   },
    user: {
        type: String,
        required: true,
        ref: "User"
    }
},{
    timestamps: true
})


const TrackModel = mongoose.model("PostMessage", postSchema)

export default TrackModel
