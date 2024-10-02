import React, { useState } from "react";
import MovieCard from "./UI/MovieCard";
import TvShowCard from "./UI/TvShowCard";
import { useGetTopRatedQuery } from "../state/api/apiSlice";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const TopRated = () => {
  const [category, setCategory] = useState("movie");
  const { data: topRated } = useGetTopRatedQuery(category);

  const results = topRated ? topRated.results : [];

  const slideLeft = () => {
    const slider = document.getElementById("topRatedSlider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("topRatedSlider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
    
  return (
    <div className="w-full my-16 flex flex-col gap-4 px-4 md:px-12 lg:px-[18%] bg-bg">
      <div className="w-full h-full flex justify-between">
        <h2 className=" text-white font-semibold text-2xl">What's Popular</h2>
        <div className="rounded-full flex p-[2px] bg-white overflow-hidden text-sm">
          <span
            onClick={() => setCategory("movie")}
            className={`px-6 py-1 cursor-pointer rounded-full ${
              category == "movie"
                ? "text-white  bg-gradient-to-r from-orange-500 to bg-pink-600"
                : "text-black bg-white"
            } `}
          >
            Movies
          </span>
          <span
            onClick={() => setCategory("tv")}
            className={`px-4 py-1 cursor-pointer rounded-full ${
              category == "tv"
                ? "text-white  bg-gradient-to-r from-orange-500 to bg-pink-600"
                : "text-black bg-white"
            } `}
          >
            TV Shows
          </span>
        </div>
      </div>
      <div className="relative flex gap-3 items-center">
        <div
          onClick={slideLeft}
          className="absolute z-30 rounded-full w-8 h-8 lg:w-11 lg:h-11 bg-white opacity-40 hover:opacity-80 cursor-pointer flex items-center justify-center"
        >
          <MdChevronLeft />
        </div>
        <div
          id="topRatedSlider"
          className="w-full h-full overflow-x-scroll scroll scrollbar-hide whitespace-nowrap scroll-smooth"
        >
          {category == "movies"
            ? results.map((movie, index) => (
                <MovieCard movie={movie} key={index} />
              ))
            : results.map((tvShow, index) => (
                <TvShowCard tvShow={tvShow} key={index} />
              ))}
        </div>

        <div
          onClick={slideRight}
          className="absolute right-0 z-30 rounded-full w-8 h-8 lg:w-11 lg:h-11 bg-white opacity-40 hover:opacity-80 cursor-pointer flex items-center justify-center"
        >
          <MdChevronRight />
        </div>
      </div>
    </div>
  );
};

export default TopRated;
