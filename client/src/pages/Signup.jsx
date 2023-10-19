import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(false);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      setIsLoading(false);
      if (resData.Status === "failed") {
        setError(true);
      }
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };
  return (
    <div className="p-5 max-w-lg mx-auto ">
      <h1 className="font-bold text-center text-3xl my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-200 rounded-lg p-4"
          onChange={handleChange}
        />
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
          {isLoading ? "Loading" : "SIGN UP"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700 hover:underline">Sign in</span>
        </Link>
      </div>
      <div>
        <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
      </div>
    </div>
  );
}
