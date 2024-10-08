import React from "react";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import { genreList } from "../../utils/genresList";
import { useNavigate } from "react-router-dom";
import { FaPhotoVideo } from "react-icons/fa";



  // this function take genre id's and return the genre name based on the genreList Array
  export const extractGenres = (first, second) => {
    const firstGenre = genreList[first];
    const secondGenre = genreList[second];

    return [firstGenre, secondGenre];
  };
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const imgUrl = `https://image.tmdb.org/t/p/w1280${movie.poster_path}`;



  const [first, second] = movie.genre_ids; // destructing two first genres from the movie to display them on the card

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="lg:w-[15vw] md:w-[30vw] w-[44vw] inline-flex flex-col mr-3 gap-8 lg:mr-5 rounded-xl cursor-pointer"
    >
      <div className="relative">
        {movie?.poster_path ? (
          <img
            src={imgUrl}
            alt="No photo Here"
            className="rounded-xl text-white hover:scale-105 ease-in-out duration-300 "
          />
        ) : (
          <div className="w-full lg:h-[425px] py-16 text-blue-500 rounded-xl  bg-gradient-to-b from-[#173D77] to-[#03102c] flex flex-col items-center justify-center">
            <FaPhotoVideo size={80} />
            <h4 className="text-xl">No Poster</h4>
          </div>
        )}
        {movie.genre_ids.length >= 2 && (
          <div className="md:flex hidden absolute right-2 bottom-2 max-w-[60%] items-end justify-end gap-1 flex-wrap">
            {extractGenres(first, second).map((genre, index) => (
              <span
                key={index}
                className="px-1 py-1 text-xs bg-[#DA2F68] text-white rounded-md"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
        <div className="lg:w-14 lg:h-14 w-8 h-8 rounded-full flex items-center justify-center absolute bg-white left-2 -bottom-5">
          <div className="relative flex items-center justify-center text-yellow-500">
            <CircularProgress
              variant="determinate"
              value={Math.floor(movie.vote_average * 10)}
              className="absolute w-full h-full"
              size={window.innerWidth >= 1024 ? 50 : 30}
              color={movie.vote_average > 7 ? "success" : "inherit"}
            />
            <span className="text-black text-sm lg:text-base">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      <span>
        <h2 className="lg:text-lg text-sm text-white break-words whitespace-normal">
          {movie.title}
        </h2>
        <h3 className="text-slate-400 text-xs">
          {dayjs(movie.release_date).format("MMM D, YYYY")}
        </h3>
      </span>
    </div>
  );
};

export default MovieCard;
