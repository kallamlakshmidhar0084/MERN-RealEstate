


import userRouter from './routes/userRoute.js';
import  express  from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app=express();


dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongoDB");
}).catch((err)=>{
    console.log(err);
})


app.use("/"  , userRouter);



app.listen(3000 , () =>{
    try {
        console.log("server running on server 3000");

    } catch (error) {
        console.log(error);
    }
})

