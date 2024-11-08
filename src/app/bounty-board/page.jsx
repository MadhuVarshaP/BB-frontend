"use client";

import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import line from "../../public/line.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Popup from "../../components/Popup";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import axios from "axios"; // Import axios for making API calls
// import Data from "@/components/Data";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import bgPattern from "../../public/bg-pattern.png";

const query = gql`
  {
    taskCreateds {
      title
      taskID
      id
      deadline
      creator
      bounty
    }
  }
`;

const url =
  "https://api.studio.thegraph.com/query/90328/bounty-bridge/version/latest";

export default function BountyBoard() {
  const [selectedPost, setSelectedPost] = useState(null);
  // const [bounties, setBounties] = useState([]); // State to hold fetched bounties
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for handling errors
  const [activeFilter, setActiveFilter] = useState("All Categories");

  const filterOptions = [
    "All Categories",
    "Posted Today",
    "Posted Yesterday",
    "Posted 2 days ago"
];

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  // Fetching bounties from the API
  // useEffect(() => {
  //   const fetchBounties = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5002/api/tasks/tasks?isClaimed=false"
  //       );
  //       setBounties(response.data.tasks); // Assuming the API returns an object with a 'tasks' property
  //     } catch (err) {
  //       console.error("Error fetching bounties:", err);
  //       setError("Failed to fetch bounties");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBounties();
  // }, []);

  const {
    data: graphData,
    isLoading: graphLoading,
    error: graphError,
  } = useQuery({
    queryKey: ["graphData"],
    async queryFn() {
      return await request(url, query);
    },
  });

  useEffect(() => {
    setLoading(graphLoading);
    if (graphError) {
      setError("Failed to fetch data from The Graph");
    }
  }, [graphLoading, graphError]);

  const bounties = graphData?.taskCreateds.map((task) => ({
    id: task.taskID,
    title: task.title,
    deadline: new Date(parseInt(task.deadline) * 1000).toLocaleDateString(),
    bounty: parseInt(task.bounty),
    creator: task.creator,
    coverImage: "", // Placeholder, add image URL if available
  }));

  if (loading) {
    return <p className="text-white text-center">Loading...</p>; // Show loading state
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>; // Show error state
  }

  return (
    <div
    className="bg-[#1A0334] min-h-screen font-orbitron relative" style={{
      backgroundImage: `url(${bgPattern.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <Navbar />
    <div className="absolute inset-0 bg-[#1A0334] opacity-50 z-0"></div>
    <div className="relative py-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1DE9B6] to-[#7481DC] mx-auto">
          Bounty Board
        </p>
  
        <Link
          href="/new-post"
          className="bg-gradient-to-r from-[#1DE9B6] to-[#7481DC] text-black py-2 px-4 rounded-full shadow hover:shadow-lg transition hover:opacity-90"
        >
          + Create a New Post
        </Link>
      </div>
      <div className="my-4 p-8 flex items-center justify-center space-x-4 rounded-lg">
                <div className="flex items-center bg-transparent border-2 border-[#1DE9B6] rounded-full px-4 py-2 space-x-2 w-full max-w-2xl">
                    <FaSearch width={20} height={20} />
                    <input
                        type="text"
                        placeholder="Search Tasks"
                        className="bg-transparent text-white outline-none w-full placeholder-gray-300"
                    />
                </div>
                <button className="bg-gradient-to-r from-[#1DE9B6] to-[#7481DC] text-black py-2 px-4 rounded-full shadow hover:shadow-lg transition hover:opacity-90">
                    Search
                </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex space-x-4 mt-4 justify-center">
                {filterOptions.map((option) => (
                    <button
                        key={option}
                        onClick={() => setActiveFilter(option)}
                        className={
                            activeFilter === option
                                ? "bg-gradient-to-r from-[#1DE9B6] to-[#7481DC] text-black py-2 px-4 rounded-full shadow hover:shadow-lg transition hover:opacity-90"
                                : "border-2 border-[#1DE9B6] text-white px-4 py-2 rounded-full"
                        }
                    >
                        {option}
                    </button>
                ))}
            </div>

      <div className="rounded-lg p-5 max-w-7xl mx-auto my-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bounties.map((bounty) => (
            <Card
              key={bounty.id}
              id={bounty.id}
              title={bounty.title}
              image={bounty.coverImage}
              description="Task Description" // Placeholder, replace with actual description if available
              deadline={bounty.deadline}
              bountyCount={bounty.bounty}
              address={bounty.creator}
              contact="Contact Placeholder" // Placeholder, replace with actual contact if available
              onClaim={() => setSelectedPost(bounty)}
            />
          ))}
        </div>
      </div>
    </div>
  
    <div className="flex justify-center my-[100px]">
      <Image src={line} alt="line" width={150} />
    </div>
  
    <Footer />
  
    {selectedPost && (
      <Popup bounty={selectedPost} onClose={handleClosePost} />
    )}
  </div>
  
  );
}
