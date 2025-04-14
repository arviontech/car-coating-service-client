"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useGetmeQuery } from "@/redux/api/userApi";
import {
  LayoutDashboard,
  Calendar,
  Settings,
  Package,
  Users,
  FileText,
  DollarSign,
  ChevronDown,
  ChevronRight,
  LineChart,
  Heart,
  MessageSquare,
  LogOut,
  CreditCard,
  ShoppingBag,
  User,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hook";

// Define proper TypeScript interfaces for the sidebar items
interface SubMenuItem {
  title: string;
  href: string;
}

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  submenu?: SubMenuItem[];
}

const DashboardSidebar = () => {
  const { data: userData } = useGetmeQuery("");
  const { user } = useAppSelector((state: any) => state.auth);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();

  // Admin sidebar items
  const adminSidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Services",
      href: "/dashboard/admin/services",
      icon: Package,
    },
    {
      title: "Appointments",
      href: "/dashboard/admin/appointments",
      icon: Calendar,
    },
    {
      title: "Customers",
      href: "/dashboard/admin/customers",
      icon: Users,
    },
    {
      title: "Reports",
      href: "/dashboard/admin/reports",
      icon: FileText,
      submenu: [
        { title: "Sales", href: "/dashboard/admin/reports/sales" },
        { title: "Revenue", href: "/dashboard/admin/reports/revenue" },
        { title: "Performance", href: "/dashboard/admin/reports/performance" },
      ],
    },
    {
      title: "Finances",
      href: "/dashboard/admin/finances",
      icon: DollarSign,
    },
    {
      title: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ];

  // Customer sidebar items
  const customerSidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard/customer",
      icon: LineChart,
    },
    {
      title: "My Bookings",
      href: "/dashboard/customer/bookings",
      icon: Calendar,
    },
    {
      title: "Favorites",
      href: "/dashboard/customer/favorites",
      icon: Heart,
    },
    {
      title: "Orders",
      href: "/dashboard/customer/orders",
      icon: ShoppingBag,
    },
    {
      title: "Messages",
      href: "/dashboard/customer/messages",
      icon: MessageSquare,
    },
    {
      title: "Payment Methods",
      href: "/dashboard/customer/payment",
      icon: CreditCard,
    },
    {
      title: "Profile",
      href: "/dashboard/customer/profile",
      icon: User,
    },
  ];

  // Determine which links to show based on user role
  const sidebarItems: SidebarItem[] =
    user?.role === "SUPER_ADMIN" || user?.role === "ADMIN"
      ? adminSidebarItems
      : customerSidebarItems;

  return (
    <aside className="flex flex-col h-full bg-slate-950 text-slate-200">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/" className="flex items-center space-x-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">CeramicShield Pro</span>
        </Link>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
            {userData?.data?.name ? (
              <span className="text-lg font-medium text-white">
                {userData.data.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <Users className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="font-medium">
              {userData?.data?.name || "Super Admin"}
            </p>
            <p className="text-xs text-slate-400">
              UserId: {userData?.data?.userName || "SA001"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {sidebarItems.map((item) => (
            <li key={item.title}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() =>
                      setExpandedItem(
                        expandedItem === item.title ? null : item.title
                      )
                    }
                    className={cn(
                      "flex items-center w-full px-3 py-2 rounded-lg transition-colors",
                      pathname.startsWith(item.href)
                        ? "bg-indigo-600/20 text-indigo-400"
                        : "hover:bg-slate-800/60"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3 text-slate-400" />
                    <span>{item.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 ml-auto transition-transform",
                        expandedItem === item.title && "transform rotate-180"
                      )}
                    />
                  </button>
                  {expandedItem === item.title && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-9 mt-1 space-y-1 border-l border-slate-800 pl-3"
                    >
                      {item.submenu.map((subItem: SubMenuItem) => (
                        <li key={subItem.title}>
                          <Link
                            href={subItem.href}
                            className={cn(
                              "flex items-center py-2 text-sm transition-colors",
                              pathname === subItem.href
                                ? "text-indigo-400"
                                : "text-slate-400 hover:text-slate-200"
                            )}
                          >
                            <ChevronRight className="h-3 w-3 mr-2" />
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg transition-colors",
                    pathname === item.href
                      ? "bg-indigo-600/20 text-indigo-400"
                      : "hover:bg-slate-800/60"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3 text-slate-400" />
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-slate-800/60 text-slate-400 transition-colors">
          <LogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
