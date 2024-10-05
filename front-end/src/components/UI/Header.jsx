import React, { useState } from "react";
import { useGetTrendingMoviesQuery } from "../../state/api/apiSlice";
import SearchBar from "../SearchBar";

const Header = () => {
  function getRandomInt(length) {
    return Math.floor(Math.random() * length) + 1;
  }
  const { data: trendingMovies } = useGetTrendingMoviesQuery("day");
  const imgName =
    trendingMovies?.results[getRandomInt(trendingMovies?.results.length)]
      ?.backdrop_path; // getting backDrops Randomly from trending Movies

  const imgUrl = `https://image.tmdb.org/t/p/w1280${imgName}`; //Forming the URL Based on the backdrop-path
  return (
    <header
      className="relative flex flex-col gap-4 justify-center items-center text-white -mt-[5rem] w-full h-[600px] bg-cover bg-center"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      {/* Use z-0 so this background layer doesn't interfere with Navbar */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-bg via-transparent to-transparent h-full"></div>

      <h1 className="font-bold text-5xl lg:text-8xl z-10">Welcome</h1>
      <h3 className="lg:text-2xl text-center z-10">
        Millions of movies, TV shows and people to discover. Explore Now.
      </h3>
      <SearchBar />
    </header>
  );
};

export default Header;
