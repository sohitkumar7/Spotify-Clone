import express from "express";
import dotenv from "dotenv";
import UserRoute from "./Routes/UserRoute.js"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;


// middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(cors());


try {
    mongoose.connect(MONGODB_URI);
    console.log("moongodb is connected")   
} catch (error) {
    console.log("Mondodb connection ERROR: ",error)
}

// ..........routes.......
app.use("/api/user",UserRoute)

app.listen(port,()=>{
    console.log(`server is running in http://localhost:${port}`)
})