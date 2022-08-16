import express from "express"
import { getSongs, addSong, deleteSong } from "../controllers/songsController"
import protect from "../middleware/authMiddleware"

const songRouter = express.Router()

songRouter.route("/").get(protect, getSongs).post(protect, addSong)
songRouter.route("/:songID").delete( protect, deleteSong)

export default songRouter