import express, { Request, Response } from "express"
import { getPosts, createPost, updatePost, deletePost } from "../controllers/postsController"

const router = express.Router()

router.route("/").get(getPosts).post(createPost)
router.route("/:postID").put(updatePost).delete(deletePost)

export default router