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
          `https://bb-backend-eight.vercel.app/api/user/userProfile/${address}`
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
        <div className="relative bg-gray-800 rounded-lg p-6 w-100 shadow-lg border border-gray-700">
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
              <div className="mb-2">
                <label className="font-semibold">Name:</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
                />
              </div>
              <div className="text-lg mb-2 space-y-4">
                <div>
                  <label className="font-semibold">Worldcoin ID:</label>
                  <input
                    type="text"
                    value={profileData.worldcoinID}
                    onChange={(e) =>
                      handleInputChange("worldcoinID", e.target.value)
                    }
                    className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold">Wallet Address:</label>
                  <input
                    type="text"
                    value={profileData.walletAddress}
                    onChange={(e) =>
                      handleInputChange("walletAddress", e.target.value)
                    }
                    className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold">Verification Status:</label>
                  <input
                    type="text"
                    value={profileData.isVerified ? "Verified" : "Not Verified"}
                    className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
                    disabled
                    placeholder={
                      profileData.isVerified ? "Verified" : "Not Verified"
                    }
                  />
                </div>

                <div>
                  <label className="font-semibold">Reputation Score:</label>
                  <input
                    value={profileData.reputation}
                    onChange={(e) =>
                      handleInputChange("reputation", e.target.value)
                    }
                    className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold">Completed Tasks:</label>
                  <input
                    type="number"
                    value={profileData.completedTasks.length}
                    className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
                    disabled
                  />
                </div>

                <div>
                  <label className="font-semibold">Created Tasks:</label>
                  <input
                    type="number"
                    value={profileData.createdTasks.length}
                    className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
                    disabled
                  />
                </div>

                <div>
                  <label className="font-semibold">
                    Total Bounties Earned:
                  </label>
                  <input
                    type="number"
                    // value=
                    className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
                    disabled
                  />
                </div>
              </div>
            </div>
          ) : (
            <p>Loading profile data...</p>
          )}
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
