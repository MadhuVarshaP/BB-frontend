"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TaskCard from "../../components/TaskCard";
import Image from "next/image";
import line from "../../public/line.png";
import { useAccount } from "wagmi";
import bgPattern from "../../public/bg-pattern.png";

export default function MyTasks() {
  const { address } = useAccount();
  const [tasks, setTasks] = useState([]); // State to hold claimed tasks
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch claimed tasks when component mounts
  useEffect(() => {
    const fetchClaimedTasks = async () => {
      try {
        const response = await axios.get(
          `https://bb-backend-eight.vercel.app/api/tasks/tasksClaimedByUser?walletAddress=${address}`
        );
        setTasks(response.data.tasks); // Assuming the API returns an object with a 'tasks' property
      } catch (err) {
        console.error("Error fetching claimed tasks:", err);
        setError("Failed to fetch claimed tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchClaimedTasks();
  }, [address]);

  const handleComplete = (taskId) => {
    console.log(`Task ${taskId} completed`);
  };

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
  {/* Semi-transparent overlay for opacity effect */}
  <div className="absolute inset-0 bg-[#1A0334] opacity-50 z-0"></div>

  {/* Content layer */}
  <div className="relative z-10">
    <Navbar />

    <div className="py-10">
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1DE9B6] to-[#7481DC] mx-auto">
          My Tasks
        </h1>
      </div>

      <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map((task) => (
          <TaskCard
            key={task.taskID}
            title={task.taskTitle}
            taskID={task.taskID}
            description={task.taskDescription}
            bounty={task.bounty}
            deadline={new Date(task.deadline).toLocaleDateString()}
            image={task.coverImage}
            onComplete={() => handleComplete(task.taskID)}
          />
        ))}
      </div>
    </div>

    <div className="flex justify-center my-[100px]">
      <Image src={line} alt="line" width={150} />
    </div>

    <Footer />
  </div>
</div>

  );
}
