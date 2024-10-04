import React, { useState, useEffect, useRef } from "react";
import { useGetMoviesByGenreQuery } from "../state/api/apiSlice";
import MovieCard from "../components/UI/MovieCard";
import GenreSelect from "../components/UI/GenreSelect";
import SortSelect from "../components/UI/SortSelect";

const Explorer = () => {
  const [selected, setSelected] = useState("28,12"); // Initialize with null
  const [selectedSort, setSelectedSort] = useState(null);

  const [page, setPage] = useState(1);
  const [accumulatedResults, setAccumulatedResults] = useState([]); // State to hold accumulated results
  const observerRef = useRef(); // Reference for the observer

  // Fetch data using RTK Query, passing selected genre and page
  const { data: searchedMedia, isFetching } = useGetMoviesByGenreQuery({
    genre: selected,
    page,
    sortBy: selectedSort,
  });

  // Reset accumulated results and page when selected genre changes
  useEffect(() => {
    if (selected || selectedSort) {
      setAccumulatedResults([]); // Clear previous results when genre changes
      setPage(1); // Reset to first page
    }
  }, [selected, selectedSort]); // Ensure this effect only runs when `selected` changes

  // Accumulate results from fetched data
  useEffect(() => {
    if (searchedMedia?.results) {
      setAccumulatedResults((prevResults) => [
        ...prevResults,
        ...searchedMedia.results,
      ]);
    }
  }, [searchedMedia]); // Run when `searchedMedia` updates

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

  return (
    <div className="w-full my-10 justify-centers items-center flex flex-col gap-4 px-4 md:px-28 lg:px-[9%] bg-bg">
      <div className="w-full items-end flex flex-col lg:flex-row gap-3 border">
        <GenreSelect selected={selected} setSelected={setSelected} />
        <SortSelect
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
      </div>
      <div className="w-full h-full  grid lg:gap-8 lg:grid-cols-5 grid-cols-2">
        {accumulatedResults?.map((item, index) => (
          <MovieCard key={index} movie={item} />
        ))}
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

export default Explorer;
