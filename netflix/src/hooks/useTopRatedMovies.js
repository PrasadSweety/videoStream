import axios from "axios";
import { useDispatch } from "react-redux";
import { Top_Rated, options } from "../utils/constant";
import { getTopRatedMovies } from "../redux/movieSlice";

const useTopRatedMovies = async () => {
  const dispatch = useDispatch();

  try {
    const res = await axios.get(Top_Rated, options);
    dispatch(getTopRatedMovies(res.data.results));
  } catch (error) {
    console.log(error);
  }
};

export default useTopRatedMovies;
