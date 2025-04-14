"use client";

import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-screen bg-gray-900 relative inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      {/* Blurred Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-[200px] md:w-[300px] h-[300px] bg-blue-500/20 blur-[100px] absolute top-28 left-20" />
        <div className="w-[200px] md:w-[300px] h-[300px] bg-amber-400/20 blur-[100px] absolute bottom-10 right-20" />
      </div>

      <div className="z-50 relative flex flex-col items-center gap-6">
        {/* Spinner with ceramic coating-inspired colors */}
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white border-opacity-70"></div>

        {/* Text that matches your service branding */}
        <div className="text-center">
          <h2 className="text-xl font-medium text-white mb-2">
            CeramicShield Pro
          </h2>
          <p className="text-gray-300 text-sm">
            Preparing your premium experience...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
