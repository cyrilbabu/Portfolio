"use client";

import React, { useState } from "react";
import { FaEye, FaHeart, FaCommentDots, FaShareAlt } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const LatestBlogCarousel = ({ blogs, baseUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getVisibleCards = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + blogs.length) % blogs.length;
      visible.push(blogs[index]);
    }
    return visible;
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % blogs.length);
  };

  const visibleCards = getVisibleCards();

  return (
    <div
      // href={`/blog/${blog.id}`}
      className="w-full bg-yellow-400 py-12 pb-24 px-4"
    >
      <div className="flex items-center justify-center space-x-4">
        {blogs.length > 3 && (
          <button
            onClick={handlePrev}
            className="p-2 bg-white/20 border-2 border-white text-white rounded-full"
          >
            <ChevronLeft />
          </button>
        )}

        <div className="flex space-x-4 transition-all duration-300">
          {visibleCards.map((blog, idx) => (
            <Link
              href={`/blog/${blog.id}`}
              key={blog.id}
              className={`bg-blue-950 text-white transition-all p-2 rounded duration-300 ${
                idx === 1
                  ? "scale-115 hover:scale-120"
                  : "opacity-60 hover:opacity-80 hover:scale-110"
              }`}
            >
              <img
                src={
                  blog.thumbnail
                    ? `${baseUrl}/${blog.thumbnail}`
                    : "/placeholderbloge.png"
                }
                alt={blog.url_text || "Blog"}
                className="w-400 object-cover "
              />
              <div className="p-3">
                <h2 className="text-lg font-bold border-l-4 border-red-500 pl-2 mb-2">
                  {blog.title}
                </h2>
                {blog.subtitle && (
                  <p className="text-white/90 text-sm mb-2">{blog.subtitle}</p>
                )}
                <p className="text-white text-sm line-clamp-3">
                  {blog.summary}
                </p>
                <div className="flex justify-around items-center text-sm gap-1 mt-3">
                  {[FaEye, FaHeart, FaCommentDots, FaShareAlt].map(
                    (Icon, index) => (
                      <span
                        key={index}
                        className="flex items-center w-full justify-center gap-1 border-2 px-2 py-1 rounded bg-white/20"
                      >
                        <Icon />
                        {
                          [
                            blog.views,
                            blog.likes,
                            blog.comments_count,
                            blog.shares,
                          ][index]
                        }
                      </span>
                    )
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {blogs.length > 3 && (
          <button
            onClick={handleNext}
            className="p-2 bg-white/20 border-2 border-white text-white rounded-full"
          >
            <ChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default LatestBlogCarousel;
