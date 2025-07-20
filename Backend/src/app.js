import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./routes/authroute.js";
import auctionrouter from "./routes/auctionroute.js";
dotenv.config();

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/auth",router)
app.use("/api/v1/auction",auctionrouter)
export{app}