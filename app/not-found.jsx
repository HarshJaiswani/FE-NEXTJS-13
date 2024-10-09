import React from "react";
// Next Components
import Link from "next/link";
// Icons
import { BiError } from "react-icons/bi";
import { HiOutlineHome } from "react-icons/hi";

const Error404 = () => {
  return (
    <div className="w-full h-screen">
      <div className="backdrop-blur-sm w-full h-full flex items-center justify-center flex-col">
        <BiError className="text-[10rem] text-red-500" />
        <div className="text-3xl sm:text-4xl my-8 text-gray-500">
          Page Not Found!
        </div>
        <Link href="/">
          <button className="px-6 py-2 font-semibold text-green-400 flex items-center justify-center rounded-full bg-white shadow border my-4">
            <HiOutlineHome className="text-lg mr-2" /> Return Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
