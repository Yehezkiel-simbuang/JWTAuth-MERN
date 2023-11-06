import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { useSelector } from "react-redux";
export default function Home() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const verification = async () => {
      try {
        const verif = await fetch("/api/auth/authenticate");
        const data = await verif.json();
        if (data.success == false && currentUser) {
          dispatch(signOut());
        }
      } catch (error) {
        console.log("");
      }
    };
    verification();
  });
  return <div>Home</div>;
}
