import React, { FC } from "react";
import Link from "next/link";

interface HeroProps {
  heading: string;
  message: string;
}

const Hero: FC<HeroProps> = ({ heading, message }: HeroProps) => {
  return (
    <>
      <div className="flex items-center justify-center mb-12 bg-fixed bg-center bg-cover custom-img h-75">
        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-[2] h-75" />
        <div className="p-5 text-white z-[2] mt-[-10rem]">
          <h2 className="text-5xl font-bold">{heading}</h2>
          <p className="py-5 text-xl">{message}</p>
          <Link href="/contact">
            <div className="flex w-fit px-8 py-2 border hover:bg-gray-100/20 cursor-default">
              Contact Us
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
