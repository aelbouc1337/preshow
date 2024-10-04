import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2IxMGY2ZGUzMDBjNmFmNjAyZTc2Yzk5Yzg3MTkyMiIsIm5iZiI6MTcyNzYzMDg0My4zMzA2Nywic3ViIjoiNjZmODFmYzcxYTljOTE4OGZlY2MyMDhhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Ho58wABDNhmkSdwamoDewid98XWuEK5X9Oa7gQ6QKHY";
export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Authorization", `Bearer ${token}`);
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
    getMovieSimilars: builder.query({
      query: (id) => `/movie/${id}/similar`,
    }),
    getMovieRecommendations: builder.query({
      query: (id) => `/movie/${id}/recommendations`,
    }),
    getMovieCredits: builder.query({
      query: (id) => `movie/${id}/credits`,
    }),
    getMovieVideos: builder.query({
      query: (id) => `movie/${id}/videos`,
    }),
    getTrendingMovies: builder.query({
      query: (time_window) => `/trending/movie/${time_window}`,
    }),
    getTopRated: builder.query({
      query: (category) => `/${category}/top_rated`,
    }),
    getMoviesByGenre: builder.query({
      query: ({ genre, page }) =>
        `/discover/movie?with_genres=${genre}&page=${page}`,
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
} = movieApi;
