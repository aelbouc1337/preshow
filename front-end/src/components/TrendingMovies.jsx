import React, { useState, useEffect } from "react";
import MovieCard from "./UI/MovieCard";
import { useGetTrendingMoviesQuery } from "../state/api/apiSlice";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Skeleton from "./UI/Skeleton";

const TrendingMovies = () => {
  const [TrendingPeriod, setTrendingPeriod] = useState("day");
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: trendingMovies, isLoading } =
    useGetTrendingMoviesQuery(TrendingPeriod);
  const results = trendingMovies ? trendingMovies.results : [];

  // Temporary state update to trigger Skeleton loader for 1 second
  useEffect(() => {
    if (!isLoading && isUpdating) {
      const timer = setTimeout(() => {
        setIsUpdating(false);
      }, 300); // 1 second delay for Skeleton loader
      return () => clearTimeout(timer);
    }
  }, [isLoading, isUpdating]);

  // Using the Arrows to Slide left and Right Smoothly
  const slideLeft = () => {
    const slider = document.getElementById("trendingSlider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    const slider = document.getElementById("trendingSlider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // Change TrendingPeriod and trigger temporary updating state
  const handleTrendingPeriodChange = (period) => {
    if (TrendingPeriod !== period) {
      setIsUpdating(true);
      setTrendingPeriod(period);
    }
  };

  const arr = ["a", "b", "c", "d", 1];

  return (
    <div className="w-full my-10 flex flex-col gap-4 px-4 md:px-12 lg:px-[18%] bg-bg">
      <div className="w-full h-full flex justify-between">
        <h2 className=" text-white font-semibold text-2xl">Trending</h2>
        <div className="rounded-full flex p-[2px] bg-white overflow-hidden text-sm">
          <span
            onClick={() => handleTrendingPeriodChange("day")}
            className={`px-6 py-1 cursor-pointer rounded-full ${
              TrendingPeriod === "day"
                ? "text-white  bg-gradient-to-r from-orange-500 to bg-pink-600"
                : "text-black bg-white"
            } `}
          >
            Day
          </span>
          <span
            onClick={() => handleTrendingPeriodChange("week")}
            className={`px-4 py-1 cursor-pointer rounded-full ${
              TrendingPeriod === "week"
                ? "text-white  bg-gradient-to-r from-orange-500 to bg-pink-600"
                : "text-black bg-white"
            } `}
          >
            Week
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
        {(isLoading || isUpdating) && (
          <div className="w-full h-full overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth flex items-center justify-center">
            {arr.map((el, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        )}
        {!isLoading && !isUpdating && (
          <div
            id="trendingSlider"
            className="w-full h-full overflow-x-scroll scroll scrollbar-hide whitespace-nowrap scroll-smooth"
          >
            {results.map((movie, index) => (
              <MovieCard movie={movie} key={index} />
            ))}
          </div>
        )}
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

export default TrendingMovies;
