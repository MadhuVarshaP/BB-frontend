"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import line from "@/public/line.png";
import Image from "next/image";
import { useAccount } from "wagmi";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const { address } = useAccount();
  // Fetch profile data when component loads
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/user/userProfile/${address}`
        );
        setProfileData(response.data.user);
        setProfileImage(response.data.user.profilePicture);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [address]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center py-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1DE9B6] to-[#EC407A] mb-8">
          Profile
        </h1>
        <div className="relative bg-gray-800 rounded-lg p-6 w-96 shadow-lg border border-gray-700">
          <div className="absolute inset-0 rounded-lg border-4 border-transparent bg-gradient-to-r from-[#1DE9B6] to-[#FFA726] -z-10" />
          <div className="flex justify-center mb-6">
            <label className="relative cursor-pointer">
              <div className="bg-gray-600 h-32 w-32 rounded-full overflow-hidden border-4 border-transparent hover:border-white transition duration-300">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    Upload Image
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </label>
          </div>
          {profileData ? (
            <div className="text-lg mb-2 space-y-2">
              <p className="font-semibold">Name: {profileData.name}</p>
              <p className="font-semibold">
                Worldcoin ID: {profileData.worldcoinID}
              </p>
              <p className="font-semibold">
                Wallet Address: {profileData.walletAddress}
              </p>
              <p className="font-semibold">
                Verification Status:{" "}
                {profileData.isVerified ? "Verified" : "Not Verified"}
              </p>
              <p className="font-semibold">
                Reputation Score: {profileData.reputation}
              </p>
              <p className="font-semibold">
                Completed Tasks: {profileData.completedTasks.length}
              </p>
              <p className="font-semibold">
                Created Tasks: {profileData.createdTasks.length}
              </p>
              <p className="font-semibold">
                Total Bounties Earned: {/* Add logic to calculate bounties */}
              </p>
            </div>
          ) : (
            <p>Loading profile data...</p>
          )}
          <button className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:opacity-90 transition">
            Submit
          </button>
        </div>
      </div>
      <div className="flex justify-center my-10">
        <Image src={line} alt="line" width={150} />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
