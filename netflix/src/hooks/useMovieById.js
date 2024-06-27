import React, { useEffect } from "react";
import axios from "axios";
import { Video_Url, options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getTrailerMovie } from "../redux/movieSlice";

const useMovieById = async (movieId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getMovieById = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options
        );
        console.log(`my data = ${JSON.stringify(res.data.results)}`);
        const trailer = res?.data?.results?.filter((item) => {
          console.log(item.type);
          return item.type === "Trailer";
        });
        dispatch(
          getTrailerMovie(trailer.length > 0 ? trailer[0] : res.data.results[0])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getMovieById();
  }, []);

  //   useEffect(() => {
  //     const getMovieById = async () => {
  //       console.log(`-----------------------${movieId}`);

  //     };

  //     getMovieById();
  //   }, []);
};

export default useMovieById;
