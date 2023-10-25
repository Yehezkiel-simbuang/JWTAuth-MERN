import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const refFile = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imageError, setImageError] = useState(false);
  const [imageUpload, setImageUpload] = useState(0);
  const [formData, setFormData] = useState({});
  console.log(formData);

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
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-5">
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
        ></input>
        <input
          className="bg-slate-100 rounded-lg p-3"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
        ></input>
        <input
          className="bg-slate-100 rounded-lg p-3"
          id="password"
          placeholder="Password"
        ></input>
      </form>
    </div>
  );
}
