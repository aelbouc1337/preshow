import React from "react";
import { useGetTrendingMoviesQuery } from "../../state/api/apiSlice";

const Header = () => {
  function getRandomInt(length) {
    return Math.floor(Math.random() * length) + 1;
  }
  const { data: trendingMovies } = useGetTrendingMoviesQuery("day");
  const imgName =
    trendingMovies?.results[getRandomInt(trendingMovies?.results.length)]
      ?.backdrop_path;
  const imgUrl = `https://image.tmdb.org/t/p/w1280${imgName}`;
  return (
    <header
      className="relative flex flex-col gap-2 justify-center items-center text-white -mt-[5rem] w-full h-[600px] bg-cover bg-center"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-bg via-transparent to-transparent h-full"></div>

      <h1 className="font-bold text-5xl lg:text-8xl">Welcome</h1>
      <h3 className="lg:text-2xl text-center ">
        Millions of movies, TV shows and people to discover. Explore Now.
      </h3>
      <div className="z-20 flex lg:w-[60%] w-[90%] rounded-full overflow-hidden">
        <input
          type="text"
          placeholder="Search for a movie or a TV show..."
          className="w-4/5 pl-4 text-black z-20 outline-none placeholder:text-sm lg:placeholder:text-lg"
        />
        <button className="bg-bg py-3 lg:py-4 w-1/5 bg-gradient-to-r from-orange-500 to-pink-500">
          search
        </button>
      </div>
    </header>
  );
};

export default Header;
