import Listing from "../models/listModel.js";


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