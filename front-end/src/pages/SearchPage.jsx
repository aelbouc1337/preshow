import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetSearchedMediaQuery } from "../state/api/apiSlice";
import MovieCard from "../components/UI/MovieCard";
import TvShowCard from "../components/UI/TvShowCard";

const SearchPage = () => {
  const { search } = useParams();
  const [page, setPage] = useState(1);
  const [accumulatedResults, setAccumulatedResults] = useState([]); // State to hold accumulated results
  const observerRef = useRef(); // Reference for the observer

  // Fetch data using RTK Query
  const { data: searchedMedia, isFetching } = useGetSearchedMediaQuery({
    search,
    page,
  });

  // Use effect to accumulate results
  useEffect(() => {
    if (searchedMedia?.results) {
      setAccumulatedResults((prevResults) => [
        ...prevResults,
        ...searchedMedia.results,
      ]);
    }
  }, [searchedMedia]);

  // Intersection Observer to trigger loading more data
  useEffect(() => {
    if (isFetching) return; // Prevent new fetching during ongoing request

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          searchedMedia?.page < searchedMedia?.total_pages
        ) {
          setPage((prevPage) => prevPage + 1); // Load more when the end is reached
        }
      },
      {
        rootMargin: "200px", // Trigger when 200px away from the bottom
      }
    );

    if (observerRef.current) observer.observe(observerRef.current); // Observe the ref at the bottom of the list

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current); // Clean up observer when unmounting
    };
  }, [isFetching, searchedMedia]);

  // Filter out only movies or TV shows with a poster path
  const RenderedArray = accumulatedResults?.filter(
    (item) =>
      (item.media_type === "movie" || item.media_type === "tv") &&
      item.poster_path
  );

  return (
    <div className="w-full my-10 flex flex-col gap-4 px-12 md:px-28 lg:px-[18%] bg-bg">
      <h1 className="text-white font-semibold lg:text-2xl text-lg">
        Search results for "{search}"
      </h1>
      <div className="w-full h-full grid gap-3 lg:grid-cols-5 grid-cols-2">
        {RenderedArray?.map((item, index) =>
          item.media_type === "movie" ? (
            <MovieCard key={index} movie={item} />
          ) : (
            <TvShowCard key={index} tvShow={item} />
          )
        )}
      </div>
      {/* The observer target - this will be observed for the intersection */}
      <div ref={observerRef} className="observer-element w-full h-10"></div>
      {isFetching && (
        <div className="w-full flex justify-center items-center">
          <div className="lg:w-24 lg:h-24 w-16 h-16 rounded-full border-b-4 border-r-4 border-blue-500 animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
