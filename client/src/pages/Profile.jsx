import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState  } from "react";
import {deleteUserStart, deleteUserSuccess, updateUserFailure , updateUserStart , updateUserSuccess,signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,} from "../redux/users/userSlice.js"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase/firebase.js";
import axios from "axios";
import {  Link, useNavigate } from "react-router-dom";
function Profile() {
  const currUser = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListingError , setShowListingError]=useState(false);
  const [updateSuccess , setUpdateSuccess]=useState(false);
  const [listing , setListing]=useState([]);
  const userData=currUser.currentUser.data;
  const fileRef = useRef(null);
  const dispatch=useDispatch();
  const navigate=useNavigate();
    const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e)=>{
    e.preventDefault();
    setFormData({...formData , [e.target.id] : e.target.value});    
  }

  const handleShowListing = async ()=>{

    try {
      setShowListingError(false);
      const response= await axios.get(`/api/listing/getAllListing/${userData._id}`);
      setListing(response.data);
      console.log(response);
      console.log(listing)
      
    } catch (error) {
      setShowListingError(true);

      }

  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      console.log(formData)
      const response= await axios.post(`/api/user/update/${userData._id}`, {
        ...formData
      }
      )
      console.log(response)
      dispatch(updateUserSuccess(response.data.safeUser._doc));
      navigate("/sign-in");
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      
    }
  }

  const handleListingDelete= async( listingId )=>{
    
    try {
      const response= await axios.delete(`/api/listing/delete/${listingId}`)
      setListing((list) => list.filter((l)=>l._id!==listingId));
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (e)=>{
    e.preventDefault();

    try {
      dispatch(deleteUserStart());
      const response = await axios.delete(`/api/user/delete/${userData._id}` )
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(updateUserFailure(error.message));

    }

  }

  const handleSignOut = async (e)=>{
    e.preventDefault();
    try {
      dispatch(signOutUserStart());
      await axios.get('/api/auth/sign-out');
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-5 font-semibold">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col p-2 gap-5">
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          hidden
          accept="image/*"
          ref={fileRef}
        />

        <img
          onClick={() => {
            fileRef.current.click();
          }}
          className="w-20 rounded-full object-cover  cursor-pointer self-center"
          src={ formData.avatar || currUser.currentUser.data.avatar}
          alt="profile picture"
          onChange={handleChange}
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          id="username"
          type="text"
          placeholder="username"
          className=" border p-3 rounded-lg max-w-xl"
          defaultValue={userData.username}
          onChange={handleChange}
        />
        <input
          id="email"
          type="email"
          placeholder="email"
          className=" border p-3 rounded-lg max-w-xl"
          defaultValue={userData.email}
          onChange={handleChange}

        />
        <input
          id="password"
          type="password"
          placeholder="password"
          className=" border p-3 rounded-lg max-w-xl"
          onChange={handleChange}
        />
        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
        <Link className="bg-green-700 text-center p-3 rounded-lg text-white uppercase hover:opacity-90" to={'/create-listing'}>Create Listing</Link>
      </form>
      <div className="flex justify-between my-2 p-2">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">Delete Account?</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      <button  onClick={handleShowListing} className='text-green-700 w-full'>
        Show Listings
      </button>
      <p className="text-red-700 mt-5"> {showListingError ? "Error showing Listing" : ""}</p>
      {console.log(listing)}
      {(listing && listing.length>0) ?
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {listing.map((list) => (
            <div
              key={list._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${list._id}`}>
                <img
                  src={list.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${list._id}`}
              >
                <p>{list.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(list._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${list._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      : "" }
    </div>
  );
}

export default Profile;
