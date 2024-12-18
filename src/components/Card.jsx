import Image from "next/image";
import React from "react";
import imageSample from "../public/assets/cycle.png"

const Card = ({
  title,
  description,
  bountyCount,
  deadline,
  image,
  address,
  contact,
  onClaim,
}) => {
  return (
<div
      className="bg-[#F0F0F0] rounded-lg shadow-lg mx-auto p-6 relative overflow-hidden p-[80px] h-full pt-[90px] font-jost"
      style={{ boxShadow: '12px 12px 0px rgba(217, 217, 217, 0.3)'
      }} 
    >
      {/* Gradient Circle Decorations */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full"></div>
      <div className="absolute top-[220px] right-10 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full"></div>

      {/* Image */}
      <div className="relative w-[280px] h-[190px] mx-auto mb-4 flex justify-center items-center">
        <Image
          src={imageSample}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Title */}
      <h2 className="text-[30px] font-bold font-orbitron text-center mt-6 bg-clip-text text-transparent bg-gradient-to-r from-[#EC407A] to-[#6A1B9A]">
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-700 text-left my-4">
        {description}
      </p>

      {/* Bounty and Deadline */}
      <p className="text-[#6A1B9A] text-left mb-1">
        Bounty: ${bountyCount}
      </p>
      <p className="text-[#6A1B9A] text-left mb-4">
        Deadline: {deadline}
      </p>

      {/* Claim Button */}
      <div className="flex justify-center font-orbitron">
        <button
          onClick={onClaim}
          className="  inline-flex py-2 px-4 bg-gradient-to-r from-[#E500FF] to-[#EC407A] text-white font-semibold rounded-full hover:opacity-90 transition"
        >
          Claim
        </button>
      </div>
    </div>
  );
};

export default Card;
