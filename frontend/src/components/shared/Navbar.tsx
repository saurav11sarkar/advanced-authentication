"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useUser } from "@/context/AppContext";
import { logout } from "@/services/auth";
import { toast } from "sonner";

interface NavbarProps {
  name: string;
  path: string;
}

const navbar: NavbarProps[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Profile", path: "/profile" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser, setLoading } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setLoading(true);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image
              src={logo}
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            {navbar.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`transition-colors duration-200 hover:text-violet-600 font-semibold ${
                    pathname === item.path ? "text-violet-600" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Button */}
          {user ? (
            <Button
              className="rounded-full px-5 py-2 text-sm font-medium"
              onClick={handleLogout}
            >
              <span>Logout</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Link href="/login">
              <Button className="rounded-full px-5 py-2 text-sm font-medium">
                <span>Login</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
