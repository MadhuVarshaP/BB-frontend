"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import Image from "next/image";
import line from "@/public/line.png";
import { useAccount } from "wagmi";

export default function MyPosts() {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { address } = useAccount();

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/tasks/tasksCreatedByUser?walletAddress=${address}`
        );
        setPosts(response.data.tasks); // Assuming the API returns an object with a 'tasks' property
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [address]);

  const handleComplete = (postId) => {
    console.log(`Post ${postId} completed`);
  };

  if (loading) {
    return <p className="text-white text-center">Loading...</p>; // Show loading state
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>; // Show error state
  }

  return (
    <div className="bg-black min-h-screen font-poppins">
      <Navbar />

      <div className="py-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1DE9B6] to-[#EC407A]">
            My Posts
          </h1>
        </div>

        <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard
              key={post.taskID} // Use taskID as key for uniqueness
              title={post.taskTitle} // Assuming taskTitle exists in fetched data
              description={post.taskDescription} // Assuming taskDescription exists in fetched data
              bountyCount={post.bounty} // Assuming bounty exists in fetched data
              deadline={new Date(post.deadline).toLocaleDateString()} // Format date as needed
              image={post.coverImage} // Assuming coverImage exists in fetched data
              walletAddress={post.claimantWalletAddress}
              proofDescription={post.proofData}
              verificationStatus={post.verificationStatus}
              taskID={post.taskID}
              onComplete={() => handleComplete(post.taskID)} // Handle post completion
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center my-[100px]">
        <Image src={line} alt="line" width={150} />
      </div>

      <Footer />
    </div>
  );
}
