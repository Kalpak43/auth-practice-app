"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = React.useState<any>(null);
  const handleClick = async () => {
    try {
      const response = await axios("/api/users/logout");
      toast.success("Logout Successful");

      router.push("/login");
    } catch (error: any) {
      console.error("Logout Failed", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios("/api/users/me");
      console.log("Profile Page Data:");
      console.log(res.data.user);
      setData(res.data.user);
    };
    
    getUserDetails();
  }, []);

  return (
    <main className="p-4 md:p-10">
      <h1>Profile Page</h1>
      {data && (
        <div>
          <p>
            <strong>Username:</strong> {data.username}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
        </div>
      )}
      <br />
      <button className="bg-red-500 text-white p-2" onClick={handleClick}>
        LogOut
      </button>
    </main>
  );
}
