import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Authorization", `Bearer ${import.meta.env.VITE_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: () => `/movie/popular`,
    }),
    getPopularTvs: builder.query({
      query: () => `/tv/popular`,
    }),
    getSearchedMedia: builder.query({
      query: ({ search, page }) => `/search/multi?query=${search}&page=${page}`,
    }),
    getMovieById: builder.query({
      query: (id) => `/movie/${id}`,
    }),
    getTvShowById: builder.query({
      query: (id) => `/tv/${id}`,
    }),
    getMovieSimilars: builder.query({
      query: (id) => `/movie/${id}/similar`,
    }),
    getTvShowSimilars: builder.query({
      query: (id) => `/tv/${id}/similar`,
    }),
    getMovieRecommendations: builder.query({
      query: (id) => `/movie/${id}/recommendations`,
    }),
    getTvShowRecommendations: builder.query({
      query: (id) => `/tv/${id}/recommendations`,
    }),
    getMovieCredits: builder.query({
      query: (id) => `movie/${id}/credits`,
    }),
    getTvShowCredits: builder.query({
      query: (id) => `tv/${id}/credits`,
    }),
    getMovieVideos: builder.query({
      query: (id) => `movie/${id}/videos`,
    }),
    gettvShowVideos: builder.query({
      query: (id) => `tv/${id}/videos`,
    }),

    getTrendingMovies: builder.query({
      query: (time_window) => `/trending/movie/${time_window}`,
    }),
    getTopRated: builder.query({
      query: (category) => `/${category}/top_rated`,
    }),
    getMoviesByGenre: builder.query({
      query: ({ genre, page, sortBy }) =>
        `/discover/movie?with_genres=${genre}&page=${page}&sort_by=${
          sortBy ? sortBy : "popularity.desc"
        }`,
    }),
    getTvsByGenre: builder.query({
      query: ({ genre, page, sortBy }) =>
        `/discover/tv?with_genres=${genre}&page=${page}&sort_by=${
          sortBy ? sortBy : "popularity.desc"
        }`,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
  useGetPopularTvsQuery,
  useGetTopRatedQuery,
  useGetSearchedMediaQuery,
  useGetMovieByIdQuery,
  useGetMovieCreditsQuery,
  useGetMovieVideosQuery,
  useGetMovieSimilarsQuery,
  useGetMovieRecommendationsQuery,
  useGetMoviesByGenreQuery,
  useGetTvShowByIdQuery,
  useGetTvShowCreditsQuery,
  useGettvShowVideosQuery,
  useGetTvShowSimilarsQuery,
  useGetTvShowRecommendationsQuery,
  useGetTvsByGenreQuery,
} = movieApi;
