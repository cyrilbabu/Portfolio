import React from "react";
import BlogCard from "../blogs/blogeCard";

export default async function LatestBlog() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/blogs/?page=1`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="text-red-500 text-center">Failed to load blogs</div>;
  }

  const data = await res.json();
  const blogs = data.blogs || [];

  return (
    <div>
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} isReversed={index % 2 !== 0} />
          ))}
        </div>
      ) : (
        <div className="text-white text-center text-lg">No blogs found</div>
      )}
    </div>
  );
}
