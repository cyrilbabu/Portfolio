"use client";
import { useState } from "react";
import axios from "axios";

const CommentModal = ({ blogId, onClose }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubmit = async () => {
    try {
      await axios.post(`${baseUrl}/blogs/${blogId}/comment`, { name, comment });
      onClose();
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[90%] text-black max-w-md">
        <h2 className="text-xl font-bold mb-4">Leave a Comment</h2>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 mb-3 border placeholder:text-black text-black rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Your Comment"
          className="w-full p-2 mb-3 text-black placeholder:text-black border rounded"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded  hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
