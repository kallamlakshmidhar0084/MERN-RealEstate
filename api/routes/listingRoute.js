import  express  from "express";
import { createList, deleteListing, getUserListing, updateListing , getListing, getAllListings } from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router();


router.post('/create' ,verifyToken, createList);
router.get('/getAllListing/:id',verifyToken , getUserListing);
router.delete('/delete/:id' ,verifyToken, deleteListing);
router.put('/update/:id' ,verifyToken, updateListing);
router.get('/getList/:id',getListing);
router.get("/get" , getAllListings);




export default router;