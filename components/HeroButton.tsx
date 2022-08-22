import React, { FC } from "react";
import Link from "next/link";

interface HeroButtonProps {
  url: string;
  text: string;
}

const HeroButton: FC<HeroButtonProps> = ({ url, text }) => {
  return (
    <Link href={url}>
      <div className="flex justify-center">
        <div className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900 cursor-pointer">
          <span className="justify-center">{text}</span>
        </div>
      </div>
    </Link>
  );
};

export default HeroButton;
