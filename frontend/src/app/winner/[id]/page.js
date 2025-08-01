"use client";

import React, { useState } from "react";

export default function WinningPage({
  isClaimedInitially = false,
  claimedData = null,
}) {
  const [isClaimed, setIsClaimed] = useState(isClaimedInitially);
  const [name, setName] = useState("");
  const [winnerData, setWinnerData] = useState(claimedData);

  const handleClaim = () => {
    if (name.trim() === "") return;
    const newClaim = {
      name,
      amount: "₹5,000",
      time: new Date().toLocaleString(),
    };
    setWinnerData(newClaim);
    setIsClaimed(true);
  };

  return (
    <div className="bg-blue-950 text-white min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {isClaimed ? (
        <>
          <h1 className="text-4xl font-bold mb-6">🎉 Congratulations!</h1>
          <p className="text-2xl mb-2">
            Name: <span className="font-semibold">{winnerData.name}</span>
          </p>
          <p className="text-2xl mb-2">
            Amount: <span className="font-semibold">{winnerData.amount}</span>
          </p>
          <p className="text-md text-gray-300">Claimed At: {winnerData.time}</p>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-6">🏆 You’ve Won!</h1>
          <p className="text-xl mb-6">Enter your name to claim your prize</p>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full max-w-md p-3 rounded text-black mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleClaim}
            className="bg-yellow-400 text-black text-lg font-semibold px-6 py-2 rounded hover:bg-yellow-300 transition"
          >
            Claim Prize
          </button>
        </>
      )}
    </div>
  );
}
