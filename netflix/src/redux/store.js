import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import SearchMovie from "../components/SearchMovie";
import searchSlice from "./searchSlice";

const store = configureStore({
  reducer: {
    app: userReducer,
    movie: movieReducer,
    SearchMovie: searchSlice,
  },
});

export default store;
