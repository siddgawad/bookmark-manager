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

import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import dropDown from "./routes/dropdownData.js"

app.use("/api/login",loginRoutes);
app.use("/api/register",loginRoutes);
app.use("/api/search",bookmarkRoutes);
app.use("/api/create",bookmarkRoutes);
app.use("/api/categories",dropDown);
app.use("/api/collection",dropDown);
app.use("/api/tags",dropDown);


const PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})