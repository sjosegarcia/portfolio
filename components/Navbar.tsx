import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("transparent");
  const [textColor, setTextColor] = useState<string>("white");

  const changeIsOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#ffffff");
        setTextColor("#000000");
        return;
      }
      setColor("transparent");
      setTextColor("#ffffff");
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 z-10 w-full ease-in-out duration-300 bg-${
        color === "transparent" ? "transparent" : `[${color}]`
      }`}
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-white">
        <Link href="/">
          <h1 className={`font-bold text-4xl text-[${textColor}]`}>GODZ</h1>
        </Link>
        <ul className={`hidden sm:flex text-[${textColor}]`}>
          <li className="p-4">
            <Link href="/">Home</Link>
          </li>
          <li className="p-4">
            <Link href="/#gallery">Gallery</Link>
          </li>
          <li className="p-4">
            <Link href="/work">Work</Link>
          </li>
          <li className="p-4">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        {/** Mobile Button */}
        <div onClick={changeIsOpen} className="block sm:hidden z-10">
          {isOpen ? (
            <AiOutlineClose size={20} className={`text-[${textColor}]`} />
          ) : (
            <AiOutlineMenu size={20} className={`text-[${textColor}]`} />
          )}
        </div>
        {/** Mobile Menu */}
        <div
          className={`sm:hidden absolute top-0 ${
            isOpen ? "left-0" : "left-[-100%]"
          } right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300`}
        >
          <ul>
            <li
              onClick={changeIsOpen}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={changeIsOpen}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/#gallery">Gallery</Link>
            </li>
            <li
              onClick={changeIsOpen}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/work">Work</Link>
            </li>
            <li
              onClick={changeIsOpen}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
