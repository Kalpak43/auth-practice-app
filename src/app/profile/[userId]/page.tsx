import React from "react";

export default function Profile({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  return (
    <main className="p-4 md:p-10">
      <h1>Profile</h1>
      <p>userId: {params.userId}</p>
    </main>
  );
}
