import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    username: {type:String,required:true, validate:emailRegex},
    password:{type:String,required:true,validate:passRegex},
});

userSchema.pre("save",async function (next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,this.password);
    next();
})

const User = (userSchema,"User");

export default User;