import express from "express"
import { getRefreshedToken } from "../controllers/refreshTokenController"

const refreshRouter = express.Router()

refreshRouter.route("/").get(getRefreshedToken)

export default refreshRouter