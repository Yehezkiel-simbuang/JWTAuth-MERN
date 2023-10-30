import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInStart,
  signInFail,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OauthButton from "../components/OauthButton";

export default function Signin() {
  const [data, setData] = useState({});
  const { isLoading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData.success === false) {
        dispatch(signInFail(resData));
        return;
      }
      dispatch(signInSuccess(resData));
      navigate("/");
    } catch (error) {
      dispatch(signInFail(error));
    }
  };
  return (
    <div className="p-5 max-w-lg mx-auto ">
      <h1 className="font-bold text-center text-3xl my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-200 rounded-lg p-4"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-200 rounded-lg p-4"
          onChange={handleChange}
        />
        <button
          className="bg-slate-500 rounded-lg py-4 mt-3 mx-16 text-white uppercase text-lg hover:opacity-90 disabled:opacity-70"
          disabled={isLoading}
        >
          {isLoading ? "Loading" : "SIGN IN"}
        </button>
        <OauthButton />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700 hover:underline">Sign up</span>
        </Link>
      </div>
      <div>
        <p className="text-red-700 mt-5">
          {error ? error.message || "Something went wrong!" : ""}
        </p>
      </div>
    </div>
  );
}
