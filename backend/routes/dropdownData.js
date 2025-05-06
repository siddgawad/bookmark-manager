import Bookmark from "../models/bookMarkModel";
import express from "express";

const app = express();
app.use(express.Router());

router.get("/categories",(req,res)=>{
    const enumValues = Bookmark.schema.path("category").enumValues;
    res.json(enumValues);
})

router.get("/collection",(req,res)=>{
    const enumValues = Bookmark.schema.path("collection").enumValues;
    res.json(enumValues);
})

router.get("/tags",(req,res)=>{
    const enumValues = Bookmark.schema.path("tags").enumValues;
    res.json(enumValues);
})


export default router;