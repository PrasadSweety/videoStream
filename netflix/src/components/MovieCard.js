import React from "react";
import { Basic_Url } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setId, setOpen } from "../redux/movieSlice";

const MovieCard = ({ posterPath, key }) => {
  const dispatch = useDispatch();

  if (posterPath === null) return null;
  const handleClose = () => {
    dispatch(setId(key));
    dispatch(setOpen(true));
  };
  return (
    <div onClick={handleClose} className="w-48 mr-4">
      <img src={`${Basic_Url}/${posterPath}`} alt="movie_img" />
    </div>
  );
};

export default MovieCard;
