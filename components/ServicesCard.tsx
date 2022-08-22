import React, { FC, ReactNode } from "react";

export interface ServicesCardProp {
  title: string;
  body: string;
  icon: ReactNode;
}

const ServicesCard: FC<ServicesCardProp> = ({ title, body, icon }) => {
  return (
    <div
      className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
      data-wow-duration="1s"
      data-wow-delay=".3s"
      style={{
        visibility: "visible",
        animationDuration: "1s",
        animationDelay: "0.3s",
        animationName: "fadeInUp",
      }}
    >
      <div className="py-8 px-12 mb-12 bg-gray-100 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
        <div className="inline-block text-gray-900 mb-4">{icon}</div>
        <h3 className="text-lg leading-normal mb-2 font-semibold text-black">
          {title}
        </h3>
        <p className="text-gray-500">{body}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
