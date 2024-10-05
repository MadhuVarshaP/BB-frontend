"use client";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";

const Popup = ({ bounty, onClose }) => {
  const { contract } = useBountyContract();
  const [isClaimed, setIsClaimed] = useState(false); // State to track claim status
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const { address } = useAccount();

  if (!bounty) return null;

  const handleClaimBounty = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://bb-backend-eight.vercel.app/api/tasks/claimTask",
        {
          taskID: bounty.taskID,
          claimantWalletAddress: address, // Replace this with dynamic wallet address
        }
      );

      const tx = await contract.claimTask(bounty.taskID);
      await tx.wait();

      if (response.status === 200) {
        setIsClaimed(true);
        console.log("Bounty claimed successfully:", response.data);
      }
    } catch (err) {
      console.error("Error claiming bounty:", err);
      setError("Failed to claim bounty. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-[#BEBCB9] text-black p-6 rounded-lg max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{bounty.taskTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-800 hover:text-white transition"
          >
            X
          </button>
        </div>

        <div className="relative w-full h-64 mb-6">
          <Image
            src={bounty.coverImage}
            alt={bounty.taskTitle}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <div className="mt-4">
          <p>{bounty.taskDescription}</p>
          <p className="mt-4 text-lg">
            <strong>Bounty:</strong> {bounty.bounty}
          </p>
          <p className="mt-4 text-lg">
            <strong>Contact:</strong> {bounty.contact}
          </p>
          <p className="mt-4 text-lg">
            <strong>Address:</strong> {bounty.address}
          </p>
          <p className="mt-4 text-lg">
            <strong>Deadline:</strong> {bounty.deadline}
          </p>
        </div>

        {isClaimed ? (
          <p className="mt-6 text-green-600 font-semibold">
            Bounty claimed successfully!
          </p>
        ) : (
          <div className="flex flex-col mt-6 space-y-2">
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={handleClaimBounty}
              className={`px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Claiming..." : "Claim Bounty"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
