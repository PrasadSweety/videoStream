import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    upcomingMovies: null,
    topRatedMovies: null,
    toggle: false,
    trailerMovie: null,
    open: false,
    id: "",
  },
  reducers: {
    getnowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    getPopularMovie: (state, action) => {
      state.popularMovies = action.payload;
    },
    getUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    getTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    getTrailerMovie: (state, action) => {
      state.trailerMovie = action.payload;
    },

    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },

    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

export const {
  getnowPlayingMovies,
  getPopularMovie,
  getUpcomingMovies,
  getTopRatedMovies,
  getTrailerMovie,
  setToggle,
  setOpen,
  setId,
} = movieSlice.actions;
export default movieSlice.reducer;
