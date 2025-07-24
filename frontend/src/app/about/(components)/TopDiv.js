import React from "react";

export default function TopDiv() {
  return (
    <>
      <style>
        {`
          .fade-mask {
            -webkit-mask-image: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
            mask-image: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
            -webkit-mask-size: 100% 100%;
            mask-size: 100% 100%;
          }
        `}
      </style>

      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="md:w-2/6 w-full h-32 md:h-auto bg-blue-950 text-white flex items-center justify-center"></div>
        <div className="md:w-4/6 w-full relative bg-blue-950">
          <img
            src="/background.png"
            alt="Background"
            className="w-full h-auto object-cover fade-mask"
          />
        </div>
      </div>
    </>
  );
}
