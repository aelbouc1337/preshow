import React from "react";

const Skeleton = () => {
  return (
    <div className="w-[20%] inline-flex flex-col lg:gap-6 gap-3 mr-3 lg:mr-5 rounded-xl cursor-pointer">
      <div className="w-full h-32 lg:h-80 rounded-xl bg-skeletton bg-skeleton-gradient bg-[length:200%_100%] animate-shimmer"></div>
      <div className="flex flex-col gap-1">
        <div className="w-[80%] bg-skeletton bg-skeleton-gradient bg-[length:200%_100%] lg:h-7 h-5 animate-shimmer"></div>
        <div className="w-[70%] bg-skeletton bg-skeleton-gradient bg-[length:200%_100%] lg:h-7 h-5 animate-shimmer"></div>
      </div>
    </div>
  );
};

export default Skeleton;
