import React, { useState } from "react";
import Image from "next/image";
import VerificationPopup from "../components/VerificationPopup"; // Assuming you already have this component

const PostCard = ({
  title,
  description,
  bountyCount,
  deadline,
  image,
  walletAddress,
  proofDescription,
  taskID,
  proofFile,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVerifyClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleMarkAsVerified = () => {
    console.log("Marked as verified");
    setIsModalOpen(false);
  };

  return (
    <div className="bg-black border border-2 border-gray-800 rounded-lg p-5 max-w-sm mx-auto">
      {image && (
        <Image
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4"
          width={400}
          height={200}
        />
      )}
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <p className="text-lg">
        <strong>Bounty:</strong> {bountyCount}
      </p>
      <p className="text-lg mb-4">
        <strong>Deadline:</strong> {deadline}
      </p>
      <div className="flex justify-between">
        <button
          onClick={handleVerifyClick}
          className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:opacity-90 transition"
        >
          Verify Proof
        </button>
        <div className="mt-2">
          <span className="px-3 py-1 bg-gray-700 text-white rounded-full">
            Pending
          </span>
        </div>
      </div>

      {/* Popup Component */}
      <VerificationPopup
        isOpen={isModalOpen}
        onClose={handleModalClose}
        bounty={{
          title,
          description,
          walletAddress,
          proofDescription,
          proofFile,
          taskID,
          image,
        }}
      />
    </div>
  );
};

export default PostCard;
