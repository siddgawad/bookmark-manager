import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";


const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to MongoDB"))
.catch(()=>console.error("Mongo DB connection failed",err));

import bookmarkRoutes from "./routes/bookmarkRoutes";
import loginRoutes from "./routes/loginRoutes";

app.use("/api/auth",loginRoutes);
app.use("/api/search",bookmarkRoutes);


const PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})