import Image from "next/image";
import React from "react";

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
    <div className="bg-black border-2 border-gray-800 rounded-lg p-5 max-w-sm mx-auto">
      <div className="relative w-full h-48 mb-5">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="text-gray-400 mt-2">{description}</p>
      <p className="text-white mt-4">Bounty: {bountyCount}</p>
      <p className="text-white">Deadline: {deadline}</p>
      <button
        className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:opacity-90 transition"
        onClick={onClaim}
      >
        Claim
      </button>
    </div>
  );
};

export default Card;
