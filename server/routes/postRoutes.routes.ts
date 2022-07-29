import express, { Request, Response } from "express"
import { getPosts, createPost, updatePost, deletePost } from "../controllers/postsController"

const postRouter = express.Router()

postRouter.route("/").get(getPosts).post(createPost)
postRouter.route("/:postID").put(updatePost).delete(deletePost)

export default postRouter