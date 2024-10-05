"use client";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { useBountyContract } from "@/app/hooks/useBountyContract";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const uploadFileToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Adjust your Cloudinary preset
    formData.append("cloud_name", "dv0frgqvj");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dv0frgqvj/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      throw new Error("File upload failed");
    }
  };

  const handleSubmit = async () => {
    if (!proofDescription || !proofFile) {
      setError("Please provide both proof description and proof file.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Upload the proof file first
      const proofFileUrl = await uploadFileToCloudinary(proofFile);

      // Submit the proof description and file URL to the backend
      const response = await axios.post(
        "https://bb-backend-eight.vercel.app/api/tasks/submitProof",
        {
          taskID: bounty.taskID,
          proofDescription,
          proofFileUrl, // Include the file URL from Cloudinary
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Call the smart contract to submit proof of task completion
      const tx = await contract.completeTask(bounty.taskID, proofDescription);
      await tx.wait();

      if (response.status === 200) {
        console.log("Proof submitted successfully:", response.data);
        toast.success("Proof submitted successfully!"); // Show success notification
        onClose(); // Close the popup on successful submission
      }
    } catch (err) {
      console.error("Error submitting proof:", err);
      setError("Failed to submit proof. Please try again.");
      toast.error("Failed to submit proof."); // Show error notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <ToastContainer /> {/* Toast for notifications */}
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
            {loading ? "Submitting..." : "Submit Proof"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionPopup;
