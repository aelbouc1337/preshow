import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="relative z-10 bg-opacity-70 bg-bg w-full lg:px-[15%] px-6 py-4 flex justify-between">
      <img
        onClick={() => navigate("/")}
        src="/preshow-logo.png"
        width={200}
        alt="Logo"
        className="cursor-pointer"
      />
      <ul className="hidden text-lg lg:flex gap-6 items-center text-white">
        <li>Movies</li>
        <li>TV Shows</li>
        <li>
          <CiSearch size={30} />
        </li>
        <li className="w-12 h-12 border-4 border-slate-400 flex items-center justify-center rounded-full">
          <FaUser />
        </li>
      </ul>
      <CiMenuFries className="text-white lg:hidden cursor-pointer" size={30} />
    </nav>
  );
};

export default Navbar;
