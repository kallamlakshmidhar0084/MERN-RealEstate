import Listing from "../models/listModel.js";
import { errorHandler } from "../utils/error.js";


export const createList = async( req , res , next)=>{
    console.log("creating List");
    try {
        const listing= await Listing.create(req.body);
        console.log("List Created")
        return res.status(201).json(listing);
        
    } catch (error) {
        next(error);
    }
    

}

export const getUserListing = async (req , res , next)=>{
    if(req.user.id===req.params.id){

        try {
            const lists= await Listing.find({userRef:req.params.id});
            res.status(200).json(lists);
        } catch (error) {
            next(error);
        }

    }
    else{
        return next(errorHandler(401 , "You can only view your own Listing"));

    }
}

export const deleteListing = async (req , res , next)=>{

        try {
            await Listing.findByIdAndDelete(req.params.id);
            res.status(200).json('Listing has been deleted!');
        } catch (error) {
            next(error);
        }

    
}