import { ReactNode } from "react";
import DashboardSidebar from "./_component/module/dashboardSidebar";
import DashboardTopnav from "./_component/module/dashboardTopnav";

type TProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: TProps) => {
  return (
    <div className="grid grid-cols-12 bg-slate-900 min-h-screen">
      {/* Sidebar - hidden on mobile, visible on lg screens */}
      <div className="bg-slate-950 xl:col-span-2 lg:col-span-3 h-screen sticky top-0 left-0 overflow-auto shadow-xl lg:block hidden border-r border-slate-800">
        <DashboardSidebar />
      </div>

      {/* Main content area */}
      <div className="xl:col-span-10 lg:col-span-9 col-span-full min-h-screen">
        <DashboardTopnav />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
