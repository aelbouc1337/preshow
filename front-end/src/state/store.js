import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    // Add the RTK Query reducer
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});
