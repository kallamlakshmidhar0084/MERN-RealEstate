import { useSelector } from "react-redux"
function Profile() {
  const currUser = useSelector((state) => state.user);
  console.log(currUser);
  return (

    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-5 font-semibold">Profile</h1>
      <form className="flex flex-col p-2 gap-5">
      <img className="w-20 rounded-full object-cover  cursor-pointer self-center" src={currUser.currentUser.data.avatar} alt="profile picture"/>
      <input id="username" type="text" placeholder="username" className=" border p-3 rounded-lg max-w-xl"/>
      <input id="email" type="email" placeholder="email" className=" border p-3 rounded-lg max-w-xl"/>
      <input id="password" type="password" placeholder="password" className=" border p-3 rounded-lg max-w-xl"/>
      <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80" >Update</button>
      </form>
      <div className="flex justify-between my-2 p-2">
        <span className="text-red-700 cursor-pointer">Delete Account?</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

export default Profile