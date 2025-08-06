"use client";

import React from "react";
// Next Components
import Link from "next/link";
// Icons
import { BiError } from "react-icons/bi";
import { HiOutlineHome } from "react-icons/hi";

const Error = () => {
  return (
    <div className="h-screen w-full">
      <div className="flex h-full w-full flex-col items-center justify-center backdrop-blur-sm">
        <BiError className="text-[10rem] text-red-500" />
        <div className="my-8 text-3xl text-gray-500 sm:text-4xl">
          Some Error Occurred!
        </div>
        <Link href="/">
          <button className="my-4 flex items-center justify-center rounded-full border bg-white px-6 py-2 font-semibold text-green-400 shadow">
            <HiOutlineHome className="mr-2 text-lg" /> Return Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
