import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db"
import router from "./routes/routes"

dotenv.config()

connectDB()

const app  = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use("/posts", router)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`⛈️ ⚡ server running on port ${PORT}`))