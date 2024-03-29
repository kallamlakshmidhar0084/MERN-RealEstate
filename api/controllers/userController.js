import Listing from "../models/listModel.js"
import User from "../models/usersModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const getContacts= async (req , res , next)=>{
    try {
        const user= await User.findById(req.params.id);
        const {password , ...safeUser}=user;
        res.status(200).json({safeUser})
    } catch (error) {
        next(errorHandler(error));
    }
} 

export const updateUser = async (req , res , next)=>{ 
    console.log("updating user");
    if(req.user.id!==req.params.id) return next(errorHandler( 401 , "You can only update your account"));
    try {

        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password , 10);
        }

        console.log(req.body);
        const updateUser= await User.findByIdAndUpdate(req.params.id , {
            $set:{
                username : req.body.username,
                email:req.body.email,
                password : req.body.password,
                avatar:req.body.avatar
            }
        }, {new : true})

        const {password , ...safeUser}=updateUser;
        res.status(200).json({safeUser})
    } catch (error) {
        console.log(error);
        next(errorHandler(400 , "internal server error"))
    }
    

}

export const deleteUser = async (req , res , next)=>{
    console.log("deleting user");
    if(req.user.id!==req.params.id) return next(errorHandler( 401 , "You can only delete your account"));
    try {

        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token')
        res.status(200).json("user has been deleted");
    } catch (error) {
        console.log(error);
        next(errorHandler(400 , "internal server error"))
    }
}

