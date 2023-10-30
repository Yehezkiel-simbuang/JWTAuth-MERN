import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInFail, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OauthButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleLoginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photourl: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFail(error));
    }
  };
  return (
    <button
      type="button"
      onClick={googleLoginHandler}
      className="bg-red-600 rounded-lg py-4 mt-3 mx-16 text-white uppercase text-lg hover:opacity-90 disabled:opacity-70"
    >
      SIGN IN WITH GOOGLE
    </button>
  );
}
