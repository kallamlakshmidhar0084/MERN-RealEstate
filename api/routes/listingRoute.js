import  express  from "express";
import { createList, deleteListing, getUserListing } from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router();


router.post('/create' ,verifyToken, createList);
router.get("/:id",verifyToken , getUserListing);
router.delete('/delete/:id' ,verifyToken, deleteListing);




export default router;