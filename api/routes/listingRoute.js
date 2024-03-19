import  express  from "express";
import { createList, deleteListing, getUserListing, updateListing } from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router();


router.post('/create' ,verifyToken, createList);
router.get("/:id",verifyToken , getUserListing);
router.delete('/delete/:id' ,verifyToken, deleteListing);
router.put('/update/:id' ,verifyToken, updateListing);




export default router;