import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, searchMovie = false }) => {
  return (
    <div className="px-8">
      <h1
        className={`${searchMovie}?text-black py-3 text-3xl:text-white py-3 text-3xl`}
      >
        {title}
      </h1>
      <div className="flex overflow-x-auto no-scrollbar cursor-pointer">
        <div className="flex items-center  ">
          {movies?.map((indi) => {
            return <MovieCard key={indi.id} posterPath={indi.poster_path} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
