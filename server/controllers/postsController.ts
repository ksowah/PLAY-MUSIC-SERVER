import { Request, Response } from "express"
import PostMessage from "../models/postModel"


export const getPosts = async (req: Request, res: Response) => {
    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    } catch (error) {
        
    }
}

export const createPost = (req: Request, res: Response) => {
    res.send("Post Creation")
}