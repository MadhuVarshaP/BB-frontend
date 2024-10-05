"use client";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { useBountyContract } from "@/app/hooks/useBountyContract";

const CompletionPopup = ({ bounty, isOpen, onClose }) => {
  const { contract } = useBountyContract();
  const [proofDescription, setProofDescription] = useState("");
  const [proofFile, setProofFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;
  console.log(bounty);

  const handleFileChange = (e) => {
    setProofFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    // if (!proofDescription || !proofFile) {
    //   setError("Please provide both proof description and proof file.");
    //   return;
    // }

    setLoading(true);
    setError(null);

    try {
      // Send request to submit proof
      const response = await axios.post(
        "http://localhost:5002/api/tasks/submitProof",
        {
          taskID: bounty.taskID,
          proofDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const tx = await contract.completeTask(bounty.taskID, proofDescription);
      await tx.wait();

      if (response.status === 200) {
        console.log("Proof submitted successfully:", response.data);
        onClose(); // Close the popup on successful submission
      }
    } catch (err) {
      console.error("Error submitting proof:", err);
      setError("Failed to submit proof. Please try again.");
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
          <label className="block text-lg font-medium mb-2">
            Completion Proof Description:
          </label>
          <textarea
            value={proofDescription}
            onChange={(e) => setProofDescription(e.target.value)}
            className="w-full p-2 mb-4 bg-transparent text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-800"
            placeholder="Describe how you completed the task"
          />

          <label className="block text-lg font-medium mb-2">
            Proof File Upload:
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 mb-4 bg-transparent text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
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
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Claim Bounty"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionPopup;
