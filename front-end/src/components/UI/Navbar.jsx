import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  return (
    <nav className="relative z-20 bg-opacity-70 bg-bg w-full">
      <ul
        className={`lg:hidden absolute flex flex-col top-16 w-full bg-bg transition-all duration-300 ease-in-out ${
          menu ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"
        }`}
      >
        <li className="w-full h-full flex items-center justify-center border-slate-500 border-b py-4 px-4 text-white textxl">
          Movies
        </li>
        <li className="w-full h-full flex items-center justify-center border-slate-500 border-b py-4 px-4 text-white text-xl">
          TV Shows
        </li>
        <li className="w-full h-full flex items-center justify-center border-slate-500 border-b py-4 px-4 text-white text-xl">
          Search
        </li>
        <li className="w-full h-full flex items-center justify-center border-slate-500 py-4 px-4 text-white text-xl">
          Profile
        </li>
      </ul>

      <div className="lg:px-[18%] px-6 py-4 flex justify-between w-full">
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

        {/* Menu toggle button for mobile */}
        <div
          className="text-white lg:hidden cursor-pointer"
          onClick={() => setMenu(!menu)}
        >
          <CiMenuFries size={30} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
