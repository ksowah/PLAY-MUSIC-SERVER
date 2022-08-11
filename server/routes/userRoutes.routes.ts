import express, { Express } from "express";
import { getUsers, loginUser, registerUser } from "../controllers/userController";
import protect from "../middleware/authMiddleware";

const userRouter = express.Router()

userRouter.route("/").get(protect, getUsers).post(registerUser)
userRouter.route("/login").post(loginUser)

export default userRouter

