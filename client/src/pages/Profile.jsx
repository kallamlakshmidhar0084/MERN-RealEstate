import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase/firebase.js";
function Profile() {
  const currUser = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(filePerc);
  console.log(formData);
  const fileRef = useRef(null);

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

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-5 font-semibold">Profile</h1>
      <form className="flex flex-col p-2 gap-5">
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
        />
        <input
          id="email"
          type="email"
          placeholder="email"
          className=" border p-3 rounded-lg max-w-xl"
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          className=" border p-3 rounded-lg max-w-xl"
        />
        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between my-2 p-2">
        <span className="text-red-700 cursor-pointer">Delete Account?</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
