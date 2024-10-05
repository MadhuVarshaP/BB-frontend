"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useBountyContract } from "@/app/hooks/useBountyContract";

const VerificationPopup = ({ isOpen, onClose, bounty }) => {
  const { contract } = useBountyContract();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(isOpen, bounty);
  if (!isOpen) return null;

  const handleVerify = async () => {
    setLoading(true);
    setError(null);
    try {
      // Send request to verify proof
      const response = await axios.post(
        "http://localhost:5002/api/tasks/verifyProof",
        {
          taskID: bounty.taskID,
          verified: true,
        }
      );

      const tx = await contract.verifyTask(bounty.taskID, true);
      await tx.wait();

      if (response.status === 200) {
        console.log("Task verified successfully:", response.data);
        onClose(); // Close the popup on successful verification
      }
    } catch (err) {
      console.error("Error verifying task:", err);
      setError("Failed to verify task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-[#BEBCB9] text-black p-6 rounded-lg max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{bounty.title}</h2>
        </div>

        <div className="relative w-full h-64 mb-6">
          <Image
            src={bounty.image}
            alt={bounty.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <div className="mt-4">
          <p className="text-lg font-medium mb-2">Claimant Wallet Address:</p>
          <p className="mb-4">{bounty.walletAddress}</p>

          <p className="text-lg font-medium mb-2">Proof Description:</p>
          <p className="mb-4">{bounty.proofDescription}</p>

          <p className="text-lg font-medium mb-2">Proof File:</p>
          <p className="mb-4">{bounty.proofFile || "No file uploaded"}</p>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-end mt-6 space-x-4">
          <button
            className="py-2 px-4 bg-gray-500 text-white rounded-full font-semibold hover:opacity-90 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:opacity-90 transition"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Mark as Verified"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPopup;
