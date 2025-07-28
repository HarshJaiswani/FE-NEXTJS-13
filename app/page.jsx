"use client";

import React from "react";
// helper
import { ShowToast } from "@/helper/ShowToast";

const Home = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <button
        onClick={() => ShowToast(true, "This is a random toast")}
        className="rounded-lg border bg-gray-50 px-8 py-3 text-xl"
      >
        Home
      </button>
    </div>
  );
};

export default Home;
