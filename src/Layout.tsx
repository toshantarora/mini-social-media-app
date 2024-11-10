import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const Layout = () => {
  return (
    <div>
      <div className="hidden sm:block">
        <Navbar />
      </div>
      <div className="h-full bg-lightGray">
        <div className="sm:py-12">
          <main className="min-h-screen">
            <div className="mx-auto max-w-7xl pb-[20px] ">
              <Outlet />
              
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
