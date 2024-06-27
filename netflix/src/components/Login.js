import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { API_END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/userSlice.js";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.app.isLoading);

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };

  const getData = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    if (isLogin) {
      //login
      try {
        const headers = {
          "Content-Type": "application/json",
          // Add your authorization header if needed
          // 'Authorization': `Bearer YOUR_ACCESS_TOKEN`
        };
        const user = { email, password };
        const res = await axios.post(`${API_END_POINT}/login`, user, {
          headers,
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
        }
        dispatch(setUser(res.data.user));
        navigate("/browse");
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      //register
      try {
        const headers = {
          "Content-Type": "application/json",
          // Add your authorization header if needed
          // 'Authorization': `Bearer YOUR_ACCESS_TOKEN`
        };
        const fullName = name;
        const user = { fullName, email, password };
        const res = await axios.post(`${API_END_POINT}/register`, user, user, {
          headers,
          withCredentials: true,
        });

        if (res.data.success) {
          toast.success(res.data.message);
          setIsLogin(true);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoading(false));
      }
    }

    setEmail("");
    setName("");
    setPassword("");
  };

  return (
    <div>
      <Header />
      <div>
        <img
          className="absolute w-[100vw] h-[100vh]"
          src="https://www.universitymagazine.ca/wp-content/uploads/2021/08/How-to-Get-Netflix-For-Free.jpg"
          alt="netflix_back"
        ></img>

        <form
          onSubmit={getData}
          className="flex flex-col items-center mx-auto justify-content text-white bg-black left-0 right-0 absolute w-3/12 p-12 my-36 opacity-85"
        >
          <h1 className="text-3xl mb-5">{isLogin ? "Login" : "SignUp"}</h1>
          <div className="flex flex-col">
            {!isLogin && (
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="p-3 my-2 rounded-sm bg-gray-800 text-white outline-none"
                type="text"
                placeholder="Name"
              ></input>
            )}

            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="p-3 my-2 rounded-sm bg-gray-800 text-white outline-none"
              type="email"
              placeholder="Email"
            ></input>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="p-3 my-2 rounded-sm bg-gray-800 text-white outline-none"
              type="password"
              placeholder="Password"
            ></input>

            <button className=" bg-red-900 py-2 mt-4 mb-2 text-white getData">
              {isLoading ? "Loading..." : isLogin ? "Login" : "SignUp"}
            </button>

            <p>
              {isLogin ? "Already have an Account? " : "New to netflix?"}

              <span
                onClick={() => {
                  loginHandler();
                }}
                className="ml-1 cursor-pointer text-blue-900"
              >
                {isLogin ? "SignUp" : "Login"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
