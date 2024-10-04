"use client";
import Link from "next/link";
import React from "react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const Navbar = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  // Function to format the wallet address
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full m-10">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-3xl font-bold">BountyBridge</p>
        <div className="flex space-x-8">
          <Link href="/" className="text-white hover:underline">
            Home
          </Link>
          <Link href="/my-tasks" className="text-white hover:underline">
            My Tasks
          </Link>
          <Link href="/my-posts" className="text-white hover:underline">
            My Posts
          </Link>
          <Link href="/profile" className="text-white hover:underline">
            Profile
          </Link>
        </div>
        <button
          onClick={() => open()}
          className="px-4 py-2 bg-white text-black font-medium rounded-full hover:bg-opacity-90"
        >
          {isConnected ? formatAddress(address) : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
