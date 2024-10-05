import React, { useState } from "react";
import CompletionPopup from "@/components/CompletionPopup";
import Image from "next/image";

const TaskCard = ({ title, description, bounty, deadline, image, taskID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCompleteClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmitProof = () => {
    console.log("Proof of completion submitted");
    setIsModalOpen(false);
  };

  return (
    <div className="bg-black border-2 border-gray-800 rounded-lg p-5 max-w-sm mx-auto">
      {image && (
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="relative w-full h-48 mb-5 rounded-lg"
        />
      )}
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <p className="text-lg">
        <strong>Bounty:</strong> {bounty}
      </p>
      <p className="text-lg mb-4">
        <strong>Deadline:</strong> {deadline}
      </p>
      <button
        onClick={handleCompleteClick}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:opacity-90 transition"
      >
        Complete
      </button>

      <CompletionPopup
        bounty={{ title, description, bounty, deadline, image, taskID }}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmitProof}
      />
    </div>
  );
};

export default TaskCard;
