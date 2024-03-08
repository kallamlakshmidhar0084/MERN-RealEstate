import express from "express";
import {getContacts} from "../controllers/userController.js";
const router = express.Router();

router.get('/test' , getContacts);


export default router;