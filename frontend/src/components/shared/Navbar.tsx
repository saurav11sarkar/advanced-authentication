"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  name: string;
  path: string;
}

const navbar: NavbarProps[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Profile", path: "/profile" },
  { name: "Login", path: "/login" },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"}>
          <div className="text-2xl font-bold text-violet-500">MyApp</div>
        </Link>

        {/* Nav Links */}
        <ul className="flex space-x-6 text-base font-medium text-gray-700">
          {navbar.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`hover:text-violet-600 transition-colors duration-200 font-semibold ${
                  pathname === item.path ? "text-violet-600" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
