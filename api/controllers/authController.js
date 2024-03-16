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
                console.log("user not found @authController")
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

export const google=async ( req , res , next )=>{
    console.log(req.body);
    const {username , email , photo}=req.body;
    try {
        const user=await User.findOne({email})
        if(user){
            const token=jwt.sign({id : user._id} , process.env.JWT_SECRET);
            const {password:pass , ...safeUser} = user._doc;
            res.cookie('access_token' , token , {httpOnly : true}).status(200).json(safeUser) // we ca set expiration date also 

        }
        else{
            const newPAssword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword=bcryptjs.hashSync(newPAssword , 10);
            const newUser=new User({username:username.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-8) , email , password :hashedPassword , photo})
            await newUser.save();
            const token=jwt.sign({id : newUser._id} , process.env.JWT_SECRET);
            const {password:pass , ...safeUser} = newUser._doc;
            res.cookie('access_token' , token , {httpOnly : true}).status(201).json(safeUser) 
        
        }

        
    } catch (error) {
        next(error);
    }
}