import React, { FC, MouseEventHandler } from "react";

interface SidebarButtonProps {
  onClick: MouseEventHandler;
  icon: JSX.Element;
  text: string;
}

const SidebarButton: FC<SidebarButtonProps> = ({ onClick, icon, text }) => {
  return (
    <div
      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-default"
      onClick={onClick}
    >
      {icon}
      <span className="flex-1 ml-3 whitespace-nowrap">{text}</span>
    </div>
  );
};

export default SidebarButton;
