import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from "@/config/contract";

export const useBountyContract = () => {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    // Function to set up provider, signer, and contract instance
    const setupContract = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          // Request access to the user's MetaMask account
          await window.ethereum.request({ method: "eth_requestAccounts" });

          // Set up ethers provider and signer
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          // Set up contract instance
          const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
          const contract = new ethers.Contract(contractAddress, abi, signer);

          setProvider(provider);
          setSigner(signer);
          setContract(contract);
        } catch (error) {
          console.error("Error setting up contract:", error);
        }
      } else {
        console.error("MetaMask not detected.");
      }
    };

    setupContract();
  }, []);

  return { contract, provider, signer };
};
