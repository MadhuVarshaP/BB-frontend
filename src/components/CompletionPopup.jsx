"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useBountyContract } from "../app/hooks/useBountyContract";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imageSample from "../public/assets/cycle.png";
import { IoCloudUploadSharp } from "react-icons/io5";
import { RiUploadCloud2Fill } from "react-icons/ri";

const CompletionPopup = ({ bounty, isOpen, onClose }) => {
  const { contract } = useBountyContract();
  const [proofDescription, setProofDescription] = useState("");
  const [proofFile, setProofFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  

  if (!isOpen) return null;
  console.log(bounty);

  const handleFileChange = (e) => {
    setProofFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
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
          alt={bounty.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Title */}
      <h2 className="text-[30px] font-orbitron font-bold text-center mt-6 bg-clip-text text-transparent bg-gradient-to-r from-[#EC407A] to-[#6A1B9A]">
        {bounty.title}
        {/* Cycle Repair */}
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

      <p className="text-[#6A1B9A] text-left mb-4">
        <strong>Address: </strong>
         {/* {bounty.address} */}
         0x12..cgr6t7ch5t7yg8ih
      </p>

      <div className="bg-gray-200 rounded-full inline-flex p-2 text-gray-600">
        <p>Posted 1 day ago</p>
      </div>

      <div className="m-3">
                <label className="block text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#E500FF] to-[#EC407A]">Completion Proof Description:</label>
                <textarea
                    value={proofDescription}
                    onChange={(e) => setProofDescription(e.target.value)}
                    className="w-full p-3 border-2 border-[#E500FF] rounded-lg bg-transparent text-black focus:outline-none mt-2"
                    placeholder="Describe how you completed the task"
                />
      </div>

                <div className="flex items-center border-2 border-[#E500FF] rounded-full px-4 py-2 m-3 space-x-2 "  onChange={handleUploadClick}>
                    <RiUploadCloud2Fill className="w-[40px] h-[40px] text-black"/>
                    <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#E500FF] to-[#EC407A] font-medium">
                    Proof File Upload
                </p>
                <input
        type="file"
        ref={fileInputRef} 
        onChange={handleFileChange}
        className="hidden"
      />
                </div>
                
   
        <div className="flex flex-col mt-6 space-y-2">
          {error && <p className="text-red-500 text-center">{error}</p>}
          
          <div className="flex justify-center space-x-5 font-orbitron">
            <button className="border border-[#E500FF] text-black px-4 py-2 rounded-full p-[2px]  rounded-full" onClick={onClose}>
               Close
            </button>
            <button
              
              className={`inline-flex py-2 px-4 bg-gradient-to-r from-[#E500FF] to-[#EC407A] text-white rounded-full hover:opacity-90 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Proof"}
            </button>

          </div>
        </div>
    </div>
  </div>
  );
};

export default CompletionPopup;
