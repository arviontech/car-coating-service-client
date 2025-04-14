import React from "react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left column - Visual */}
          <div className="relative overflow-hidden bg-indigo-900 text-white p-8 flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
              {/* Abstract pattern */}
              <svg
                viewBox="0 0 400 400"
                className="absolute top-0 left-0 h-full w-full"
              >
                <defs>
                  <pattern
                    id="pattern"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M0 20 L40 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M20 0 L20 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </pattern>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#pattern)"
                />
              </svg>
            </div>

            <div className="relative z-10">
              <h1 className="text-7xl md:text-9xl font-bold">404</h1>
              <div className="h-1 w-24 bg-indigo-400 my-6"></div>
              <h2 className="text-2xl md:text-3xl font-medium mb-2">
                Page not found
              </h2>
              <p className="text-indigo-200 mb-8">
                Sorry, we couldn&apos;t find the page you&apos;re looking for.
              </p>
            </div>

            <div className="relative z-10">
              <p className="text-sm text-indigo-200">
                &quot;The only true wisdom is in knowing you know nothing.&quot;{" "}
                <br />
                <span className="italic">— Socrates</span>
              </p>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-25"></div>
              <div className="relative z-10 flex items-center justify-center h-full w-full bg-indigo-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 text-center mb-4">
              Lost in digital space?
            </h3>

            <p className="text-gray-600 text-center mb-8">
              Don&apos;t worry, it happens to the best of us. The page
              you&apos;re looking for might have been moved, deleted, or maybe
              it never existed in the first place.
            </p>

            <div className="flex flex-col gap-5">
              <Link href="/">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Back to Homepage</span>
                </button>
              </Link>

              <Link href="/contact">
                <button className="w-full bg-white border border-gray-300 hover:border-indigo-500 text-gray-700 hover:text-indigo-600 font-medium px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Contact Support</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
