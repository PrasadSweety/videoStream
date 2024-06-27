import React from "react";
import { CiPlay1 } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-[vw] absolute pt-[18%] p-12">
      <h1 className=" text-3xl font-bold text-white">{title}</h1>
      <p className="text-white w-1/3 mt-2">{overview}</p>
      <div className="flex items-center mt-8">
        <button className="flex items-center bg-white rounded-md px-6 py-2 mr-5 hover:bg-opacity-80">
          <CiPlay1 size="24px" />
          <span className="ml-1">Play</span>
        </button>
        <button className="flex items-center bg-gray-500 bg-opacity-50 rounded-md px-6 py-2 ">
          <IoInformationCircleOutline size="24px" />
          <span className="ml-1">Watch More</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
