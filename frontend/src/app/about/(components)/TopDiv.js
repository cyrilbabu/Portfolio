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

      <div className="flex w-full">
        <div className="w-2/6 bg-blue-950 text-white flex items-center justify-center"></div>
        <div className="w-4/6 relative bg-blue-950">
          <img
            src="/background.png"
            alt="Description"
            className="w-full h-auto fade-mask"
          />
        </div>
      </div>
    </>
  );
}
