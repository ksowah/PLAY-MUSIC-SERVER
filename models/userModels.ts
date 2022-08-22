import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please input your name"]
    },
    email: {
        type: String,
        required: [true, "Please input your email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please input a password"]
    },
    token: {
        type: String,
        required: [true, "Not authorized"]
    },
    image: {
        type: String,
        default: "https://ksets.netlify.app/play/profile.png"
    }
})

export default mongoose.model("User", userSchema)