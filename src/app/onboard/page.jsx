"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import axios from "axios";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useBountyContract } from "../hooks/useBountyContract";
import { toast, ToastContainer } from "react-toastify";
import illustration from "../../public/user-onboard.png"; // User illustration
import wave from "../../public/wave.png"; // Background wave image
import "react-toastify/dist/ReactToastify.css";

function Onboard() {
  const { address } = useAccount();
  const { contract } = useBountyContract();
  const route = useRouter();
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [userType, setUserType] = useState("User");

  const handleRegisterUser = async () => {
    if (!address) {
      console.error("Wallet address is missing");
      toast.error("Please connect your wallet.");
      return;
    }

    const { uploadedImages } = await uploadImagesToCloudinary();

    try {
      const response = await axios.post(
        "https://bb-backend-eight.vercel.app/api/user/createUser",
        {
          walletAddress: address,
          name: name,
          profilePictureUrl: uploadedImages,
          worldcoinID: localStorage.getItem("worldCoinId"),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const worldcoinID = localStorage.getItem("worldCoinId");

      const tx = await contract.registerUser(worldcoinID, name, uploadedImages);
      await tx.wait();

      toast.success("User registered successfully!");
      route.push("/bounty-board");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Error registering user. Please try again.");
    }
  };

  return (
    <div className="bg-[#1A0334] min-h-screen font-octabrain text-white relative flex flex-col items-center justify-center">
    <ToastContainer />
  
    {/* Background Wave */}
    <div className="absolute top-0 w-full h-[350px] z-0 mx-0">
      <Image src={wave} alt="Background Wave" layout="fill" objectFit="cover" />
    </div>
  
    {/* Onboarding Content */}
    <div className="relative z-10 mt-[300px] flex items-center space-x-10 p-6">
      {/* Left Side - Form */}
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Title */}
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1DE9B6] to-[#7481DC]">
          Welcome Onboard!
        </h2>
  
        {/* Name Input */}
        <label className="w-full max-w-md text-lg font-medium text-teal-300">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 p-3 border-2 border-[#1DE9B6] bg-transparent text-white focus:outline-none rounded-full"
            placeholder="Enter your name"
          />
        </label>
  

        <div class="relative p-3 border-2 rounded-full w-full border-[#1DE9B6]">
  
    <div class="absolute -top-3 left-4 bg-[#1A0334] px-2 text-[#1DE9B6] font-semibold">
        Wallet Address
    </div>
    <p class="text-white">
    {address || "0xa7yhg...fjfh5i97"}
    </p>
</div>
  
        {/* Verify with Worldcoin Button */}
        <button
          onClick={handleRegisterUser}
          className="p-2 bg-gradient-to-r from-[#E500FF] to-[#EC407A] text-white rounded-full hover:opacity-90 transition"
        >
          Verify with Worldcoin
        </button>
      </div>
  
      {/* Right Side - User Illustration */}
      <div className="flex-shrink-0">
        <Image src={illustration} alt="User Illustration" width={400} height={400} />
      </div>
    </div>
  </div>
  

  );
}

export default Onboard;
