


import userRouter from './routes/userRoute.js';
import authRouter from "./routes/authRoute.js";
import  express  from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errorHandling } from './middleware/errorHandling.js';
const app=express();

//to parse json incoming files
app.use(express.json());

dotenv.config();
//connecting mongoose
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongoDB");
}).catch((err)=>{
    console.log(err);
})

//routes for different cases
app.use("/"  , userRouter);
app.use("/api/auth" , authRouter); 

// middleware for error handling
app.use(errorHandling)

app.listen(3000 , () =>{
    try {
        console.log("server running on server 3000");

    } catch (error) {
        console.log(error);
    }
})

