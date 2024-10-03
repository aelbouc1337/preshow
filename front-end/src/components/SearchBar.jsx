import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const navigateTo = () => {
    if (search.trim() != "") navigate(`/search/${search.trim()}`);
  };
  return (
    <div className="z-20 flex lg:w-[60%] w-[90%] rounded-full overflow-hidden">
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search for a movie or a TV show..."
        className="w-4/5 pl-4 text-black z-20 outline-none placeholder:text-sm lg:placeholder:text-lg"
      />
      <button
        onClick={navigateTo}
        className="bg-bg py-3 lg:py-4 w-1/5 bg-gradient-to-r from-orange-500 to-pink-500"
      >
        search
      </button>
    </div>
  );
};

export default SearchBar;
