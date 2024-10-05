import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false); // state of mobile menu
  const [searchOpen, setSearchOpen] = useState(false); // state of search bar
  const [search, setSearch] = useState(""); //state of search query

  const nav = () => {
    setMenu(false);
    navigate("/explorer");
  };

  const handleSumbit = () => {
    setMenu(false);
    navigate(`/search/${search}`);
  };

  return (
    <nav className="relative z-50 bg-opacity-70 bg-bg w-full">
      {searchOpen && (
        <form
          onSubmit={handleSumbit}
          className="absolute lg:top-20 top-16 lg:right-96 w-full lg:w-[40%] lg:translate-x-[25%] lg:px-20 px-10 border text-white border-slate-500 rounded-full bg-slate-700 flex items-center justify-center gap-9"
        >
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search Any Movie or Tv Show"
            className="w-full h-full bg-slate-700 outline-none border-none lg:py-6 py-4"
          />
          <div onClick={() => setSearchOpen(false)}>
            <IoMdClose size={30} />
          </div>
        </form>
      )}
      <ul
        className={`lg:hidden absolute flex flex-col top-16 w-full bg-bg transition-all duration-300 ease-in-out ${
          menu ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"
        }`}
      >
        <li
          onClick={nav}
          className="w-full h-full cursor-pointer flex items-center justify-center border-slate-500 border-b py-4 px-4 text-white text-xl"
        >
          Movies
        </li>
        <li className="w-full h-full cursor-pointer flex items-center justify-center border-slate-500 border-b py-4 px-4 text-white text-xl">
          TV Shows
        </li>
        <li className="w-full h-full cursor-pointer flex items-center justify-center border-slate-500 py-4 px-4 text-white text-xl">
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
          <li className="cursor-pointer" onClick={() => navigate("/explorer")}>
            Movies
          </li>
          <li className="cursor-pointer">TV Shows</li>
          <li
            className="cursor-pointer"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <CiSearch size={30} />
          </li>
          <li className="w-12 h-12 border-4 cursor-pointer border-slate-400 flex items-center justify-center rounded-full">
            <FaUser />
          </li>
        </ul>
        {/* Menu toggle button for mobile */}
        <div className="flex  lg:hidden gap-2 items-center justify-center">
          <div
            onClick={() => setSearchOpen(true)}
            className="flex items-center text-white justify-center lg:hidden"
          >
            <CiSearch size={30} />
          </div>
          <div
            className="text-white cursor-pointer"
            onClick={() => setMenu(!menu)}
          >
            <CiMenuFries size={30} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
