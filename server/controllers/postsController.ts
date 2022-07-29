import { NextFunction, Request, Response } from "express"
import PostMessage from "../models/postModel"


export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    } catch (error) {
        next(error)
    }
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const post = await PostMessage.create(req.body)
        res.status(201).json(post)
   } catch (error) {
        next(error)
   }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
   try {
       const updatePost = await PostMessage.findByIdAndUpdate(req.params.postID, req.body, { new: true })
       res.status(200).json(updatePost)
   } catch (error) {
    next(error)
   }
}


export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
   try {
       const delPost = await PostMessage.findByIdAndRemove(req.params.postID)
       res.status(200).json(delPost)
   } catch (error) {
        next(error)
   }

}
