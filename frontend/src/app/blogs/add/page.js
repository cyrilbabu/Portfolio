"use client";
import React, { useState } from "react";
import axios from "axios";
import Preview from "./preview";

const categoryChoices = [
  "All",
  "What I Doing",
  "AI ML Realated",
  "What I Learned",
  "What I Built",
  "Job Related",
];

const inputStyle =
  "border-2 border-white/20 bg-white/10 text-white w-full rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300";

const AddBlogPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  console.error("Base URL:", baseUrl);
  const [formData, setFormData] = useState({
    password: "",
    title: "",
    subtitle: "",
    description: "",
    content: "",
    category: "All",
    images: [],
    contents: [],
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...Array.from(e.target.files)],
    }));
  };

  const handleContentChange = (index, field, value) => {
    const updated = [...formData.contents];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, contents: updated }));
  };

  const handleContentImageUpload = (index, file) => {
    const updated = [...formData.contents];
    updated[index].image = file;
    setFormData((prev) => ({ ...prev, contents: updated }));
  };

  const addNewContentBlock = () => {
    setFormData((prev) => ({
      ...prev,
      contents: [
        ...prev.contents,
        {
          heading: "",
          url: "",
          url_text: "",
          subtitle: "",
          content: "",
          image: null,
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("password", formData.password);
    payload.append("title", formData.title);
    payload.append("subtitle", formData.subtitle);
    payload.append("description", formData.description);
    payload.append("content", formData.content);
    payload.append("category", formData.category);

    if (thumbnail) payload.append("thumbnail", thumbnail);
    if (video) payload.append("video", video);

    formData.images.forEach((img) => payload.append("images", img));

    formData.contents.forEach((item, index) => {
      payload.append(`contents[${index}][heading]`, item.heading);
      payload.append(`contents[${index}][url]`, item.url);
      payload.append(`contents[${index}][url_text]`, item.url_text);
      payload.append(`contents[${index}][subtitle]`, item.subtitle);
      payload.append(`contents[${index}][content]`, item.content);
      if (item.image) {
        payload.append(`contents[${index}][image]`, item.image);
      }
    });

    try {
      await axios.post(`${baseUrl}/blogs/create/`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Blog created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating blog");
    }
  };

  return (
    <div className="bg-blue-950 min-h-screen text-white h-screen flex">
      <div className="w-1/2 mx-auto  bg-blue-950  overflow-y-auto h-screen">
        <Preview blog={formData} />
      </div>

      <div className="w-1/2  mx-auto p-4 bg-blue-950  overflow-y-auto h-screen">
        {/* <h1 className="text-4xl font-bold mb-10 text-center text-white">
          📝 Create New Blog
        </h1> */}

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          {/* Password & Category */}
          <div className="flex flex-col space-y-2">
            <label className="block font-medium mb-1 text-white">
              Admin Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="🔒 Admin Password"
              value={formData.password}
              onChange={handleTextChange}
              className={inputStyle}
              required
            />
            <label className="block font-medium mb-1 text-white">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleTextChange}
              className={inputStyle}
            >
              <option value="">Select Category</option>
              {categoryChoices.map((choice) => (
                <option key={choice} value={choice}>
                  {choice}
                </option>
              ))}
            </select>
          </div>

          {/* Blog Title, Subtitle */}
          <div className="flex flex-col space-y-2">
            <label className="block font-medium mb-1 text-white">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="📌 Blog Title"
              value={formData.title}
              onChange={handleTextChange}
              className={inputStyle}
              required
            />

            <label className="block font-medium mb-1 text-white">
              Blog Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              placeholder="✏️ Blog Subtitle"
              value={formData.subtitle}
              onChange={handleTextChange}
              className={inputStyle}
            />
          </div>

          {/* Description & Content */}
          <div className="flex flex-col space-y-2">
            <label className="block font-medium mb-1 text-white">
              Short Description
            </label>
            <textarea
              name="description"
              placeholder="📄 Short Description"
              value={formData.description}
              onChange={handleTextChange}
              rows={3}
              className={inputStyle}
              required
            ></textarea>

            <label className="block font-medium mb-1 text-white">
              Main Content
            </label>
            <textarea
              name="content"
              placeholder="📝 Main Content"
              value={formData.content}
              onChange={handleTextChange}
              rows={6}
              className={inputStyle}
              required
            ></textarea>
          </div>

          {/* Thumbnail & Video */}
          <div className="flex flex-col space-y-2">
            <label className="block font-medium mb-1 text-white">
              🖼️ Thumbnail Image
            </label>
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className={inputStyle}
            />

            <label className="block font-medium mb-1 text-white">
              🎥 Blog Video (Optional)
            </label>
            <input
              type="text"
              name="video"
              placeholder="🎥 Blog Video URL"
              value={formData.video}
              onChange={handleTextChange}
              className={inputStyle}
            />
          </div>

          {/* Blog Images */}
          <div className="flex flex-col space-y-2">
            <label className="block font-medium mb-1 text-white">
              📸 Blog Images (Multiple)
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className={inputStyle}
            />
          </div>

          {/* Content Blocks */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-white">
              📚 Content Blocks
            </h2>

            {formData.contents.map((content, index) => (
              <div
                key={index}
                className="p-4 mb-4 bg-blue-800 rounded-xl border border-gray-300 shadow-sm"
              >
                <div className="grid grid-cols-1 gap-2 mb-4">
                  <label className="block font-medium mb-1 text-white">
                    📰 Heading
                  </label>
                  <input
                    type="text"
                    placeholder="📰 Heading"
                    value={content.heading}
                    onChange={(e) =>
                      handleContentChange(index, "heading", e.target.value)
                    }
                    className={inputStyle}
                  />
                  <label className="block font-medium mb-1 text-white">
                    📝 Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="📝 Subtitle"
                    value={content.subtitle}
                    onChange={(e) =>
                      handleContentChange(index, "subtitle", e.target.value)
                    }
                    className={inputStyle}
                  />
                </div>
                <label className="block font-medium mb-1 text-white">
                  📝 Content
                </label>
                <textarea
                  placeholder="📖 Content"
                  value={content.content}
                  onChange={(e) =>
                    handleContentChange(index, "content", e.target.value)
                  }
                  className={inputStyle}
                  rows={4}
                />
                <label className="block font-medium mb-1 text-white">
                  🔗 URL
                </label>
                <input
                  type="text"
                  placeholder="🔗 URL"
                  value={content.url}
                  onChange={(e) =>
                    handleContentChange(index, "url", e.target.value)
                  }
                  className={inputStyle}
                />
                <label className="block font-medium mb-1 text-white">
                  🔤 URL Text
                </label>
                <input
                  type="text"
                  placeholder="🔤 URL Text"
                  value={content.url_text}
                  onChange={(e) =>
                    handleContentChange(index, "url_text", e.target.value)
                  }
                  className={inputStyle}
                />
                <div className="mt-4">
                  <label className="block font-medium mb-1 text-white">
                    📁 Upload Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleContentImageUpload(index, e.target.files[0])
                    }
                    className={inputStyle}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addNewContentBlock}
              className="bg-blue-800 mr-4 text-white py-2 px-5 rounded-md hover:bg-blue-700 transition"
            >
              ➕ Add Content Block
            </button>

            <button
              type="button"
              onClick={() => {
                const updatedContents = [...formData.contents];
                updatedContents.pop();
                setFormData((prev) => ({ ...prev, contents: updatedContents }));
              }}
              className="bg-red-600 text-white py-2 px-5 rounded-md hover:bg-red-700 transition"
            >
              ➖ Remove Content Block
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-green-600 w-full text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            🚀 Submit Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPage;
