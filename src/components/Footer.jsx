import React from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div>
      <div className="flex mx-[50px] justify-between items-center">
        <div className="flex flex-col space-y-4 ">
          <button className="px-3 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition">
            Contact Us
          </button>
          <p className="text-xl font-extrabold">BountyBridge</p>
        </div>
        <div className="w-[500px]">
          <div className="flex mb-2 space-x-5">
            <FaGithub className="w-[50px] h-[50px]" />
            <FaSquareXTwitter className="w-[50px] h-[50px]" />
          </div>
          <p>
            Join our Discord channel or follow us on Twitter to keep up to date
            with our latest work and announcements.
          </p>
        </div>
      </div>
      <div className="mt-10 text-center font-jost">
        <p className="text-white">© 2024 All rights reserved | BountyBridge</p>
      </div>
    </div>
  );
}

export default Footer;
