import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://yourteachingmentor.com/wp-content/uploads/2020/12/istockphoto-1223671392-612x612-1.jpg"
    }
},{
    timestamps : true
})


const User=mongoose.model("Users" , userSchema);

export default User;