"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    password: "",
  });
  const [disable, setDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (
      formData.email.length > 0 &&
      formData.username.length > 5 &&
      formData.password.length > 6
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/users/signup", formData);

      router.push("/login");
    } catch (error: any) {
      console.error("Signup Failed",error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center h-[100dvh] flex-col gap-8 p-4 md:p-10">
      <h1 className="text-3xl">Signup</h1>
      <form className="flex flex-col items-center gap-4 w-full" onSubmit={handleSubmit}>
        <div className="w-full  md:max-w-[300px]">
          <label className="text-xs">Email</label>
          <br />
          <input
            type="email"
            className="p-2 text-gray-900 block w-full"
            value={formData.email}
            ref={inputRef}
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className="w-full  md:max-w-[300px]">
          <label className="text-xs">Username</label>
          <br />
          <input
            type="text"
            className="p-2 text-gray-900 block w-full"
            value={formData.username}
            onChange={(e) => {
              setFormData({
                ...formData,
                username: e.target.value,
              });
            }}
          />
        </div>
        <div className="w-full  md:max-w-[300px]">
          <label className="text-xs">Password</label>
          <br />
          <input
            type="password"
            className="p-2 text-gray-900 block w-full"
            value={formData.password}
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
          />
        </div>
        <button
          className="bg-blue-500 px-4 py-2"
          type="submit"
          disabled={disable}
        >
          {loading ? "Processing..." : "Signup"}
        </button>
      </form>
      <p className="text-xs">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login Here
        </Link>
      </p>
    </main>
  );
}
