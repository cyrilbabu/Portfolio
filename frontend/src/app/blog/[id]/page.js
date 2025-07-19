import { notFound } from "next/navigation";
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

export default async function BlogPage({ params }) {
  const { id } = params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/blogs/${id}`, {
    cache: "no-store", // disables caching
  });

  if (!res.ok) return notFound();

  const blog = await res.json();

  return (
    <div className="bg-blue px-36 py-8 bg-blue-950">
      <div className="text-white flex py-4  flex-row border-2 rounded px-4 mb-4 bg-white/10">
        <div className="md:w-5/12 w-full flex justify-center hover:scale-105 transition-transform duration-300">
          <img
            src={
              blog.thumbnail
                ? `${baseUrl}/${blog.thumbnail}`
                : "./placeholderbloge.png"
            }
            alt={blog.url_text || "Blog"}
            className="w-full h-80 object-cover rounded-lg border-2 shadow-2xl border-white"
          />
        </div>

        {/* Text content */}
        <div
          className={`md:w-7/12 w-full flex flex-col justify-between relative px-4`}
        >
          <div>
            <h2 className="text-2xl font-bold mb-1 text-gray-200 cursor-pointer hover:text-white transition-colors duration-300 hover:underline">
              {blog.title}
            </h2>

            {blog.subtitle && (
              <p className="text-gray-100 text-sm mb-2 border-l-4 px-2 py-1 border-red-500">
                <p>{blog.subtitle}</p>
              </p>
            )}

            <div className="flex w-full items-center text-gray-400 text-sm  mb-2 space-x-8">
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

            <p className="text-stone-200 text-base mb-4">{blog.description}</p>

            <div className="flex w-full items-center text-gray-50 text-lg  mb-2 space-x-8">
              {blog.url && (
                <div className="flex items-center gap-2 text-sm">
                  <FaExternalLinkAlt />

                  <a href={blog.url} className="text-white hover:underline">
                    {blog.url_text}
                  </a>
                </div>
              )}
              {blog.video && (
                <div className="flex items-center gap-2 ">
                  <FaVideo />
                </div>
              )}
              <div className="flex items-center gap-2">
                {/* <BlogSpeaker blog={blog} /> */}
                {/* <PiSpeakerHighFill /> */}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 text-white text-sm">
            <div className="flex items-center">
              <p
                className="border bg-white/30 text-white font-bold px-4 py-1 rounded-lg hover:bg-white/50 transition-colors duration-300 hover:scale-105"
                href={`/blog/${blog.id}`}
              >
                Read More
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <span className="flex items-center gap-1 border rounded-lg py-1 px-2 bg-white/20">
                <FaHeart /> {blog.likes}
              </span>
              <span className="flex items-center gap-1 border rounded-lg py-1 px-2 bg-white/20">
                <FaCommentDots /> {blog.comments_count}
              </span>
              <span className="flex items-center gap-1 border rounded-lg py-2 px-2 bg-white/20">
                <FaShare />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
