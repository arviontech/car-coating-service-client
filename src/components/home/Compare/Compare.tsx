"use client";
import React, { useState, useRef, useEffect } from "react";
import before from "@/assets/choose/coat2.jpg";
import after from "@/assets/choose/coat.jpg"; // Renamed for clarity
import Container from "@/components/shared/Container";

const Compare = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = () => {
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newPosition =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, newPosition)));
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (containerRef.current && e.touches[0]) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newPosition =
        ((e.touches[0].clientX - containerRect.left) / containerRect.width) *
        100;
      setSliderPosition(Math.max(0, Math.min(100, newPosition)));
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchEnd = () => {
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="bg-[#1a1b1f] py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full items-center  text-white ">
          {/* Left section (service description) - unchanged */}
          <div className="w-full  col-span-3">
            <div className="text-red-500 font-bold mb-2">DRY CLEANING</div>
            <h1 className="text-4xl md:text-4xl font-bold mb-6">
              Dry cleaning any dirt inside the car and trunk
            </h1>
            <button className="bg-red-600 text-white rounded-full py-3 px-6 flex items-center justify-center w-48 hover:bg-red-700 transition-colors">
              Read More
              <svg
                className="ml-2 w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="mt-6 flex space-x-4">
              <button className="bg-gray-800 rounded-full p-4 hover:bg-gray-700">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M15 19l-7-7 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="bg-gray-800 rounded-full p-4 hover:bg-gray-700">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Center section (before/after slider) - fixed version */}
          <div className="w-full   col-span-5 relative">
            <div
              ref={containerRef}
              className=" w-[600px] h-[500px] overflow-hidden rounded-lg"
            >
              {/* BEFORE label */}
              <div className="absolute -top-10 left-4 text-6xl md:text-5xl font-bold text-gray-300 opacity-30 z-10">
                BEFORE
              </div>

              {/* AFTER label */}
              <div className="absolute -bottom-10 right-4  text-5xl md:text-5xl font-bold text-gray-100 opacity-30 z-10">
                AFTER
              </div>

              {/* Before image (full width) */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${before.src})`,
                  backgroundPosition: "center",
                  borderRadius: "10px 10px 10px 10px",
                }}
              ></div>

              {/* After image (partial width based on slider) */}
              <div
                className="absolute inset-0 h-full bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `url(${after.src})`,
                  backgroundPosition: "center",
                  width: `${sliderPosition}%`,
                  borderRadius: "10px 10px 0 10px",
                }}
              ></div>

              {/* Slider handle */}
              <div
                ref={sliderRef}
                className="absolute top-0 bottom-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-move z-20"
                style={{
                  left: `calc(${sliderPosition}% - 16px)`,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                <svg
                  className="w-4 h-4 text-gray-800"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M8 7l4-4 4 4M8 17l4 4 4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Vertical divider line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
                style={{ left: `${sliderPosition}%` }}
              ></div>
            </div>
          </div>

          {/* Right section (features) - unchanged */}
          <div className="w-full  col-span-4 space-y-8">
            <div className="flex items-start space-x-4">
              <div className="text-red-500 flex-shrink-0">
                <svg
                  className="w-12 h-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Natural Cleaners</h3>
                <p className="text-gray-400">
                  Natural cleaners ensure your car is cleaned with eco-friendly,
                  biodegradable products safe.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-red-500 flex-shrink-0">
                <svg
                  className="w-12 h-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Heightened care</h3>
                <p className="text-gray-400">
                  Heightened care services focus on every detail, ensuring your
                  car gets a spotless and thorough wash.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-red-500 flex-shrink-0">
                <svg
                  className="w-12 h-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Aromatization</h3>
                <p className="text-gray-400">
                  Aromatization adds a pleasant, lasting fragrance to your car
                  interior.
                </p>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 bg-red-600 rounded-full p-2 text-white text-xs">
              GO TOP
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Compare;
