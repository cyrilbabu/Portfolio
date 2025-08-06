"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { TiWatch } from "react-icons/ti";
import { CiCalendarDate } from "react-icons/ci";

export default function WinningPage({ params }) {
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [isClaimed, setIsClaimed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [upi, setUpi] = useState("");
  const [winnerData, setWinnerData] = useState(null);
  const [amount, setAmount] = useState("");

  const fetchWinner = useCallback(async () => {
    if (!baseUrl) {
      console.error("Base URL is not defined");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/blogs/check-winner/${id}/`);
      if (response.ok) {
        const data = await response.json();
        if (data.claimed) {
          setWinnerData(data);
          setAmount(data.amount);
          setIsClaimed(true);
        } else {
          setAmount(data.amount);
        }
      } else {
        console.error("Failed to fetch winner details");
      }
    } catch (error) {
      console.error("Error fetching winner details:", error);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, id]);

  useEffect(() => {
    fetchWinner();
  }, [fetchWinner]);

  const handleClaim = async () => {
    if (name.trim() === "" || email.trim() === "" || upi.trim() === "") return;

    try {
      const response = await fetch(`${baseUrl}/blogs/update-winner/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          email,
          upi_id: upi,
        }),
      });

      if (response.ok) {
        await fetchWinner(); // ✅ Call function correctly
      } else {
        const errorData = await response.json();
        console.error("Error claiming prize:", errorData.error);
      }
    } catch (error) {
      console.error("Error claiming prize:", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-blue-950 h-screen text-white animate-fade-in flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-blue-950 text-white min-h-screen flex flex-col items-center pt-20 px-4 text-center">
      <div className="bg-white/10 border border-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {isClaimed ? (
          <>
            <h1 className="text-4xl font-bold mb-6">🎉 Congratulations!</h1>
            <p className="text-2xl mb-2">
              <span className="font-semibold text-yellow-400">
                {winnerData.name}
              </span>
            </p>
            <p className="text-2xl mb-2">
              Won <span className="font-semibold">₹{amount}</span>
            </p>
            <p className="text-md text-gray-300 mt-3 border-t pt-3 flex items-center gap-4 justify-center">
              <span className="flex items-center gap-1">
                <CiCalendarDate />
                {winnerData.claimed_at.split("T")[0]}
              </span>
              <span className="flex items-center gap-1">
                <TiWatch />
                {winnerData.claimed_at.split("T")[1].split(".")[0].slice(0, 8)}
              </span>
            </p>

            <p className="text-lg my-4 text-green-500">
              Thank you for participating! Your prize will be sent to your UPI
              ID.
            </p>

            <Link
              href="/"
              className="border-2 border-white bg-white/20 py-2 px-6 w-full rounded hover:bg-white/30 transition mt-6 text-center text-lg font-semibold"
            >
              Go back to home
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-6">₹{amount}</h1>
            <p className="text-xl mb-6">
              Enter your details to claim your prize
            </p>

            <div className="w-full max-w-md text-left mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-3 py-2 rounded text-white bg-white/30 border-2 border-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full max-w-md text-left mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 rounded text-white bg-white/30 border-2 border-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-full max-w-md text-left mb-6">
              <label className="block mb-1 text-sm font-medium text-gray-200">
                UPI ID
              </label>
              <input
                type="text"
                placeholder="yourname@upi"
                className="w-full px-3 py-2 rounded text-white bg-white/30 border-2 border-white"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
              />
            </div>

            <button
              onClick={handleClaim}
              className="bg-yellow-400 text-black text-lg font-semibold px-6 py-2 rounded hover:bg-yellow-300 transition"
            >
              Claim Prize
            </button>
          </>
        )}
      </div>
    </div>
  );
}
