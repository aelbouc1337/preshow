import React from "react";
import { slideLeft, slideRight } from "../pages/MoviePage";
import {
  useGetMovieRecommendationsQuery,
  useGetMovieSimilarsQuery,
} from "../state/api/apiSlice";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import MovieCard from "./UI/MovieCard";

const SimilarAndRecommendations = ({ id, cat }) => {
  const { data: similar } = useGetMovieSimilarsQuery(id);
  const { data: recommendations } = useGetMovieRecommendationsQuery(id);

  return (
    <div className="w-full my-4 flex flex-col gap-4 px-4 bg-bg">
      <div className="relative flex gap-3 items-center">
        <div
          onClick={() => slideLeft("similar")}
          className="absolute z-30 rounded-full w-8 h-8 lg:w-11 lg:h-11 bg-white opacity-40 hover:opacity-80 cursor-pointer flex items-center justify-center"
        >
          <MdChevronLeft />
        </div>

        <div
          id="similar"
          className="w-full h-full overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth"
        >
          {cat == "similar" &&
            similar?.results.map((movie, index) => (
              <MovieCard movie={movie} key={index} />
            ))}
          {cat == "recommendations" &&
            recommendations?.results.map((movie, index) => (
              <MovieCard movie={movie} key={index} />
            ))}
        </div>

        <div
          onClick={() => slideRight("similar")}
          className="absolute right-0 z-30 rounded-full w-8 h-8 lg:w-11 lg:h-11 bg-white opacity-40 hover:opacity-80 cursor-pointer flex items-center justify-center"
        >
          <MdChevronRight />
        </div>
      </div>
    </div>
  );
};

export default SimilarAndRecommendations;
