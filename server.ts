import express from "express"
import cors from "cors"
import connectDB from "./config/db"
import postRouter from "./routes/songRoutes.routes"
import errorHandler from "./middleware/errorHandler"
import userRouter from "./routes/userRoutes.routes"
import cookieParser from "cookie-parser"
import refreshRouter from "./routes/refreshToken.routes"
import logoutRouter from "./routes/logOut.routes"
import {config} from "./config"

connectDB()

const app  = express()
app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/songs", postRouter)
app.use("/users", userRouter)
app.use("/refresh", refreshRouter)
app.use("/logout", logoutRouter)
app.use(errorHandler)

app.listen(config.server.port, () => console.log(`⛈️ ⚡ server running on port ${config.server.port}`))

