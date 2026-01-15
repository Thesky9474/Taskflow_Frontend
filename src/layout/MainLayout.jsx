import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto lg:ml-0 ml-0">
        <div className="max-w-7xl mx-auto pt-12 lg:pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
