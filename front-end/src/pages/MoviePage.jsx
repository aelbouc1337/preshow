import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetMovieByIdQuery,
  useGetMovieCreditsQuery,
  useGetMovieVideosQuery,
} from "../state/api/apiSlice";
import dayjs from "dayjs";
import { CircularProgress, Modal } from "@mui/material";
import { CiPlay1 } from "react-icons/ci";
import PersonCard from "../components/UI/PersonCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import VideoCard from "../components/UI/VideoCard";
import MovieSimilarAndRecommendations from "../components/Movie Similar Recommendations";
import Backdrop from "@mui/material/Backdrop";
import { slideLeft, slideRight } from "../utils/sliders";

const MoviePage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const { data: movie } = useGetMovieByIdQuery(id);
  const { data: movieCredits } = useGetMovieCreditsQuery(id);
  const { data: movieVideos } = useGetMovieVideosQuery(id);

  // getting the trailer from videos
  const trailer = movieVideos?.results?.filter(
    (video) => video.type == "Trailer"
  );
  // getting the director from Credits
  const director = movieCredits?.crew.find(
    (crewMember) => crewMember.job === "Director"
  );
  // getting one or more writer from credits
  const writers = movieCredits?.crew
    .filter((writer) => writer.job === "Writer")
    .map((writer) => writer.name);

  const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w1280${movie?.poster_path}`;

  const year = dayjs(movie?.release_date).format("YYYY");

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    scrollToTop();
  });

  return (
    <div className="w-full h-full">
      <header
        className="relative min-h-screen bg-center bg-cover flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute z-10 inset-0 bg-bg bg-opacity-90 flex items-center justify-center"></div>
        <div className="absolute z-10 inset-0 bg-gradient-to-t from-bg via-transparent to-transparent bg-opacity-90 flex items-center justify-center"></div>
        <div className="z-20 w-full h-full px-6 lg:px-[18%]">
          <section className="flex gap-8 mt-10 flex-col lg:flex-row">
            <img
              src={posterUrl}
              className="w-full lg:w-2/6 rounded-3xl"
              alt="Poster"
            />
            <div className="flex flex-col justify-center gap-4 p-1">
              <div>
                <h2 className="lg:text-4xl text-xl">
                  {movie?.title} [{year}]
                </h2>
                <h4 className="text-slate-500 text-sm lg:text-xl">
                  {movie?.tagline}
                </h4>
              </div>

              <ul className="flex gap-1">
                {movie?.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-1 py-1 text-xs bg-pink-600 rounded-md"
                  >
                    {genre.name}
                  </span>
                ))}
              </ul>

              <div className="flex gap-5">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-slate-900">
                  <div className="relative flex items-center justify-center text-yellow-500">
                    <CircularProgress
                      variant="determinate"
                      value={Math.floor(movie?.vote_average * 10)}
                      className="absolute w-full h-full"
                      size={80}
                      color={movie?.vote_average > 7 ? "success" : "inherit"}
                    />
                    <span className="text-white text-sm lg:text-base">
                      {movie?.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setOpen(true)}
                  className="flex items-center gap-3 cursor-pointer text-white hover:scale-105 ease-in-out duration-300"
                >
                  <div className="w-16  h-16 flex items-center justify-center  rounded-full border-2 ">
                    <CiPlay1 size={30} />
                  </div>
                  <h4 className="text-xl"> Watch Trailer</h4>
                </div>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  slots={{ backdrop: Backdrop }}
                  slotProps={{
                    backdrop: {
                      timeout: 500,
                    },
                  }}
                >
                  {trailer && trailer.length > 0 ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${trailer[0]?.key}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute w-[90%] h-72 lg:w-[800px] lg:h-[560px] top-[50%] right-[50%] translate-x-[50%] -translate-y-[50%]"
                    ></iframe>
                  ) : (
                    <div className="text-white">Trailer not available</div>
                  )}
                </Modal>
              </div>

              <section className="flex flex-col gap-2">
                <h4 className="text-xl block p-1 border-b w-24">Overview</h4>
                <p>{movie?.overview}</p>
              </section>
              <section className="flex">
                <div className="flex flex-wrap">
                  <span className="text-white font-semibold">Status:</span>
                  <span className="text-slate-500 md:ml-3">
                    {movie?.status}
                  </span>
                </div>
                <div className="md:ml-12 flex flex-wrap">
                  <span className="text-white font-semibold">
                    Release Date:
                  </span>
                  <span className="text-slate-500 md:ml-3">
                    {movie?.release_date}
                  </span>
                </div>
                <div className="md:ml-12 flex flex-wrap">
                  <span className="text-white font-semibold">Runtime:</span>
                  <span className="text-slate-500 md:ml-3">
                    {movie?.runtime} minutes
                  </span>
                </div>
              </section>
              <hr className="w-full border-slate-500" />
              <section>
                <span className="text-white font-semibold">Director:</span>
                <span className="text-slate-500 ml-3">{director?.name}</span>
              </section>
              <hr className="w-full border-slate-500" />
              <section className="flex flex-row">
                <span className="text-white font-semibold">Writers:</span>
                {writers?.map((writer, index) => (
                  <span key={index} className="text-slate-500 ml-3">
                    [{writer}]
                  </span>
                ))}
              </section>
              <hr className="w-full border-slate-500" />
            </div>
          </section>

          {/* Top Cast section */}
          <div className="w-full flex flex-col gap-3 my-12 h-full">
            <h3 className="text-white lg:text-2xl font-semibold">Top Casts</h3>
            <div className="relative flex gap-3 items-center">
              <div
                id="topCast"
                className="w-full flex gap-7 h-full overflow-x-scroll scroll scrollbar-hide whitespace-nowrap scroll-smooth"
              >
                <div
                  onClick={() => slideLeft("topCast")}
                  className="absolute top-[30%] z-30 text-black rounded-full w-8 h-8 lg:w-11 lg:h-11 bg-white cursor-pointer flex items-center justify-center"
                >
                  <MdChevronLeft size={30} />
                </div>
                {movieCredits?.cast.map((cast, index) => (
                  <PersonCard key={index} person={cast} />
                ))}
                <div
                  onClick={() => slideRight("topCast")}
                  className="absolute text-black top-[30%] right-0 z-30 rounded-full w-8 h-8 lg:w-11 lg:h-11 bg-white cursor-pointer flex items-center justify-center"
                >
                  <MdChevronRight size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Official Videos section */}
      {movieVideos?.results.length != 0 && (
        <section className="w-full px-6 lg:px-[18%]">
          <h2 className="lg:text-2xl font-semibold text-white">
            Official Videos
          </h2>
          <div className="relative flex gap-3 items-center mt-4">
            {" "}
            {/* Added margin-top */}
            <div
              id="videos"
              className="w-full flex gap-7 h-full overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth"
            >
              <div
                onClick={() => slideLeft("videos")}
                className="absolute top-[30%] z-30 text-black rounded-full w-8 h-8 lg:w-11 lg:h-11 bg-white cursor-pointer flex items-center justify-center"
              >
                <MdChevronLeft size={30} />
              </div>

              {/* Render video cards here */}
              {movieVideos?.results?.map((video, index) => (
                <VideoCard key={index} video={video} />
              ))}

              <div
                onClick={() => slideRight("videos")}
                className="absolute text-black top-[30%] right-0 z-30 rounded-full w-8 h-8 lg:w-11 lg:h-11 bg-white  cursor-pointer flex items-center justify-center"
              >
                <MdChevronRight size={30} />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="w-full my-6 px-6 lg:px-[18%]">
        <h2 className="lg:text-2xl font-semibold text-white">Similar Movies</h2>

        <MovieSimilarAndRecommendations id={id} cat="similar" />
      </section>
      <section className="w-full my-6 px-6 lg:px-[18%]">
        <h2 className="lg:text-2xl font-semibold text-white">
          Recommendations
        </h2>

        <MovieSimilarAndRecommendations id={id} cat="recommendations" />
      </section>
    </div>
  );
};

export default MoviePage;
