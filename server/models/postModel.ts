import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String], // array of strings
    selectedFile: String,
    likeCount: {
        type:Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    user: {
        type: String,
        required: true,
        ref: "User"
    }
})


const PostMessage = mongoose.model("PostMessage", postSchema)

export default PostMessage
