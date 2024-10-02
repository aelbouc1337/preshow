import React from "react";
import Header from "../components/UI/Header";
import TrendingMovies from "../components/TrendingMovies";
import PopularMovies from "../components/PopularMovies";
import TopRated from "../components/TopRated";

const HomePage = () => {
  return (
    <div className="bg-bg">
      <Header />
      <TrendingMovies />
      <PopularMovies />
      <TopRated />
    </div>
  );
};

export default HomePage;
