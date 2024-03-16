import express from "express";
import {getContacts, updateUser} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get('/test' , getContacts);
router.post("/update/:id" ,verifyToken, updateUser);


export default router;