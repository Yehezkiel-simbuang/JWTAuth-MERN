import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
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
          <Link to="Sign-in">
            <li>Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
