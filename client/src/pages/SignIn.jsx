import { useState } from "react"
import { Link , useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {signInStart , singInSuccess , signInFailure} from "../redux/users/userSlice.js"
import axios from "axios";
function SignIn() {
  const [formData , setFormData]=useState({});
  const {err , loading} = useSelector((state)=>state.user) //user is name of the slice 
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange=(e)=>{
      e.preventDefault();
      setFormData({
        ...formData,
        [e.target.id]:e.target.value,
      })
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    dispatch(signInStart());
    useDispatch
    try {
      const response  =await axios.post('/api/auth/sign-in',{
        email:formData.email,
        password:formData.password,
      })
      if(response.success===false){
        dispatch(signInFailure( response.message));

      }

      dispatch(singInSuccess());
      console.log("sign in response: @SignIn.jsx", response);
      navigate('/');
      
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
    }
    
    
  }

  return (
    <>
    <div className="p-5  max-w-lg justify-center mx-auto">
    <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 "> 
      <input type="email" placeholder="Email" className="border-2 p-3 rounded-lg " id="email" onChange={handleChange}/>
      <input type="password" placeholder="Password" className="border-2 p-3 rounded-lg " id="password" onChange={handleChange}/>
      <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:80"> {loading ? "Loading..." :"Sign Up"} </button>
    </form>
    <div className="flex gap-2 mt-3">
      <p>Dont have an account?</p>
      <Link to={'/sign-up'}>
        <span className="text-blue-500 underline">Sign Up</span>
      </Link>
    </div>
    {err && <div className="text-red-500">{err}</div>}
    </div>
    
    </>
  )
}

export default SignIn