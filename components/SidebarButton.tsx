import React, { FC, MouseEventHandler } from "react";

interface SidebarButtonProps {
  onClick?: MouseEventHandler;
  icon: JSX.Element;
  text: string;
}

const SidebarButton: FC<SidebarButtonProps> = ({ onClick, icon, text }) => {
  return (
    <div
      className="inline-flex items-center px-4 py-2 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent rounded-lg text-md md:mt-0 md:ml-4 bg-gray-900 cursor-pointer"
      onClick={onClick}
    >
      <span className="justify-center">{text}</span>
      {icon}
    </div>
  );
};

export default SidebarButton;
