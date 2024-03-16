import  express  from "express";
import { google, signIn, signOut, signUp } from "../controllers/authController.js";

const router=express.Router();


router.post("/sign-up" , signUp); 
router.post("/sign-in" , signIn); 
router.post("/google" , google); 
router.get("/sign-out" , signOut);


export default router;