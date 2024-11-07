"use client";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { useBountyContract } from "../app/hooks/useBountyContract";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imageSample from "../public/assets/cycle.png";

const Popup = ({ bounty, onClose }) => {
  const { contract } = useBountyContract();
  const [isClaimed, setIsClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { address } = useAccount();

  if (!bounty) return null;

  const handleClaimBounty = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to claim this bounty?"
    );
    if (!userConfirmed) return; // Early exit if user cancels confirmation.

    setLoading(true);
    setError(null);

    try {
      // First, register claim on the backend
      const response = await axios.post(
        "https://bb-backend-eight.vercel.app/api/tasks/claimTask",
        {
          taskID: bounty.taskID,
          claimantWalletAddress: address,
        }
      );

      // Then call the smart contract to claim the bounty
      const tx = await contract.claimTask(bounty.taskID);
      await tx.wait();

      if (response.status === 200) {
        setIsClaimed(true);
        toast.success("Bounty claimed successfully!"); // Notify on success
      }
    } catch (err) {
      console.error("Error claiming bounty:", err);
      setError("Failed to claim bounty. Please try again.");
      toast.error("Failed to claim bounty. Please try again."); // Notify on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70 backdrop-blur-sm">
    <div
      className="bg-[#F0F0F0] font-jost rounded-lg shadow-lg p-6 relative overflow-hidden w-[750px] max-h-full pt-[90px]"
      style={{ boxShadow: '12px 12px 0px rgba(217, 217, 217, 0.3)' }}
    >
      <div className="absolute top-9 left-12 w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full"></div>
      <div className="absolute top-[240px] right-[90px] w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full"></div>

      
      <div className="relative w-[480px] h-[200px] mx-auto mb-4 flex justify-center items-center">
        <Image
          // src={bounty.coverImage}
          src={imageSample}
          alt={bounty.taskTitle}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Title */}
      <h2 className="text-[30px] font-orbitron font-bold text-center mt-6 bg-clip-text text-transparent bg-gradient-to-r from-[#EC407A] to-[#6A1B9A]">
        {/* {bounty.taskTitle} */}
        Cycle Repair
      </h2>

      {/* Description */}
      <p className="text-gray-700 text-left my-4">
        {bounty.taskDescription}
      </p>

      {/* Bounty and Deadline */}
      <p className="text-[#6A1B9A] text-left mb-1">
        <strong>Bounty: </strong> ${bounty.bounty}
      </p>
      <p className="text-[#6A1B9A] text-left mb-1">
        <strong>Deadline: </strong> {bounty.deadline}
      </p>

      {/* Contact and Address */}
      <p className="text-[#6A1B9A] text-left mb-1">
        <strong>Contact: </strong> 
        {/* {bounty.contact} */} +9123456789
      </p>
      <p className="text-[#6A1B9A] text-left mb-4">
        <strong>Address: </strong>
         {/* {bounty.address} */}
         0x12..cgr6t7ch5t7yg8ih
      </p>

      <div className="bg-gray-200 rounded-full inline-flex p-2 text-gray-600">
        <p>Posted 1 day ago</p>
      </div>

      {/* Claim Status or Button */}
      {isClaimed ? (
        <p className="mt-6 text-green-600 font-semibold text-center">
          Bounty claimed successfully!
        </p>
      ) : (
        <div className="flex flex-col mt-6 space-y-2">
          {error && <p className="text-red-500 text-center">{error}</p>}
          
          <div className="flex justify-center space-x-5 font-orbitron">
            <button className="border border-[#E500FF] text-black px-4 py-2 rounded-full p-[2px]  rounded-full" onClick={onClose}>
               Close
            </button>
            <button
              onClick={handleClaimBounty}
              className={`inline-flex py-2 px-4 bg-gradient-to-r from-[#E500FF] to-[#EC407A] text-white rounded-full hover:opacity-90 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Claiming..." : "Claim Bounty"}
            </button>

          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default Popup;
