import React, { useState, useEffect } from "react";
import MovieCard from "./UI/MovieCard";
import TvShowCard from "./UI/TvShowCard";
import {
  useGetPopularMoviesQuery,
  useGetPopularTvsQuery,
} from "../state/api/apiSlice";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Skeleton from "./UI/Skeleton";

const PopularMovies = () => {
  const [category, setCategory] = useState("movies");
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: PopularMovies } = useGetPopularMoviesQuery();
  const { data: PopularTvs } = useGetPopularTvsQuery();

  let results;
  if (category === "movies") {
    results = PopularMovies ? PopularMovies.results : [];
  } else {
    results = PopularTvs ? PopularTvs.results : [];
  }

  // Temporary state update to trigger Skeleton loader for 1 second
  useEffect(() => {
    if (isUpdating) {
      const timer = setTimeout(() => {
        setIsUpdating(false);
      }, 300); // 1-second delay for Skeleton loader
      return () => clearTimeout(timer);
    }
  }, [isUpdating]);

  // Using the Arrows to Slide left and Right Smoothly
  const slideLeft = () => {
    const slider = document.getElementById("popularSlider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("popularSlider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // Handle category change and trigger temporary updating state
  const handleCategoryChange = (newCategory) => {
    if (category !== newCategory) {
      setIsUpdating(true);
      setCategory(newCategory);
    }
  };

  const arr = ["a", "b", "c", "d", 1]; // Placeholder array for Skeleton

  return (
    <div className="w-full my-16 flex flex-col gap-4 px-4 md:px-12 lg:px-[18%] bg-bg">
      <div className="w-full h-full flex justify-between">
        <h2 className=" text-white font-semibold text-2xl">What's Popular</h2>
        <div className="rounded-full flex p-[2px] bg-white overflow-hidden text-sm">
          <span
            onClick={() => handleCategoryChange("movies")}
            className={`px-6 py-1 cursor-pointer rounded-full ${
              category === "movies"
                ? "text-white bg-gradient-to-r from-orange-500 to bg-pink-600"
                : "text-black bg-white"
            } `}
          >
            Movies
          </span>
          <span
            onClick={() => handleCategoryChange("tvs")}
            className={`px-4 py-1 cursor-pointer rounded-full ${
              category === "tvs"
                ? "text-white bg-gradient-to-r from-orange-500 to bg-pink-600"
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
          className="absolute z-30 rounded-full w-8 h-8 lg:w-11 lg:h-11 bg-white  cursor-pointer flex items-center justify-center"
        >
          <MdChevronLeft />
        </div>

        {(isUpdating || !PopularMovies || !PopularTvs) && (
          <div className="w-full h-full overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth flex items-center justify-center">
            {arr.map((el, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        )}

        {!isUpdating && (
          <div
            id="popularSlider"
            className="w-full h-full overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth"
          >
            {category === "movies"
              ? results.map((movie, index) => (
                  <MovieCard movie={movie} key={index} />
                ))
              : results.map((tvShow, index) => (
                  <TvShowCard tvShow={tvShow} key={index} />
                ))}
          </div>
        )}

        <div
          onClick={slideRight}
          className="absolute right-0 z-30 rounded-full w-8 h-8 lg:w-11 lg:h-11 bg-white cursor-pointer flex items-center justify-center"
        >
          <MdChevronRight />
        </div>
      </div>
    </div>
  );
};

export default PopularMovies;
