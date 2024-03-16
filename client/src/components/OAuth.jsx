import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import  app  from '../firebase/firebase.js';
import { useDispatch, useSelector } from "react-redux"
import { singInSuccess } from '../redux/users/userSlice.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function OAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleGoogleClick = async ()=>{
        try {
            const provider=new GoogleAuthProvider();
            const auth = getAuth(app);   // nopw we have provider and auth 

            const response= await signInWithPopup(auth , provider);
            console.log(response);

            const res  =await axios.post('/api/auth/google',{
              username: response.user.displayName , 
              email : response.user.email,
              photo : response.user.photoURL,
            })

            dispatch(singInSuccess(res));
            navigate("/");
        } catch (error) {
            console.log("Could Not sign in through Google" , error);
        }
    }


  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-600 p-3 rounded-lg text-white hover:opacity-80 uppercase' >Continue with google</button>
  )
}

export default OAuth