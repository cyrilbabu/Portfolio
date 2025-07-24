"use client";

import {
  FaEye,
  FaHeart,
  FaShareAlt,
  FaCommentDots,
  FaVideo,
  FaCalendarCheck,
  FaShare,
  FaExternalLinkAlt,
} from "react-icons/fa";

import BlogSpeaker from "./Pulse";
import Link from "next/link";

const BlogCard = ({ blog, isReversed }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div
      className={`text-white flex flex-col md:flex-row ${
        isReversed ? "md:flex-row-reverse" : ""
      } border-2 rounded-lg p-4 md:p-6 mb-6 bg-white/10 shadow-md`}
    >
      {/* Image */}
      <Link
        href={`/blog/${blog.id}`}
        className="w-full md:w-5/12 flex justify-center items-center mb-4 md:mb-0 hover:scale-105 transition-transform duration-300"
      >
        <img
          src={
            blog.thumbnail
              ? `${baseUrl}/${blog.thumbnail}`
              : "/placeholderbloge.png"
          }
          alt={blog.url_text || "Blog"}
          className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-lg border-2 shadow-xl border-white"
        />
      </Link>

      {/* Content */}
      <div
        className={`w-full md:w-7/12 flex flex-col justify-between ${
          isReversed ? "md:pr-4" : "md:pl-4"
        }`}
      >
        <div>
          <Link href={`/blog/${blog.id}`}>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-200 hover:text-white transition hover:underline">
              {blog.title}
            </h2>
          </Link>

          {blog.subtitle && (
            <p className="text-gray-100 text-sm mb-2 border-l-4 px-2 py-1 border-red-500">
              {blog.subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center text-gray-400 text-sm gap-4 mb-3">
            <div className="flex items-center gap-2">
              <FaCalendarCheck />
              {new Date(blog.created_at).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <FaEye /> {blog.views}
            </div>
            <div className="flex items-center gap-2">
              <FaShareAlt /> {blog.shares}
            </div>
          </div>

          <p className="text-stone-200 text-sm sm:text-base mb-4 leading-relaxed">
            {blog.description}
          </p>

          <div className="flex flex-wrap items-center text-gray-50 text-sm sm:text-base gap-6 mb-4">
            {blog.url && (
              <div className="flex items-center gap-2">
                <FaExternalLinkAlt />
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {blog.url_text}
                </a>
              </div>
            )}

            {blog.video && (
              <div className="flex items-center gap-2">
                <FaVideo />
                <span>Video Available</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <BlogSpeaker blog={blog} />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4 text-white text-sm">
          <Link
            href={`/blog/${blog.id}`}
            className="border bg-white/30 text-white font-bold px-4 py-2 rounded-lg hover:bg-white/50 transition-all duration-300 hover:scale-105"
          >
            Read More
          </Link>

          <div className="flex gap-3 flex-wrap">
            <span className="flex items-center gap-1 border rounded-lg py-1 px-3 bg-white/20">
              <FaHeart /> {blog.likes}
            </span>
            <span className="flex items-center gap-1 border rounded-lg py-1 px-3 bg-white/20">
              <FaCommentDots /> {blog.comments_count}
            </span>
            <span className="flex items-center gap-1 border rounded-lg py-1 px-3 bg-white/20">
              <FaShare />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
