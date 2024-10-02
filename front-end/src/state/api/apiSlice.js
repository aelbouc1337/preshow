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
    getTrendingMovies: builder.query({
      query: (time_window) => `/trending/movie/${time_window}`,
    }),
    getTopRated: builder.query({
      query: (category) => `/${category}/top_rated`,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
  useGetPopularTvsQuery,
  useGetTopRatedQuery,
} = movieApi;
