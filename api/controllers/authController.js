import User from "../models/usersModel.js";
import bcryptjs from 'bcryptjs';
export const signUp = async (req , res)=>{
    const {username , email , password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password , 10);  //passsword hashing
    const newUser=new User ({username , email , password :hashedPassword});
    try {
        await newUser.save();
        res.status(201).json("user created successfully");
    } catch (error) {
        res.status(500).json(error.message);
    }
    
}