import { Link } from "react-router-dom"

function SignUp() {
  return (
    <>
    <div className="p-5  max-w-lg justify-center mx-auto">
    <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
    <form action="" className="flex flex-col gap-5 "> 
      <input type="text" placeholder="Username" className="border-2 p-3 rounded-lg " id="username" />
      <input type="email" placeholder="Email" className="border-2 p-3 rounded-lg " id="email" />
      <input type="password" placeholder="Password" className="border-2 p-3 rounded-lg " id="password" />
      <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:80">Sign Up</button>
    </form>
    <div className="flex gap-2 mt-3">
      <p>Already have an account?</p>
      <Link to={'/sign-in'}>
        <span className="text-blue-500 underline">Sign In</span>
      </Link>
    </div>
    </div>
    
    </>
  )
}

export default SignUp