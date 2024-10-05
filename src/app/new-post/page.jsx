"use client";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import line from "../../public/line.png";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

import { ethers, hexlify, parseEther, toNumber } from "ethers";
import { useBountyContract } from "../hooks/useBountyContract";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
      route.push("/bounty-board"); // Redirect to the bounty board
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error creating task. Please try again.");
    }
  };

  return (
    <div className="bg-black min-h-screen font-poppins">
      <ToastContainer />
      <Navbar />

      <div className="flex flex-col items-center mt-10">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1DE9B6] to-[#EC407A]">
          Create a new Task
        </h2>

        <div className="bg-[#0d0d0d] text-white mt-8 p-10 rounded-lg max-w-md w-full flex flex-col items-center border border-gray-800">
          <div className="w-full">
            <div className="mb-4">
              <label className="block text-lg font-medium">Task Title:</label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent text-white"
                placeholder="Enter task title"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium">Cover Image:</label>

              {coverImageUrl ? (
                <Image
                  src={coverImageUrl}
                  alt="Preview"
                  width={70}
                  height={50}
                  className=" rounded-lg mb-4"
                />
              ) : null}

              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium">Description:</label>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="w-full p-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent text-white"
                placeholder="Enter task description"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium">
                Bounty (in $):
              </label>
              <input
                type="number"
                value={bounty}
                onChange={(e) => setBounty(e.target.value)}
                className="w-full p-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent text-white"
                placeholder="Enter bounty amount"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium">Deadline:</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent text-white"
              />
            </div>

            <button
              onClick={handleCreateTask}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:opacity-90 transition"
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
