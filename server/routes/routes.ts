import express, { Request, Response } from "express"
import { getPosts, createPost } from "../controllers/postsController"

const router = express.Router()

router.get("/", getPosts)
router.post("/", createPost)

export default router