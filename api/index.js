const express=require('express');
const mongoose=require('mongoose');
const app=express();
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongoDB");
}).catch((err)=>{
    console.log(err);
})

app.listen(3000 , () =>{
    try {
        console.log("server running on server 3000");

    } catch (error) {
        console.log(error);
    }
})