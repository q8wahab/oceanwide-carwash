"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = phone.trim();
    if (cleanedPhone) {
      router.push(`/${cleanedPhone}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Oceanwide Car Wash</h1>
      <p className="text-gray-600 mb-6 text-center">Enter your phone number to check your wash progress and see how close you are to your next free wash!</p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Check Progress
        </button>
      </form>

      <div className="mt-6 text-gray-500 text-sm">
        Follow us:
        <div className="flex justify-center gap-4 mt-2">
          <a href="https://www.instagram.com/oceanwidecarwash" target="_blank" className="text-blue-500 underline">Instagram</a>
          <a href="https://wa.me/96599566232" target="_blank" className="text-green-500 underline">WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
