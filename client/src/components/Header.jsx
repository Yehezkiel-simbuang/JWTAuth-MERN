import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200 p-5">
      <div className="flex justify-between mx-8">
        <Link to="/">
          <p className="text-lg font-bold">App</p>
        </Link>
        <ul className="flex gap-8 text-lg">
          <Link to="/About">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.photourl}
                alt="Profile picture"
                className="h-11 w-11 rounded-full"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
