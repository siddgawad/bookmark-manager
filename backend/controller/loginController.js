import User from "../models/userModel"
import dotenv from "dotenv";
dotenv.config();

const loginController = async function(req,res){
    const {username,password} = req.body;
    if(!username || !password) return res.status(400).json({message:"Enter valid username and password"});
    const existingUser = await User.findOne({username}); 
    if(!existingUser) return res.status(400).json({message:"No exisitng user found"});
    try{
        const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET);
        const validate = await bcrypt.compare(existingUser.password,password);
        if(validate) return res.status(201).json({message:"SUccessfully signed in",
            token,
            userId: existingUser._id,
            username: existingUser.username
        });
        return res.status(401).json("Could not validate User");
    
    }catch(err){
        return res.status(500).json("Server Error",err);
    }

}

export default loginController;