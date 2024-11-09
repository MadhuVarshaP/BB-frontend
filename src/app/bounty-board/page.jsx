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
  className="bg-[#1A0334] min-h-screen font-orbitron relative"
  style={{
    backgroundImage: `url(${bgPattern.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  <Navbar />
  
  {/* Overlay for background darkening effect */}
  <div className="absolute inset-0 bg-[#1A0334] opacity-50 z-0"></div>

  <div className="relative py-10 px-4 sm:px-6 md:px-10 lg:px-20">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1DE9B6] to-[#7481DC] mx-auto md:mx-0">
        Bounty Board
      </p>

      <Link
        href="/new-post"
        className="bg-gradient-to-r from-[#1DE9B6] to-[#7481DC] text-black py-2 px-4 rounded-full shadow hover:shadow-lg transition hover:opacity-90 text-center"
      >
        + Create a New Post
      </Link>
    </div>

    {/* Search and Filter Section */}
    <div className="my-4 p-4 md:p-8 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-x-4 rounded-lg">
      <div className="flex items-center bg-transparent border-2 border-[#1DE9B6] rounded-full px-4 py-2 space-x-2 w-full max-w-2xl">
        <FaSearch width={20} height={20} />
        <input
          type="text"
          placeholder="Search Tasks"
          className="bg-transparent text-white outline-none w-full placeholder-gray-300"
        />
      </div>
      <button className="bg-gradient-to-r from-[#1DE9B6] to-[#7481DC] text-black py-2 px-4 rounded-full shadow hover:shadow-lg transition hover:opacity-90 w-full md:w-auto">
        Search
      </button>
    </div>

    {/* Filter Buttons */}
    <div className="flex flex-wrap space-x-2 md:space-x-4 mt-4 justify-center">
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

    {/* Bounties Grid Section */}
    <div className="rounded-lg p-5  mx-auto my-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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

  {/* Decorative Line */}
  <div className="flex justify-center my-10 md:my-20 relative z-20">
    <Image src={line} alt="line" width={100} height={100} />
  </div>

  <Footer />

  {/* Popup for Selected Bounty */}
  {selectedPost && (
    <Popup bounty={selectedPost} onClose={handleClosePost} />
  )}
</div>

  
  );
}
