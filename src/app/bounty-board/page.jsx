"use client";

import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import line from "../../public/line.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Popup from "../../components/Popup";
import Link from "next/link";
import axios from "axios"; // Import axios for making API calls
// import Data from "@/components/Data";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

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
    <div className="bg-black min-h-screen font-poppins">
      <Navbar />

      <div className="py-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1DE9B6] to-[#EC407A]">
            Bounty Board
          </p>

          <Link
            href="/new-post"
            className="bg-white text-black py-2 px-4 rounded-full shadow hover:shadow-lg transition hover:opacity-90"
          >
            + Create a New Post
          </Link>
        </div>

        <div className="bg-black rounded-lg p-5 max-w-7xl mx-auto">
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
      {/* <Data /> */}

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

// import line from "../../public/line.png";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import Popup from "../../components/Popup";
// import Link from "next/link";
// import axios from "axios"; // Import axios for making API calls
// import Navbar from "../../components/Navbar";
// import Card from "../../components/Card";
// import Footer from "../../components/Footer";

// export default function BountyBoard() {
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [bounties, setBounties] = useState([]); // State to hold fetched bounties
//   const [loading, setLoading] = useState(true); // State for loading status
//   const [error, setError] = useState(null); // State for handling errors

//   const handlePostSubmit = (bounty) => {
//     setSelectedPost(bounty);
//   };

//   const handleClosePost = () => {
//     setSelectedPost(null);
//   };

//   // Fetching bounties from the API
//   useEffect(() => {
//     const fetchBounties = async () => {
//       try {
//         const response = await axios.get(
//           "https://bb-backend-eight.vercel.app/api/tasks/tasks?isClaimed=false"
//         );
//         setBounties(response.data.tasks); // Assuming the API returns an object with a 'tasks' property
//       } catch (err) {
//         console.error("Error fetching bounties:", err);
//         setError("Failed to fetch bounties");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBounties();
//   }, []);

//   if (loading) {
//     return <p className="text-white text-center">Loading...</p>; // Show loading state
//   }

//   if (error) {
//     return <p className="text-red-500 text-center">{error}</p>; // Show error state
//   }

//   return (
//     <div className="bg-black min-h-screen font-poppins">
//       <Navbar />

//       <div className="py-10">
//         <div className="max-w-6xl mx-auto flex justify-between items-center">
//           <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1DE9B6] to-[#EC407A]">
//             Bounty Board
//           </p>

//           <Link
//             href="/new-post"
//             className="bg-white text-black py-2 px-4 rounded-full shadow hover:shadow-lg transition hover:opacity-90"
//           >
//             + Create a New Post
//           </Link>
//         </div>

//         <div className="bg-black rounded-lg p-5 max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {bounties.map((bounty) => (
//               <Card
//                 key={bounty.taskID}
//                 id={bounty.taskID}
//                 title={bounty.taskTitle}
//                 image={bounty.coverImage}
//                 description={bounty.taskDescription}
//                 deadline={new Date(bounty.deadline).toLocaleDateString()}
//                 bountyCount={bounty.bounty}
//                 address={bounty.creatorWalletAddress}
//                 contact={bounty.contact}
//                 onClaim={() => handlePostSubmit(bounty)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       {/* <Data /> */}

//       <div className="flex justify-center my-[100px]">
//         <Image src={line} alt="line" width={150} />
//       </div>

//       <Footer />

//       {selectedPost && (
//         <Popup bounty={selectedPost} onClose={handleClosePost} />
//       )}
//     </div>
//   );
// }
