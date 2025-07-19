"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function Carousel({ images, baseUrl }) {
  return (
    <div className="px-44 w-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        spaceBetween={20}
        slidesPerView={1}
        className="rounded-lg overflow-hidden mb-4 "
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={`${baseUrl}${img.image}`}
              alt={`Slide ${idx + 1}`}
              className="w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
