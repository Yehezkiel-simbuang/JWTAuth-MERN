import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateStart,
  updateSuccess,
  updateFail,
  signOut,
} from "../redux/user/userSlice.js";

export default function Profile() {
  const { currentUser, updateLoading, updateError } = useSelector(
    (state) => state.user
  );
  const refFile = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imageError, setImageError] = useState(false);
  const [imageUpload, setImageUpload] = useState(0);
  const [formData, setFormData] = useState({});
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleUpload(image);
    }
  }, [image]);

  const handleUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName); //return storage reference
    const uploadImage = uploadBytesResumable(storageRef, image); //upload image to firebase
    uploadImage.on(
      "state-changed",
      (uploadedImage) => {
        const progress =
          (uploadedImage.bytesTransferred / uploadedImage.totalBytes) * 100;
        setImageUpload(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      async () => {
        const imgurl = await getDownloadURL(uploadImage.snapshot.ref);
        setFormData({ ...formData, photourl: imgurl });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const result = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await result.json();
      if (data.success === false) {
        dispatch(updateFail(data));
        await fetch("/api/auth/sign-out");
        dispatch(signOut());
        return;
      }
      dispatch(updateSuccess(data));
      setSuccessful(true);
    } catch (error) {
      dispatch(updateFail(error));
    }
  };
  const handleSignout = async () => {
    try {
      await fetch("/api/auth/sign-out");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="file"
          ref={refFile}
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          hidden
        />
        <img
          src={formData.photourl || currentUser.photourl}
          alt="profile photo"
          className="rounded-full h-20 w-20 self-center cursor-pointer"
          onClick={() => refFile.current.click()}
        />
        <p className="self-center">
          {imageError ? (
            <span className="text-red-700">max file size is 2 Mb</span>
          ) : imageUpload == 0 ? (
            ""
          ) : imageUpload > 0 && imageUpload < 100 ? (
            <span>{`Uploading... ${imageUpload} %`}</span>
          ) : (
            <span className="text-green-700">Upload Succesfully</span>
          )}
        </p>
        <input
          className="bg-slate-100 rounded-lg p-3"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        ></input>
        <input
          className="bg-slate-100 rounded-lg p-3"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        ></input>
        <input
          className="bg-slate-100 rounded-lg p-3"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        ></input>
        <button
          className="bg-sky-900 text-white uppercase p-3 rounded-lg mx-16 mt-6 disabled:opacity-70 hover:opacity-90"
          disabled={updateLoading}
        >
          {updateLoading ? "Loading...." : "Update"}
        </button>
      </form>
      <p className="mt-6 text-right hover:underline cursor-pointer text-red-700">
        <span onClick={handleSignout}>Sign out</span>
      </p>
      <p className="mt-6 text-center text-red-700">
        {updateError ? updateError.message || "Something went wrong" : ""}
      </p>
      <p className="mt-6 text-center text-green-700">
        {successful && "Update successfuly"}
      </p>
    </div>
  );
}
