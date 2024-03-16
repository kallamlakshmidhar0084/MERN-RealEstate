import Listing from "../models/listModel.js";


export const createList = async( req , res , next)=>{

    try {
        console.log("entered")
        const listing= await Listing.create(req.body);
        return res.status(201).json(listing);
        
    } catch (error) {
        next(error);
    }

}