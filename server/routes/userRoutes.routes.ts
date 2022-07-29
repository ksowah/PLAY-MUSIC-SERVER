import express, { Express } from "express";
import { getUsers, loginUser, registerUser } from "../controllers/userController";

const userRouter = express.Router()

userRouter.route("/").get(getUsers).post(registerUser)
userRouter.route("/login").post(loginUser)

export default userRouter

