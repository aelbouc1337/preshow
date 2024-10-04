import React, { useState, useEffect } from "react";
import MovieCard from "./UI/MovieCard";
import TvShowCard from "./UI/TvShowCard";
import { useGetTopRatedQuery } from "../state/api/apiSlice";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Skeleton from "./UI/Skeleton"; // Import Skeleton loader

const TopRated = () => {
  const [category, setCategory] = useState("movie");
  const [isUpdating, setIsUpdating] = useState(false); // State to trigger loading animation
  const { data: topRated } = useGetTopRatedQuery(category);

  const results = topRated ? topRated.results : [];

  // Handle category change and trigger temporary updating state
  const handleCategoryChange = (newCategory) => {
    if (category !== newCategory) {
      setIsUpdating(true);
      setCategory(newCategory);
    }
  };

  // Simulate loading for 1 second when category changes
  useEffect(() => {
    if (isUpdating) {
      const timer = setTimeout(() => {
        setIsUpdating(false);
      }, 300); // 1 second delay for Skeleton loader
      return () => clearTimeout(timer);
    }
  }, [isUpdating]);

  const slideLeft = () => {
    const slider = document.getElementById("topRatedSlider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("topRatedSlider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const skeletonArray = Array(5).fill(0); // Create an array to map for Skeletons

  return (
    <div className="w-full my-16 flex flex-col gap-4 px-4 md:px-12 lg:px-[18%] bg-bg">
      <div className="w-full h-full flex justify-between">
        <h2 className=" text-white font-semibold text-2xl">Top Rated</h2>
        <div className="rounded-full flex p-[2px] bg-white overflow-hidden text-sm">
          <span
            onClick={() => handleCategoryChange("movie")}
            className={`px-6 py-1 cursor-pointer rounded-full ${
              category === "movie"
                ? "text-white bg-gradient-to-r from-orange-500 to bg-pink-600"
                : "text-black bg-white"
            } `}
          >
            Movies
          </span>
          <span
            onClick={() => handleCategoryChange("tv")}
            className={`px-4 py-1 cursor-pointer rounded-full ${
              category === "tv"
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

        {(isUpdating || !topRated) && (
          <div className="w-full h-full overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth flex items-center justify-center">
            {skeletonArray.map((_, index) => (
              <Skeleton key={index} /> // Display Skeletons while updating
            ))}
          </div>
        )}

        {!isUpdating && topRated && (
          <div
            id="topRatedSlider"
            className="w-full h-full overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth"
          >
            {category === "movie"
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
          className="absolute right-0 z-30 rounded-full w-8 h-8 lg:w-11 lg:h-11 bg-white  cursor-pointer flex items-center justify-center"
        >
          <MdChevronRight />
        </div>
      </div>
    </div>
  );
};

export default TopRated;
