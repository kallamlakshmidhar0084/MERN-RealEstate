import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const user = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate=useNavigate();
  const handleSubmit = (e)=>{

    //setting and getting params
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm' , searchTerm);
    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`);

  }

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const urlSearch= urlParams.get('searchTerm');
    if(urlSearch){
      setSearchTerm(urlSearch);
    }
  },[location.search])
  return (
    <header className=" bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 px-6">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Shanti</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search ...."
            value={searchTerm}
            onChange={(e)=>{setSearchTerm(e.target.value)}}
            className=" bg-transparent focus:outline-none w-20 sm:w-64"
          />
          <button>
          <FaSearch className="text-slate-600 m-1" />

          </button>
        </form>
        <ul className="flex gap-4 items-center">
          <Link to={"/"}>
            <li className="hidden sm:inline text-slate-700 hover:underline ">
              Home
            </li>
          </Link>

          <Link to={"/about"}>
            <li className="hidden sm:inline text-slate-700 hover:underline ">
              About
            </li>
          </Link>

          <Link to={"/profile"}>
            {user.currentUser ? (
              <img
                className="rounded-full w-10  mx-2"
                src={user.currentUser.data.avatar}
                alt="Profile"
              />
            ) : (
              <li className="text-slate-700 hover:underline ">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
