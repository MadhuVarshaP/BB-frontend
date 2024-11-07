"use client";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import line from "../../public/line.png";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import wave from "../../public/wave.png";
import { ethers, hexlify, parseEther, toNumber } from "ethers";
import { useBountyContract } from "../hooks/useBountyContract";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRef } from 'react';
import Link from "next/link";

function NewPost() {
  const { address } = useAccount();
  const { contract } = useBountyContract();
  const route = useRouter();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [bounty, setBounty] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState(""); // Replace with actual wallet address when connected
  const fileInputRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setCoverImageUrl(URL.createObjectURL(file)); // Preview image
    }
  };

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "ml_default");
    formData.append("cloud_name", "dv0frgqvj");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dv0frgqvj/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Image upload failed");
    }
  };

  const handleCreateTask = async () => {
    try {
      let uploadedImageUrl = "";
      if (selectedImage) {
        uploadedImageUrl = await uploadImageToCloudinary();
      }

      const timestamp = Math.floor(new Date(deadline).getTime() / 1000);
      const bountyInWei = parseEther(bounty);

      // Call the smart contract to create a task
      console.log(
        "Creating task on blockchain...",
        taskTitle,
        taskDescription,
        bountyInWei,
        timestamp
      );

      const tx = await contract.createTask(
        taskTitle,
        taskDescription,
        bountyInWei,
        timestamp,
        {
          value: bountyInWei, // Sending the bounty as the value in the transaction
          gasLimit: 300000,
        }
      );
      const receipt = await tx.wait();
      console.log(receipt);

      let taskID = null;
      const eventSignatureHash = ethers.id(
        "TaskCreated(uint256,string,address,uint256,uint256)"
      );

      for (const log of receipt.logs) {
        if (log.topics[0] === eventSignatureHash) {
          taskID = toNumber(log.topics[1]); // Extract taskID
          break;
        }
      }

      if (taskID === null) {
        throw new Error("Failed to get task ID from blockchain transaction");
      }

      console.log("Task created on blockchain with ID:", taskID);

      const response = await axios.post(
        "https://bb-backend-eight.vercel.app/api/tasks/create",
        {
          taskTitle,
          taskID,
          taskDescription,
          coverImage: uploadedImageUrl,
          bounty,
          deadline: timestamp,
          creatorWalletAddress: address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Task created successfully:", response.data);
      toast.success("Task created successfully!");
      route.push("/bounty-board"); 
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error creating task. Please try again.");
    }
  };

  return (

    <div className="py-10 bg-[#1A0334] min-h-screen font-orbitron text-white relative flex flex-col items-center">
    <ToastContainer />

    <div className="absolute top-0 w-full h-[350px] z-0 mx-0">
        <Image src={wave} alt="Background Wave" layout="fill" objectFit="cover" />
    </div>


    <div className="relative z-10 mt-[300px] flex flex-col items-center p-6 space-y-10">
        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1DE9B6] to-[#7481DC] ">
            Create a new Task
        </h2>

       
        <div className="text-white p-5 rounded-lg max-w-md w-full flex flex-col items-center space-y-6">
            
            <div className="w-full">
                <label className="block text-lg font-medium text-teal-300">Task Title:</label>
                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full p-3 mt-2 border-2 border-[#1DE9B6] rounded-full bg-transparent text-white focus:outline-none"
                    placeholder="Enter task title"
                />
            </div>

            <div className="w-full">
      <label className="block text-lg font-medium text-teal-300 mb-2">Cover Image:</label>
      
      <div
        onClick={() => fileInputRef.current.click()} // Use the ref to trigger click
        className="w-full h-40 bg-gray-300 rounded-lg flex items-center justify-center shadow-lg shadow-gray-700 cursor-pointer mb-4" style={{ boxShadow: '12px 12px 0px rgba(217, 217, 217, 0.3)'}} 
      >
        {coverImageUrl ? (
            <div className="relative w-full h-full rounded-lg shadow-lg " >
            <Image
              src={coverImageUrl}
              alt="Preview"
              layout="fill"          
              objectFit="cover"      
              className="rounded-lg"
            />
          </div>
        ) : (
          <span className="text-gray-600 font-semibold">Upload</span>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef} 
        onChange={handleImageChange}
        className="hidden"
      />
    </div>

            <div className="w-full">
                <label className="block text-lg font-medium text-teal-300">Description:</label>
                <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="w-full p-3 border-2 border-[#1DE9B6] rounded-lg bg-transparent text-white focus:outline-none mt-2"
                    placeholder="Enter task description"
                />
            </div>

            <div className="w-full">
                <label className="block text-lg font-medium text-teal-300">Bounty (in $):</label>
                <input
                    type="number"
                    value={bounty}
                    onChange={(e) => setBounty(e.target.value)}
                    className="w-full p-3 border-2 border-[#1DE9B6] rounded-full bg-transparent text-white focus:outline-none mt-2"
                    placeholder="Enter bounty amount"
                />
            </div>

            <div className="w-full">
                <label className="block text-lg font-medium text-teal-300">Deadline:</label>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-3 border-2 border-[#1DE9B6] rounded-full bg-transparent text-white focus:outline-none mt-2 "
                />
            </div>

            <div className="flex space-x-5 pt-3 justify-center">
            <Link href='/bounty-board' className="border border-[#E500FF] text-white px-4 py-2 rounded-full p-[2px]  rounded-full">
               Back
            </Link>
            <button
          onClick={handleCreateTask}
          className="py-2 px-4 bg-gradient-to-r from-[#E500FF] to-[#EC407A] text-white rounded-full hover:opacity-90 transition"
        >
          Post Task
        </button>
            </div>
        </div>
    </div>

    <div className="flex justify-center my-[100px]">
        <Image src={line} alt="line" width={150} />
    </div>

    <Footer />
</div>

  );
}

export default NewPost;
