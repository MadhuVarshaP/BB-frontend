 "use client";
 import React from "react";
 import Navbar from "../components/Navbar";
 import Image from "next/image";
 import img from "../public/img1.png";
 import line from "../public/line.png";
 import step1 from "../public/step1.png";
 import step2 from "../public/step2.png";
 import step3 from "../public/step3.png";
 import globe from "../public/globe.png";
 import reward from "../public/reward.png";
 import verify from "../public/verify.png";
 import transparent from "../public/transparent.png";
import cube from "../public/cube.png"; 
 import Link from "next/link";
 import Footer from "../components/Footer";
 import { Jost } from '@next/font/google';
 import { Orbitron } from '@next/font/google';

 const orbitron = Orbitron({
  subsets: ['latin'],   // Use 'latin' or other subsets you need
  weight: ['400', '700'], // Include the font weights you need
  variable: '--font-orbitron', // Define a CSS variable for the font
});
const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Adjust weights as needed
  variable: '--font-jost', // Optional: adds CSS variable for the font
});

 const Home = () => {
   return (
     <div className="font-orbitron bg-[#1A0334]">
       <div className="min-h-screen bg-[#1A0334] text-white">
         <Navbar />
        {/* Decorative Cubes */}
         <Image src={cube} alt="decorative cube" width={160} height={160} 
            className="absolute top-[450px] left-1/2 rotate-20 opacity-90" />
    
     <Image src={cube} alt="decorative cube" width={160} height={160} 
            className="absolute top-[640px] right-[200px] rotate-20 opacity-90" />

     <Image src={cube} alt="decorative cube" width={160} height={160} 
            className="absolute top-[700px] left-1/4 rotate-20 opacity-90" />

     <Image src={cube} alt="decorative cube" width={160} height={160} 
            className="absolute top-[1250px] right-[500px] rotate-20 opacity-90" />

 <Image src={cube} alt="decorative cube" width={160} height={160} 
            className="absolute top-[1350px] left-[400px] rotate-20 opacity-90" />

     <Image src={cube} alt="decorative cube" width={160} height={160} 
            className="absolute top-[2250px] right-1/3 rotate-20 opacity-90" />

     <Image src={cube} alt="decorative cube" width={160} height={160} 
            className="absolute top-[2700px] left-[300px] rotate-20 opacity-90" />



         <div className="flex mx-[50px] justify-around">
           <div className="flex flex-col items-start text-left p-10 w-[1100px] mx-2">
             <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
               Task & Earn:{" "}
               <span className="text-white">
                 Transforming Local Aid with Decentralization
               </span>
             </h1>

             <p className="text-xl mt-6 max-w-3xl">
               Complete community tasks, build your reputation, and earn bounties
               while contributing to a transparent and fair system.
             </p>
             <div className="mt-8 flex space-x-4">
               <Link
                 href="/onboard"
                 className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition"
               >
                 Onboard
               </Link>
               <Link
                 href="/bounty-board"
                 className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition"
               >
                 Browse Tasks
               </Link>
             </div>
           </div>

           <div className="flex justify-end mr-[30px]">
             <Image src={img} alt="img1" width={550} height={500} />
           </div>
         </div>

         <div className="flex justify-center my-[100px]">
           <Image src={line} alt="line" width={150} />
         </div>

         <div className="text-center mt-20">
           <h2 className="text-4xl font-bold">
             Why{" "}
             <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1DE9B6] to-[#EC407A]">
               Choose Us?
             </span>
           </h2>
           <div className="flex justify-center space-x-10 mt-12">
             <div className="relative p-[2px] rounded-lg w-64 bg-gradient-to-r from-[#1DE9B6] to-[#FFA726]">
               <div className="bg-black p-6 rounded-lg w-full h-full">
                 <div className="flex justify-center mb-2">
                   <Image src={globe} alt="globe" width={40} height={50} />
                 </div>
                 <div className="bg-transparent">
                   <h3 className="text-xl font-bold text-white">
                     Empower Your Community
                   </h3>
                   <p className="text-[#B7B4BB] my-2">Community Support</p>
                 </div>
               </div>
             </div>

             <div className="relative p-[2px] rounded-lg w-64 bg-gradient-to-r from-[#1DE9B6] to-[#FFA726]">
               <div className="bg-black p-6 rounded-lg w-full h-full">
                 <div className="flex justify-center mb-2">
                   <Image src={verify} alt="verify" width={50} height={50} />
                 </div>
                 <div className="bg-transparent">
                   <h3 className="text-xl font-bold text-white">Verified</h3>
                   <p className="text-[#B7B4BB] my-2">
                     Protect your data and identity
                   </p>
                 </div>
               </div>
             </div>

             <div className="relative p-[2px] rounded-lg w-64 bg-gradient-to-r from-[#1DE9B6] to-[#FFA726]">
               <div className="bg-black p-6 rounded-lg w-full h-full">
                 <div className="flex justify-center mb-2">
                   <Image src={reward} alt="rewards" width={50} height={50} />
                 </div>
                 <div className="bg-transparent">
                   <h3 className="text-xl font-bold text-white">Earn Rewards</h3>
                   <p className="text-[#B7B4BB] my-2">
                     Help others, earn community rewards
                   </p>
                 </div>
               </div>
             </div>

             <div className="relative p-[2px] rounded-lg w-64 bg-gradient-to-r from-[#1DE9B6] to-[#FFA726]">
               <div className="bg-black p-6 rounded-lg w-full h-full">
                 <div className="flex justify-center mb-2">
                   <Image
                     src={transparent}
                     alt="transparent"
                     width={50}
                     height={50}
                   />
                 </div>
                 <div className="bg-transparent">
                   <h3 className="text-xl font-bold text-white">
                     Transparent & Fair
                   </h3>
                   <p className="text-[#B7B4BB] my-2">
                     Open, trustworthy task tracking system
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </div>

         <div className="flex justify-center my-[100px]">
           <Image src={line} alt="line" width={150} />
         </div>

         <div className="text-center mt-20">
           <h2 className="text-4xl font-bold">
             How{" "}
             <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1DE9B6] to-[#EC407A]">
               It Works?
             </span>
           </h2>
           <div className="flex flex-col items-center space-y-10 mt-12">
             <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
               <div>
                 <Image src={step1} alt="Step 1" width={400} height={400} />
               </div>
               <div className="max-w-lg text-left space-y-5">
                 <h3 className="text-2xl font-bold">
                   <span className="text-[#EC407A] text-3xl">01. </span>Setup and
                   Connect your Wallet
                 </h3>
                 <p className="text-gray-300">
                   Create an account and get verified through Worldcoin.
                 </p>
               </div>
             </div>

             <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
               <div className="max-w-lg text-left space-y-5">
                 <h3 className="text-2xl font-bold">
                   <span className="text-[#EC407A] text-3xl">02. </span>Post or
                   Claim a Task
                 </h3>
                 <p className="text-gray-300">
                   Need help? Post a bounty. Want to help? Claim a task and
                   complete it for a reward.
                 </p>
               </div>
               <div>
                 <Image src={step2} alt="Step 2" width={400} height={400} />
               </div>
             </div>

             <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
               <div>
                 <Image src={step3} alt="Step 3" width={400} height={400} />
               </div>
               <div className="max-w-lg text-left space-y-5">
                 <h3 className="text-2xl font-bold">
                   <span className="text-[#EC407A] text-3xl">03. </span>Complete
                   the Task and Earn Rewards
                 </h3>
                 <p className="text-gray-300">
                   Once the task is completed and verified, rewards are
                   distributed securely and efficiently through a scalable
                   transaction system.
                 </p>
               </div>
             </div>
           </div>
           <div className="flex justify-center my-[100px]">
             <Image src={line} alt="line" width={150} />
           </div>
         </div>

         <Footer />
       </div>
     </div>
   );
 };

 export default Home;

