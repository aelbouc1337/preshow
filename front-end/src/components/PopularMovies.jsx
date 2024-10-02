import React, { useState } from "react";
import MovieCard from "./UI/MovieCard";
import TvShowCard from "./UI/TvShowCard";
import {
  useGetPopularMoviesQuery,
  useGetPopularTvsQuery,
} from "../state/api/apiSlice";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const PopularMovies = () => {
  const [category, setCategory] = useState("movies");
  const { data: PopularMovies } = useGetPopularMoviesQuery();
  const { data: PopularTvs } = useGetPopularTvsQuery();
  let results;
  if (category == "movies")
    results = PopularMovies ? PopularMovies.results : [];
  else results = PopularTvs ? PopularTvs.results : [];

  const slideLeft = () => {
    const slider = document.getElementById("popularSlider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("popularSlider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="w-full my-16 flex flex-col gap-4 px-4 md:px-12 lg:px-[18%] bg-bg">
      <div className="w-full h-full flex justify-between">
        <h2 className=" text-white font-semibold text-2xl">What's Popular</h2>
        <div className="rounded-full flex p-[2px] bg-white overflow-hidden text-sm">
          <span
            onClick={() => setCategory("movies")}
            className={`px-6 py-1 cursor-pointer rounded-full ${
              category == "movies"
                ? "text-white  bg-gradient-to-r from-orange-500 to bg-pink-600"
                : "text-black bg-white"
            } `}
          >
            Movies
          </span>
          <span
            onClick={() => setCategory("tvs")}
            className={`px-4 py-1 cursor-pointer rounded-full ${
              category == "tvs"
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
          id="popularSlider"
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

export default PopularMovies;
