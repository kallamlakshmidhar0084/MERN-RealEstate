import User from "../models/usersModel.js";
import bcryptjs from 'bcryptjs';
import  jwt  from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
export const signUp = async (req , res  ,next)=>{  //next to access middleware for error handling
    const {username , email , password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password , 10);  //passsword hashing
    const newUser=new User ({username , email , password :hashedPassword});
    try {
        await newUser.save();
        res.status(201).json("user created successfully");
    } catch (error) {
        next(error);
    }
    console.log(username , email , password);
}

export const signIn=async(req , res , next)=>{
        const {email , password}=req.body;
        try {
            const validUser= await User.findOne({email});
            if(!validUser){
                return next(errorHandler(404 , "User Not found"));
            }
            const validPassword=bcryptjs.compareSync(password , validUser.password);
            if(!validPassword){
                return next(errorHandler(401 , "Wrong credential!"));
            }
            const {password:pass , ...safeUser} = validUser._doc;
            const token=jwt.sign( { id:validUser._id},process.env.JWT_SECRET) //Producing jwt token for authentication
            res.cookie('access_token' , token , {httpOnly : true}).status(200).json(safeUser) // we ca set expiration date also 
            
        } catch (error) {
            next(error);
        }
}