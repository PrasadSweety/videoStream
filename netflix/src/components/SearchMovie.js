import axios from "axios";
import React, { useState } from "react";
import { Search_Movie_Url, options } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from "../redux/searchSlice";
import { setLoading } from "../redux/userSlice";
import MovieList from "./MovieList";
const SearchMovie = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.app.isLoading);
  const { movieName, SearchedMovie } = useSelector(
    (store) => store.SearchMovie
  );
  // console.log(`data ${SearchedMovie}`);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      // 'https://api.themoviedb.org/3/search/movie?query=funny%20movie&include_adult=false&language=en-US&page=1

      const res = await axios.get(
        `${Search_Movie_Url}${searchMovie}&include_adult=false&language=en-US&page=1`,
        options
      );
      // console.log(res.data);
      const movies = res.data.results;
      dispatch(setSearchMovieDetails({ searchMovie, movies }));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
    setSearchMovie("");
  };

  return (
    <>
      <div className="flex justify-center pt-[10%] w-[100%]">
        <form onSubmit={submitHandler} className="w-[50%]">
          <div className="flex justify-between  shadow-md-border-2 border-2 p-2 border-gray-200 rounded-lg  w-[100%]">
            <input
              value={searchMovie}
              onChange={(e) => {
                setSearchMovie(e.target.value);
              }}
              className="w-full outline-none text-lg rounded-md"
              type="text"
              placeholder="Search Movies..."
            />
            <button
              type="submit"
              className="bg-red-800 text-white rounded-md px-4 py-2"
            >
              {isLoading ? "Loading..." : "Search"}
            </button>
          </div>
        </form>
      </div>

      {SearchedMovie != null ? (
        <MovieList
          title={movieName}
          searchMovie={true}
          movies={SearchedMovie}
        />
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
};

export default SearchMovie;
