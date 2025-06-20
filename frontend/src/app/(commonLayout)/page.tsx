"use client";
import Image from "next/image";
import React from "react";
import { assets } from "../../assets/assets";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/AppContext";

const HomePage = () => {
  const {user} = useUser();
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 py-10 gap-6 text-center bg-white ">
      {/* Header Image */}
      <div className="max-w-sm w-full">
        <Image
          src={assets.header_img}
          alt="Header"
          width={400}
          height={400}
          className="w-full h-auto object-contain rounded-full"
        />
      </div>

      {/* Greeting Text + Emoji */}
      <div className="flex items-center justify-center gap-3">
        <h1 className="text-3xl md:text-4xl font-bold text-violet-700">
          Hey Developer!
        </h1>
        <Image
          src={assets.hand_wave}
          alt="Waving Hand"
          width={40}
          height={40}
          className="w-8 h-8 object-contain"
        />
      </div>

      {/* Subtitle */}
      <h2 className="text-xl font-semibold text-gray-700">
        Welcome to our app!
      </h2>

      {/* Description */}
      <p className="max-w-xl text-gray-600 text-base leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi ex
        repellat unde voluptas. In earum modi provident eaque ut.
      </p>

      {/* CTA Button */}
      <Button className="mt-2 px-6 py-2 rounded-full text-base">
        Get Started
      </Button>
      <p>{user?.name|| "hi"}</p>
    </section>
  );
};

export default HomePage;
