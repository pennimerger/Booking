import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import cookieParser from "cookie-parser"
import path from "path"
import {v2 as cloudinary} from "cloudinary"
import myHotelRoutes from "./routes/my-hotels"
import hotelRoutes from "./routes/hotels"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
mongoose.connect(process.env.CONNECTION_STRING as string)

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) //enable url parsing to get the query parameter
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))
app.use(express.static(path.join(__dirname, "../../fBooking/dist"))) //serve frontend asset

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/my-hotels", myHotelRoutes)
app.use("/api/hotels", hotelRoutes)

// For requests not api related
app.get("*", (req: Request, res: Response)=>{
  res.sendFile(path.join(__dirname, "../../fBooking/dist/index.html"))
})

// app.get("/api/test", async (req: Request, res: Response) => {
//   res.json({ message: "Hello there!" })
// })

app.listen(8000, () => {
  console.log("Running server on localhost:8000")
})