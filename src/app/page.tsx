"use client";

import { useState } from "react";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserInfo = async () => {
    setError(null);
    setUserInfo(null);
    try {
      const response = await fetch(`/api/discord-user?userId=${userId}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserInfo(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Discord User Lookup</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter Discord User ID"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={fetchUserInfo}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Lookup User
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {userInfo && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">User Info</h2>
            <p><strong>ID:</strong> {userInfo.id}</p>
            <p><strong>Username:</strong> {userInfo.username}</p>
            <p><strong>Discriminator:</strong> {userInfo.discriminator}</p>
            <p><strong>Avatar:</strong> <img src={userInfo.avatar} alt="Avatar" /></p>
          </div>
        )}
      </div>
    </div>
  );
}