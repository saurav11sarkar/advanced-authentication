import Navbar from "@/components/shared/Navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main className="min-h-screen pt-20 container mx-auto px-4">
        {children}
      </main>
      <footer></footer>
    </div>
  );
};

export default CommonLayout;
