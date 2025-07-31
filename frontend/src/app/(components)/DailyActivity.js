import Link from "next/link";
import React from "react";

export default async function DailyActivity() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(
    `${baseUrl}/blogs/?page=1&category=What%20I%20Doing`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div className="text-red-500 text-center">Failed to load blogs</div>;
  }

  const data = await res.json();
  const blogs = data.blogs || [];

  console.log("Blogs:", blogs);
  return (
    <div className="w-full bg-blue-950 px-4 sm:px-8 md:px-16 lg:px-36">
      <div className="w-full flex flex-col items-center justify-center pt-12  text-white">
        <h1 className="text-4xl font-extrabold col-span-3 mb-4">
          See My Daily Updates
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto text-center animate-fade-in-up animation-delay-200">
          Explore what I&apos;ve been working on over the past few days — from
          new blog posts to behind-the-scenes updates. Stay tuned as I share my
          growth and experiences daily.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 p-4">
        {blogs.length === 0 && (
          <div className="col-span-2 text-center text-gray-400">
            Stay tuned for my daily updates!
          </div>
        )}
        {blogs.slice(0, 4).map((blog) => (
          <Link
            href={`/blog/${blog.id}`}
            key={blog.id}
            className="bg-white/20 border-2 border-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="py-10 w-full flex items-center justify-center bg-yellow-500 px-4 rounded">
              <p className="text-white font-bold text-4xl ">
                {blog.created_at.split("T")[0]}
              </p>
            </div>
            <h2 className="text-2xl font-bold text-gray-100 mb-2 mt-4">
              {blog.title}
            </h2>
            <h3 className="text-gray-300 border-l-4 border-red-500 pl-2">
              {blog.subtitle}
            </h3>
            <p className="text-gray-200 my-2">{blog.content}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
