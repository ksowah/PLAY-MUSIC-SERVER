import { Request, Response } from "express"
import PostMessage from "../models/postModel"


export const getPosts = async (req: Request, res: Response) => {
    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    } catch (error: any) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req: Request, res: Response) => {

    try {
        const post = await PostMessage.create(req.body)
        res.status(201).json(post)
   } catch (error) {
    res.status(409).json({message: error})
   }
}

export const updatePost = async (req: Request, res: Response) => {
    const post = await PostMessage.findById(req.params.postID)

    if(!post){
        res.status(400)
        throw new Error("Whoops!! couldn't find post in our database")
    }

    const updatePost = await PostMessage.findByIdAndUpdate(req.params.postID, req.body, { new: true })

    res.status(200).json(updatePost)

}


export const deletePost = async (req: Request, res: Response) => {
    const post = await PostMessage.findById(req.params.postID)

    if(!post){
        res.status(400)
        throw new Error("This post might just not exist")
    }

    const delPost = await PostMessage.findByIdAndRemove(req.params.postID)
    res.status(200).json(delPost)
}
