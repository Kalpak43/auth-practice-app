"use client";

import React from "react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <main className="flex items-center justify-center h-[100dvh] flex-col gap-8 p-4 md:p-10 text-center">
      <h1 className="text-3xl">Verify Your Email</h1>
      <h2>{token === "" ? "No Tokden" : token}</h2>

      {verified && (
        <div>
          <p>Your email has been verified</p>
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      )}
    </main>
  );
}
