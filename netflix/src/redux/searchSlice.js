import { createSlice } from "@reduxjs/toolkit";
import React, { act } from "react";
import SearchMovie from "../components/SearchMovie";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    movieName: null,
    SearchedMovie: null,
  },
  reducers: {
    setSearchMovieDetails: (state, action) => {
      const { searchMovie, movies } = action.payload;
      state.movieName = searchMovie;
      state.SearchedMovie = movies;
    },
  },
});

export default searchSlice.reducer;
export const { setSearchMovieDetails } = searchSlice.actions;
