import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db"
import postRouter from "./routes/songRoutes.routes"
import errorHandler from "./middleware/errorHandler"
import userRouter from "./routes/userRoutes.routes"
import cookieParser from "cookie-parser"
import refreshRouter from "./routes/refreshToken.routes"
import logoutRouter from "./routes/logOut.routes"

dotenv.config()

connectDB()

const app  = express()
app.use(cors({credentials: true, origin: true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/songs", postRouter)
app.use("/users", userRouter)
app.use("/refresh", refreshRouter)
app.use("/logout", logoutRouter)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`⛈️ ⚡ server running on port ${PORT}`))

