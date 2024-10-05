import React from "react";
import { FaPhotoVideo } from "react-icons/fa";

const PersonCard = ({ person }) => {
  const imgUrl = `https://image.tmdb.org/t/p/w1280${person?.profile_path}`;
  return (
    <div className="flex items-center flex-col cursor-pointer hover:scale-105 transition-all ease-in-out duration-300">
      <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-full overflow-hidden">
        {person?.profile_path ? (
          <img src={imgUrl} className="w-full h-full" alt="" />
        ) : (
          <div className="w-full h-full bg-slate-500 flex flex-col items-center justify-center">
            <FaPhotoVideo size={50} />
            <span>No Profile Available</span>
          </div>
        )}
      </div>
      <h3 className="text-white font-semibold text-center">{person?.name}</h3>
      <div className="break-words whitespace-normal">
        <p className="text-slate-500 text-center max-w-24 block">
          {person?.character}
        </p>
      </div>
    </div>
  );
};

export default PersonCard;
