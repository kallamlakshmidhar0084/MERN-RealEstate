import { useState } from "react"
import { Link , useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {signInStart , singInSuccess , signInFailure} from "../redux/users/userSlice.js"
import axios from "axios";
import OAuth from "../components/OAuth";
function SignUp() {
  const [formData , setFormData]=useState({});
  const {error , loading} = useSelector((state)=>state.user) //user is name of the slice 
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
    try {
      const response  =await axios.post('/api/auth/sign-up',{
        username:formData.username,
        email:formData.email,
        password:formData.password,
      })

      dispatch(singInSuccess(response));

      console.log("sigup response: @SignUp.jsx", response);
      navigate('/sign-in');
      
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
    }
    
  }

  return (
    <>
    <div className="p-5  max-w-lg justify-center mx-auto">
    <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 "> 
      <input type="text" placeholder="Username" className="border-2 p-3 rounded-lg " id="username" onChange={handleChange}/>
      <input type="email" placeholder="Email" className="border-2 p-3 rounded-lg " id="email" onChange={handleChange}/>
      <input type="password" placeholder="Password" className="border-2 p-3 rounded-lg " id="password" onChange={handleChange}/>
      <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:80"> {loading ? "Loading..." :"Sign Up"} </button>
      <OAuth />
    </form>
    <div className="flex gap-2 mt-3">
      <p>Already have an account?</p>
      <Link to={'/sign-in'}>
        <span className="text-blue-500 underline">Sign In</span>
      </Link>
    </div>
    {error && <div className="text-red-500">{error}</div>}
    </div>
    
    </>
  )
}

export default SignUp