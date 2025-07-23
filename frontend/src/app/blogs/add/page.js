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
      await axios.post("/create/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Blog created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating blog");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-900">
        📝 Create New Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Password & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="password"
            name="password"
            placeholder="🔒 Admin Password"
            value={formData.password}
            onChange={handleTextChange}
            className="input-style"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleTextChange}
            className="input-style"
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
        <input
          type="text"
          name="title"
          placeholder="📌 Blog Title"
          value={formData.title}
          onChange={handleTextChange}
          className="input-style"
          required
        />

        <input
          type="text"
          name="subtitle"
          placeholder="✏️ Blog Subtitle"
          value={formData.subtitle}
          onChange={handleTextChange}
          className="input-style"
        />

        {/* Description & Content */}
        <textarea
          name="description"
          placeholder="📄 Short Description"
          value={formData.description}
          onChange={handleTextChange}
          rows={3}
          className="input-style"
          required
        ></textarea>

        <textarea
          name="content"
          placeholder="📝 Main Content"
          value={formData.content}
          onChange={handleTextChange}
          rows={6}
          className="input-style"
          required
        ></textarea>

        {/* Thumbnail & Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              🖼️ Thumbnail Image
            </label>
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              🎥 Blog Video (Optional)
            </label>
            <input
              type="file"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full"
            />
          </div>
        </div>

        {/* Blog Images */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            📸 Blog Images (Multiple)
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="w-full"
          />
        </div>

        <hr className="border-t-2 my-8" />

        {/* Content Blocks */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">
            📚 Content Blocks
          </h2>

          {formData.contents.map((content, index) => (
            <div
              key={index}
              className="p-6 mb-6 bg-gray-100 rounded-xl border border-gray-300 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="📰 Heading"
                  value={content.heading}
                  onChange={(e) =>
                    handleContentChange(index, "heading", e.target.value)
                  }
                  className="input-style"
                />
                <input
                  type="text"
                  placeholder="🔗 URL"
                  value={content.url}
                  onChange={(e) =>
                    handleContentChange(index, "url", e.target.value)
                  }
                  className="input-style"
                />
                <input
                  type="text"
                  placeholder="🔤 URL Text"
                  value={content.url_text}
                  onChange={(e) =>
                    handleContentChange(index, "url_text", e.target.value)
                  }
                  className="input-style"
                />
                <input
                  type="text"
                  placeholder="📝 Subtitle"
                  value={content.subtitle}
                  onChange={(e) =>
                    handleContentChange(index, "subtitle", e.target.value)
                  }
                  className="input-style"
                />
              </div>

              <textarea
                placeholder="📖 Content"
                value={content.content}
                onChange={(e) =>
                  handleContentChange(index, "content", e.target.value)
                }
                className="input-style"
                rows={4}
              />

              <div className="mt-4">
                <label className="block font-medium mb-1 text-gray-700">
                  📁 Upload Image
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleContentImageUpload(index, e.target.files[0])
                  }
                  className="w-full"
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
