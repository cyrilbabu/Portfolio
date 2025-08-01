"use client";
import { FaCopy, FaHeart } from "react-icons/fa";

const ShareModal = ({ onClose, blog }) => {
  const blogUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/blog/${blog.id}`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(blogUrl);
    alert("Link copied!");
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md text-black">
        <h2 className="text-xl font-bold mb-4">Share this Blog</h2>

        <div className="flex items-center gap-2 mb-4">
          <FaHeart className="text-red-600" />
          <p>{blog.likes} likes</p>
        </div>

        <div className="mb-4">
          <p className="text-sm break-all">{blogUrl}</p>
        </div>

        <div className="flex justify-between">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            onClick={copyToClipboard}
          >
            <FaCopy /> Copy Link
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
