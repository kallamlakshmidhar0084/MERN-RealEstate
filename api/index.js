


import userRouter from './routes/userRoute.js';
import authRouter from "./routes/authRoute.js";
import  express  from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app=express();


app.use(express.json());

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongoDB");
}).catch((err)=>{
    console.log(err);
})


app.use("/"  , userRouter);
app.use("/api/auth/" , authRouter);   


app.listen(3000 , () =>{
    try {
        console.log("server running on server 3000");

    } catch (error) {
        console.log(error);
    }
})

