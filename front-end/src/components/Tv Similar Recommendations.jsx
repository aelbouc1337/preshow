import React from "react";
import { slideLeft, slideRight } from "../pages/MoviePage";
import {
  useGetTvShowSimilarsQuery,
  useGetTvShowRecommendationsQuery,
} from "../state/api/apiSlice";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import TvShowCard from "./UI/TvShowCard";

const TVSimilarAndRecommendations = ({ id, cat }) => {
  const { data: similar } = useGetTvShowSimilarsQuery(id);
  const { data: recommendations } = useGetTvShowRecommendationsQuery(id);

  return (
    <div className="w-full my-4 flex flex-col gap-4 px-4 bg-bg">
      <div className="relative flex gap-3 items-center">
        <div
          onClick={() => slideLeft(cat)}
          className="absolute z-30 rounded-full w-8 h-8 lg:w-11 lg:h-11 bg-white opacity-40 hover:opacity-80 cursor-pointer flex items-center justify-center"
        >
          <MdChevronLeft />
        </div>

        <div
          id={cat == "similar" ? "similar" : "recommendations"}
          className="w-full h-full overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth"
        >
          {cat == "similar" &&
            similar?.results.map((movie, index) => (
              <TvShowCard tvShow={movie} key={index} />
            ))}
          {cat == "recommendations" &&
            recommendations?.results.map((movie, index) => (
              <TvShowCard tvShow={movie} key={index} />
            ))}
        </div>

        <div
          onClick={() => slideRight(cat)}
          className="absolute right-0 z-30 rounded-full w-8 h-8 lg:w-11 lg:h-11 bg-white opacity-40 hover:opacity-80 cursor-pointer flex items-center justify-center"
        >
          <MdChevronRight />
        </div>
      </div>
    </div>
  );
};

export default TVSimilarAndRecommendations;
