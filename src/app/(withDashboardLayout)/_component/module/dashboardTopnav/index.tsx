"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  AlignJustify,
  Mail,
  Bell,
  Search,
  User,
  ShieldCheck,
} from "lucide-react";
import Lottie from "lottie-react";
import handWave from "@/assets/lottie/wavinghand.json";

import { useGetmeQuery } from "@/redux/api/userApi";
import DashboardSidebar from "../dashboardSidebar";

const DashboardTopnav = () => {
  const { data: user } = useGetmeQuery("");
  const userName = user?.data?.name || "User";

  return (
    <header className="h-16 w-full bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-200 hover:bg-slate-800"
              >
                <AlignJustify className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-slate-950 text-slate-200 p-0 border-slate-800"
            >
              <DashboardSidebar />
            </SheetContent>
          </Sheet>

          {/* Mobile logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">CeramicShield Pro</span>
          </Link>
        </div>

        {/* Welcome message - desktop only */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-lg font-medium text-slate-100">
                Welcome, {userName}
              </p>
              <p className="text-sm text-slate-400">
                Here&lsquo;s what&apos;s happening with your store today
              </p>
            </div>
            <div className="w-8 h-8">
              <Lottie animationData={handWave} loop={true} />
            </div>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full w-10 h-10"
          >
            <Search className="h-5 w-5" />
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full w-10 h-10"
            >
              <Mail className="h-5 w-5" />
            </Button>
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              6
            </span>
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full w-10 h-10"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full w-10 h-10"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopnav;
