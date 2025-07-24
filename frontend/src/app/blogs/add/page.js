"use client";
import React, { useState } from "react";
import axios from "axios";

const categoryChoices = [
  "All",
  "What I Doing",
  "AI ML Realated",
  "What I Learned",
  "What I Built",
  "Job Related",
];

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

    const payload = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      content: formData.content,
      category: formData.category,
      thumbnail: thumbnail ? URL.createObjectURL(thumbnail) : null,
      video: video ? URL.createObjectURL(video) : null,
      images: formData.images.map((img) => ({
        image: URL.createObjectURL(img),
      })),
      contents: formData.contents.map((item) => ({
        heading: item.heading,
        url: item.url,
        url_text: item.url_text,
        subtitle: item.subtitle,
        content: item.content,
        image: item.image ? URL.createObjectURL(item.image) : null,
      })),
    };

    try {
      await axios.post(`${baseUrl}/blogs/create/`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Blog created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating blog");
    }
  };

  return (
    <div className="w-full  mx-auto py-12 bg-blue-950 px-60 shadow-lg">
      <h1 className="text-4xl font-bold mb-10 text-center text-white">
        📝 Create New Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8 flex flex-col">
        {/* Password & Category */}
        <div className="flex flex-col space-y-4">
          <label className="block font-medium mb-1 text-white">
            Admin Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="🔒 Admin Password"
            value={formData.password}
            onChange={handleTextChange}
            className="input-style border-white bg-white/20 text-white"
            required
          />
          <label className="block font-medium mb-1 text-white">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleTextChange}
            className="input-style border-white bg-white/20 text-white"
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
        <div className="flex flex-col space-y-4">
          <label className="block font-medium mb-1 text-white">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="📌 Blog Title"
            value={formData.title}
            onChange={handleTextChange}
            className="input-style border-white bg-white/20 text-white"
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
            className="input-style border-white bg-white/20 text-white"
          />
        </div>

        {/* Description & Content */}
        <div className="flex flex-col space-y-4">
          <label className="block font-medium mb-1 text-white">
            Short Description
          </label>
          <textarea
            name="description"
            placeholder="📄 Short Description"
            value={formData.description}
            onChange={handleTextChange}
            rows={3}
            className="input-style border-white bg-white/20 text-white"
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
            className="input-style border-white bg-white/20 text-white"
            required
          ></textarea>
        </div>

        {/* Thumbnail & Video */}
        <div className="flex flex-col space-y-4">
          <label className="block font-medium mb-1 text-white">
            🖼️ Thumbnail Image
          </label>
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="input-style border-white bg-white/20 text-white"
          />

          <label className="block font-medium mb-1 text-white">
            🎥 Blog Video (Optional)
          </label>
          <input
            type="file"
            onChange={(e) => setVideo(e.target.files[0])}
            className="input-style border-white bg-white/20 text-white"
          />
        </div>

        {/* Blog Images */}
        <div className="flex flex-col space-y-4">
          <label className="block font-medium mb-1 text-white">
            📸 Blog Images (Multiple)
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="input-style border-white bg-white/20 text-white"
          />
        </div>

        <hr className="border-t-2 my-8 border-white" />

        {/* Content Blocks */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-white">
            📚 Content Blocks
          </h2>

          {formData.contents.map((content, index) => (
            <div
              key={index}
              className="p-6 mb-6 bg-blue-600 rounded-xl border border-gray-300 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="📰 Heading"
                  value={content.heading}
                  onChange={(e) =>
                    handleContentChange(index, "heading", e.target.value)
                  }
                  className="input-style border-white bg-white/20 text-white"
                />
                <input
                  type="text"
                  placeholder="🔗 URL"
                  value={content.url}
                  onChange={(e) =>
                    handleContentChange(index, "url", e.target.value)
                  }
                  className="input-style border-white bg-white/20 text-white"
                />
                <input
                  type="text"
                  placeholder="🔤 URL Text"
                  value={content.url_text}
                  onChange={(e) =>
                    handleContentChange(index, "url_text", e.target.value)
                  }
                  className="input-style border-white bg-white/20 text-white"
                />
                <input
                  type="text"
                  placeholder="📝 Subtitle"
                  value={content.subtitle}
                  onChange={(e) =>
                    handleContentChange(index, "subtitle", e.target.value)
                  }
                  className="input-style border-white bg-white/20 text-white"
                />
              </div>

              <textarea
                placeholder="📖 Content"
                value={content.content}
                onChange={(e) =>
                  handleContentChange(index, "content", e.target.value)
                }
                className="input-style border-white bg-white/20 text-white"
                rows={4}
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
                  className="input-style border-white bg-white/20 text-white"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addNewContentBlock}
            className="bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700 transition"
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
  );
};

export default AddBlogPage;
