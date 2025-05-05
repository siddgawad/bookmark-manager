
import User from "../models/userModel";
import dotenv from "dotenv";
dotenv.config();

const registerController = async function(req,res){
    const {username,password} = req.body;
    if(!username||!password) return res.status(400).json({message:"Please enter valid username and password"});
    try{
        const existingUser = await User.findOne({username});
    if(existingUser) return res.status(400).json({message:"User already exists. Kindly log into your account"});

    const user = await User.create({username,password});
    const token = await jwt.sign({UserId:user._id},process.env.JWT_SECRET);
    return res.status(201).json({message:"User successfully created",
        token,
        userId:user._id,
        username:user.username
    });
    }catch(err){
        return res.status(500).json({message:"Server error",err});
    }
}    

export default registerController;