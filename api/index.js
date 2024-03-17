


import userRouter from './routes/userRoute.js';
import authRouter from "./routes/authRoute.js";
import listingRouter from "./routes/listingRoute.js";
import  express  from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorHandling } from './middleware/errorHandling.js';
const app=express();

//to parse json incoming files
app.use(express.json());

//to get info from cookie
app.use(cookieParser());
dotenv.config();
//connecting mongoose
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongoDB");
}).catch((err)=>{
    console.log(err);
})

//routes for different cases
app.use("/api/user"  , userRouter);
app.use("/api/auth" , authRouter); 
app.use("/api/listing" , listingRouter); 

// middleware for error handling
app.use((err ,req , res , next)=>{
    const statusCode=err.statusCode || 500;
    console.log("@index.js : middleware caught error :",err.message);
    const message=err.message || "internal server ERROR";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
})


app.listen(3000 , () =>{
    try {
        console.log("server running on server 3000");

    } catch (error) {
        console.log(error);
    }
})

