import express, { Request, Response } from "express"
import { getPosts, createPost, updatePost, deletePost } from "../controllers/postsController"
import protect from "../middleware/authMiddleware"

const postRouter = express.Router()

postRouter.route("/").get(protect, getPosts).post(protect, createPost)
postRouter.route("/:postID").put(protect, updatePost).delete( protect, deletePost)

export default postRouter