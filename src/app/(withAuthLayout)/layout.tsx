import Container from "@/components/shared/Container";
import Link from "next/link";
import React from "react";

export default function WithAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Premium background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Ceramic-inspired gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-950 to-gray-900/80" />
        {/* Subtle protective coating-inspired particles */}
        <div className="absolute w-full h-full bg-blue-600/5 rounded-full blur-3xl top-1/4 -left-1/4" />
        <div className="absolute w-full h-full bg-indigo-500/5 rounded-full blur-3xl bottom-1/4 -right-1/4" />
        <div className="absolute w-full h-full bg-cyan-400/5 rounded-full blur-3xl top-3/4 left-1/2" />
      </div>
      {/* Main content container */}
      <Container className="relative z-10">
        <div className="min-h-screen flex items-center justify-center p-4">
          {/* Auth card with glass-morphism effect */}
          <div className="w-full max-w-3xl  backdrop-blur-sm bg-gray-900/50 border border-blue-900/50 rounded-xl shadow-2xl overflow-hidden">
            {/* CeramicShield branding header */}
            <div className="bg-gradient-to-r from-gray-900 via-blue-900/30 to-gray-900 p-6 text-center border-b border-blue-900/30">
              <Link href="/">
                <h1 className="text-2xl font-bold text-blue-400">
                  CeramicShield Pro
                </h1>
                <p className="text-sm text-blue-200/60 mt-1">
                  Premium Vehicle Protection
                </p>
              </Link>
            </div>
            {/* Auth content */}
            <div className="md:p-8 p-4">{children}</div>
          </div>
        </div>
      </Container>
    </div>
  );
}
