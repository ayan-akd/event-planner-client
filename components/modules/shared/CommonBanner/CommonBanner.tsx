import React from "react";

const CommonBanner = ({
  mainComponentTitle,
  subComponentTitle,
}: {
  mainComponentTitle: string;
  subComponentTitle: string;
}) => {
  return (
    <div className="bg-rose-400/15 py-16 md:py-20 flex justify-center items-center">
      <h3 className=" text-base md:text-xl 2xl:text-2xl font-bold">
        {mainComponentTitle} - {subComponentTitle}
      </h3>
    </div>
  );
};

export default CommonBanner;
