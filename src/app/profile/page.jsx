// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import line from "../../public/line.png";
// import Image from "next/image";
// import { useAccount } from "wagmi";

// const Profile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [profileImage, setProfileImage] = useState(null);
//   const { address } = useAccount();
//   // Fetch profile data when component loads
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get(
//           `https://bb-backend-eight.vercel.app/api/user/userProfile/${address}`
//         );
//         setProfileData(response.data.user);
//         setProfileImage(response.data.user.profilePicture);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };

//     fetchProfileData();
//   }, [address]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Navbar />
//       <div className="flex flex-col items-center py-10">
//         <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1DE9B6] to-[#EC407A] mb-8">
//           Profile
//         </h1>
//         <div className="relative bg-gray-800 rounded-lg p-6 w-100 shadow-lg border border-gray-700">
//           <div className="absolute inset-0 rounded-lg border-4 border-transparent bg-gradient-to-r from-[#1DE9B6] to-[#FFA726] -z-10" />
//           <div className="flex justify-center mb-6">
//             <label className="relative cursor-pointer">
//               <div className="bg-gray-600 h-32 w-32 rounded-full overflow-hidden border-4 border-transparent hover:border-white transition duration-300">
//                 {profileImage ? (
//                   <img
//                     src={profileImage}
//                     alt="Profile"
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <div className="h-full w-full flex items-center justify-center text-gray-400">
//                     Upload Image
//                   </div>
//                 )}
//               </div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//                 onChange={handleImageChange}
//               />
//             </label>
//           </div>
//           {profileData ? (
//             <div className="text-lg mb-2 space-y-2">
//               <div className="mb-2">
//                 <label className="font-semibold">Name:</label>
//                 <input
//                   type="text"
//                   value={profileData.name}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                   className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
//                 />
//               </div>
//               <div className="text-lg mb-2 space-y-4">
//                 <div>
//                   <label className="font-semibold">Worldcoin ID:</label>
//                   <input
//                     type="text"
//                     value={profileData.worldcoinID}
//                     onChange={(e) =>
//                       handleInputChange("worldcoinID", e.target.value)
//                     }
//                     className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
//                   />
//                 </div>

//                 <div>
//                   <label className="font-semibold">Wallet Address:</label>
//                   <input
//                     type="text"
//                     value={profileData.walletAddress}
//                     onChange={(e) =>
//                       handleInputChange("walletAddress", e.target.value)
//                     }
//                     className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
//                   />
//                 </div>

//                 <div>
//                   <label className="font-semibold">Verification Status:</label>
//                   <input
//                     type="text"
//                     value={profileData.isVerified ? "Verified" : "Not Verified"}
//                     className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
//                     disabled
//                     placeholder={
//                       profileData.isVerified ? "Verified" : "Not Verified"
//                     }
//                   />
//                 </div>

//                 <div>
//                   <label className="font-semibold">Reputation Score:</label>
//                   <input
//                     value={profileData.reputation}
//                     onChange={(e) =>
//                       handleInputChange("reputation", e.target.value)
//                     }
//                     className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
//                   />
//                 </div>

//                 <div>
//                   <label className="font-semibold">Completed Tasks:</label>
//                   <input
//                     type="number"
//                     value={profileData.completedTasks.length}
//                     className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
//                     disabled
//                   />
//                 </div>

//                 <div>
//                   <label className="font-semibold">Created Tasks:</label>
//                   <input
//                     type="number"
//                     value={profileData.createdTasks.length}
//                     className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
//                     disabled
//                   />
//                 </div>

//                 <div>
//                   <label className="font-semibold">
//                     Total Bounties Earned:
//                   </label>
//                   <input
//                     type="number"
//                     // value=
//                     className="border border-white rounded-full p-1 text-sm w-full bg-transparent text-white"
//                     disabled
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p>Loading profile data...</p>
//           )}
//         </div>
//       </div>
//       <div className="flex justify-center my-10">
//         <Image src={line} alt="line" width={150} />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Profile;



// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import Image from "next/image";
// import { useAccount } from "wagmi";
// import { useRef } from 'react';
// import wave from "../../public/wave.png";
// import Link from "next/link";
// import line from "../../public/line.png";

// const Profile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [profileImage, setProfileImage] = useState(null);
//   const { address } = useAccount();
//   // Fetch profile data when component loads
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get(
//           `https://bb-backend-eight.vercel.app/api/user/userProfile/${address}`
//         );
//         setProfileData(response.data.user);
//         setProfileImage(response.data.user.profilePicture);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };

//     fetchProfileData();
//   }, [address]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(URL.createObjectURL(file));
//     }
//   };


//   const fileInputRef = useRef(null);

//   return (
//     <div className="min-h-screen bg-[#1A0334] text-white font-orbitron relative flex flex-col items-center">
//       <div className="absolute top-0 w-full h-[350px]">
//         {/* Background wave image */}
//         <Image src={wave} alt="Wave Background" layout="fill" objectFit="cover" />
//       </div>

//       <div className="relative z-10 mt-[300px] flex flex-col items-center p-6 space-y-10">
//         <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1DE9B6] to-[#7481DC]">
//           Profile
//         </h1>

//         <div className="w-full max-w-md bg-[#1A0334] rounded-lg shadow-lg p-6 border border-[#1DE9B6] relative space-y-6">
//           {/* Profile Image Upload */}
//           <div className="flex justify-center mb-6">
//             <label className="relative cursor-pointer">
//               <div
//                 onClick={() => fileInputRef.current.click()}
//                 className="w-32 h-32 bg-gray-600 rounded-full overflow-hidden border-4 border-[#1DE9B6] shadow-lg shadow-gray-700 flex items-center justify-center cursor-pointer"
//               >
//                 {profileData ? (
//                   <Image
//                     src={profileData}
//                     alt="Profile"
//                     layout="fill"
//                     objectFit="cover"
//                     className="rounded-full"
//                   />
//                 ) : (
//                   <span className="text-gray-400 font-semibold">Upload Image</span>
//                 )}
//               </div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 ref={fileInputRef}
//                 className="hidden"
//                 onChange={handleImageChange}
//               />
//             </label>
//           </div>

//           {/* Profile Details */}
//           {profileData ? (
//             <>
//               {["name", "walletAddress", "worldcoinID", "reputation"].map((field, index) => (
//                 <div key={index} className="relative p-3 border-2 rounded-full w-full border-[#1DE9B6] mb-4">
//                   <label className="absolute -top-3 left-4 bg-[#1A0334] px-2 text-[#1DE9B6] font-semibold">
//                     {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
//                   </label>
//                   <input
//                     type="text"
//                     value={profileData[field]}
//                     onChange={(e) => handleInputChange(field, e.target.value)}
//                     className="text-white font-orbitron bg-transparent w-full outline-none"
//                   />
//                 </div>
//               ))}
//               {/* Verification Status */}
//               <div className="relative p-3 border-2 rounded-full w-full border-[#1DE9B6] mb-4">
//                 <label className="absolute -top-3 left-4 bg-[#1A0334] px-2 text-[#1DE9B6] font-semibold">
//                   Verification Status
//                 </label>
//                 <p className="text-white">{profileData.isVerified ? "Verified ✅" : "Not Verified"}</p>
//               </div>
//               {/* Other Profile Information */}
//               <div className="relative p-3 border-2 rounded-full w-full border-[#1DE9B6] mb-4">
//                 <label className="absolute -top-3 left-4 bg-[#1A0334] px-2 text-[#1DE9B6] font-semibold">
//                   Completed Tasks
//                 </label>
//                 <p className="text-white">{profileData.completedTasks?.length || 0}</p>
//               </div>
//               <div className="relative p-3 border-2 rounded-full w-full border-[#1DE9B6] mb-4">
//                 <label className="absolute -top-3 left-4 bg-[#1A0334] px-2 text-[#1DE9B6] font-semibold">
//                   Created Tasks
//                 </label>
//                 <p className="text-white">{profileData.createdTasks?.length || 0}</p>
//               </div>
//               <div className="relative p-3 border-2 rounded-full w-full border-[#1DE9B6] mb-4">
//                 <label className="absolute -top-3 left-4 bg-[#1A0334] px-2 text-[#1DE9B6] font-semibold">
//                   Total Bounties Earned
//                 </label>
//                 <p className="text-white">{profileData.totalBountiesEarned || 0}</p>
//               </div>
//             </>
//           ) : (
//             <p>Loading profile data...</p>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex space-x-5 pt-3 justify-center">
//           <Link
//             href='/bounty-board'
//             className="border border-[#E500FF] text-white px-4 py-2 rounded-full"
//           >
//             Back
//           </Link>
//           <button
//             onClick={() => alert('Profile Updated')} // Replace with actual submit function
//             className="py-2 px-4 bg-gradient-to-r from-[#E500FF] to-[#EC407A] text-white rounded-full hover:opacity-90 transition"
//           >
//             Submit
//           </button>
//         </div>
//       </div>

//       {/* Footer Line and Footer */}
//       <div className="flex justify-center my-10">
//         <Image src={line} alt="line" width={150} />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Profile;

"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import { useAccount } from "wagmi";
import wave from "../../public/wave.png";
import line from "../../public/line.png";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import bgPattern from "../../public/bg-pattern.png";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const { address } = useAccount();
  const fileInputRef = useRef(null);

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

  const handleInputChange = (field, value) => {
    setProfileData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#1A0334] text-white font-orbitron relative flex flex-col items-center" 
    style={{
      backgroundImage: `url(${bgPattern.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>

      <ToastContainer />
      <div className="absolute inset-0 bg-[#1A0334] opacity-50 z-0"></div>

      <div className="absolute top-0 w-full h-[350px]">
        <Image src={wave} alt="Wave Background" layout="fill" objectFit="cover" />
      </div>

      <div className="relative z-10 mt-[300px] flex flex-col items-center p-6 space-y-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1DE9B6] to-[#7481DC]">
          Profile
        </h1>

        <div className="w-[600px] rounded-lg p-6 relative space-y-6">
          {/* Profile Image Upload */}
          <div className="flex justify-center mb-6">
            <label className="relative cursor-pointer">
              <div
                onClick={() => fileInputRef.current.click()}
                className="w-32 h-32 bg-gray-600 rounded-full overflow-hidden border-4 border-[#1DE9B6] shadow-lg shadow-gray-700 flex items-center justify-center cursor-pointer"
              >
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"  
                  />
                ) : (
                  <span className="text-gray-400 font-semibold" style={{ boxShadow: '10px 10px 0px rgba(217, 217, 217, 0.3)'}} >Upload Image</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Profile Details */}
          {profileData ? (
            <>
              {["name", "walletAddress", "worldcoinID", "reputation"].map((field, index) => (
                <div key={index} className="relative p-3 border-2 rounded-full w-full border-[#1DE9B6] mb-4">
                  <label className="absolute -top-3 left-4 bg-[#1A0334] px-2 text-[#1DE9B6] font-semibold">
                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    value={profileData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="text-white font-jost bg-transparent w-full outline-none"
                  />
                </div>
              ))}
              {/* Verification Status */}
              <div className="relative p-3 border-2 rounded-full w-full border-[#1DE9B6] mb-4">
                <label className="absolute -top-3 left-4 bg-[#1A0334] px-2 text-[#1DE9B6] font-semibold">
                  Verification Status
                </label>
                <p className="text-white font-jost">{profileData.isVerified ? "Verified ✅" : "Not Verified"}</p>
              </div>
              {/* Other Profile Information */}
              <div className="relative p-3 border-2 rounded-full w-full border-[#1DE9B6] mb-4">
                <label className="absolute -top-3 left-4 bg-[#1A0334] px-2 text-[#1DE9B6] font-semibold">
                  Completed Tasks
                </label>
                <p className="text-white font-jost">{profileData.completedTasks?.length || 0}</p>
              </div>
              <div className="relative p-3 border-2 rounded-full w-full border-[#1DE9B6] mb-4">
                <label className="absolute -top-3 left-4 bg-[#1A0334] px-2 text-[#1DE9B6] font-semibold">
                  Created Tasks
                </label>
                <p className="text-white font-jost">{profileData.createdTasks?.length || 0}</p>
              </div>
              <div className="relative p-3 border-2 rounded-full w-full border-[#1DE9B6] mb-4">
                <label className="absolute -top-3 left-4 bg-[#1A0334] px-2 text-[#1DE9B6] font-semibold">
                  Total Bounties Earned
                </label>
                <p className="text-white font-jost">{profileData.totalBountiesEarned || 0}</p>
              </div>
            </>
          ) : (
            <p>Loading profile data...</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-5 pt-3 justify-center">
          <Link
            href="/bounty-board"
            className="border border-[#E500FF] text-white px-4 py-2 rounded-full"
          >
            Back
          </Link>
          <button
            onClick={() => alert("Profile Updated")} // Replace with actual submit function
            className="py-2 px-4 bg-gradient-to-r from-[#E500FF] to-[#EC407A] text-white rounded-full hover:opacity-90 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
