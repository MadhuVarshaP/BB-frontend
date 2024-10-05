"use client";

import React, { useEffect, useState } from "react";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

export default function WorldCoinConnect() {
  const [worldcoinVerified, setWorldcoinVerified] = useState(false);
  const [worldcoinId, setWorldcoinId] = useState<any>(null);
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  // Function to format the wallet address
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    const signature = localStorage.getItem("worldcoinSignature");
    if (signature) {
      setWorldcoinVerified(true);
      const worldcoinSignature = JSON.parse(signature);
      setWorldcoinId({
        nullifier_hash: worldcoinSignature.message,
      });
      console.log("Loaded worldcoin");
      localStorage.setItem(
        "worldcoinSignature",
        JSON.stringify(worldcoinSignature)
      );
    }
  }, [worldcoinVerified]);

  const handleVerify = async (proof: any) => {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proof }),
    });
    if (!response.ok) {
      throw new Error(`Error verifying Worldcoin: ${response.statusText}`);
    }

    const data = await response.json();
    setWorldcoinVerified(data.verified);
  };

  const handleSign = async (message: string) => {
    console.log("Connected to Worldcoin");
  };

  const onSuccess = async (proof: any) => {
    // Sign the verified nullifier hash and store in the localStorage
    await handleSign(proof.nullifier_hash);
    localStorage.setItem("worldCoinId", proof.nullifier_hash);
    console.log(proof);
    setWorldcoinId(proof);
  };

  return (
    <>
      {!worldcoinId ? (
        <IDKitWidget
          app_id="app_staging_f0111a769fbbfbc726f8ddd8bc4316ac"
          action="verify_human" // this is your action id from the Developer Portal
          onSuccess={onSuccess} // callback when the modal is closed
          handleVerify={handleVerify} // optional callback when the proof is received
          verification_level={VerificationLevel.Device}
        >
          {({ open }) => (
            <button
              className="flex items-center font-bold text-lg px-4 py-2 bg-black text-white rounded-md cursor-pointer"
              onClick={open}
            >
              <img
                src="https://i.ibb.co/P4mg2Z9/image.png"
                alt=""
                className="rounded-full h-8 w-8 mr-2"
              />
              Get Started
            </button>
          )}
        </IDKitWidget>
      ) : (
        <button
          onClick={() => open()}
          className="px-4 py-2 bg-white text-black font-medium rounded-full hover:bg-opacity-90"
        >
          {isConnected ? formatAddress(address) : "Connect Wallet"}
        </button>
      )}
    </>
  );
}
