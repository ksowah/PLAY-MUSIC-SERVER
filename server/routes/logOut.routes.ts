import express from "express"
import logOut from "../controllers/logoutController"

const logoutRouter = express.Router()

logoutRouter.route("/").get(logOut)

export default logoutRouter