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
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const blog = await res.json();

  return (
    <div className="bg-blue-950 text-white px-8 md:px-36 py-10">
      {/* <div className="flex flex-col md:flex-row border-2 border-white rounded-lg overflow-hidden shadow-2xl bg-white/10">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">{blog.title}</h1>
      </div> */}
      <div className="max-w-5xl mx-auto shadow-2xl bg-white/10 rounded-lg p-2 md:p-10">
        <img
          src={
            blog.thumbnail
              ? `${baseUrl}/${blog.thumbnail}`
              : "/placeholderbloge.png"
          }
          alt={blog.title}
          className="w-full rounded object-cover"
        />
      </div>

      {/* Thumbnail & Blog Header */}
      <div className="flex flex-col md:flex-row border-2 border-white rounded-lg overflow-hidden shadow-2xl bg-white/10 mt-4">
        <div className="w-full p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">
              {blog.title}
            </h1>

            {blog.subtitle && (
              <p className="text-sm text-gray-300 border-l-4 pl-3 py-2 border-red-500 mb-3">
                {blog.subtitle}
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-3">
              <div className="flex items-center gap-2">
                <FaCalendarCheck />
                {new Date(blog.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <FaEye />
                {blog.views}
              </div>
              <div className="flex items-center gap-2">
                <FaShareAlt />
                {blog.shares}
              </div>
            </div>

            <p className="text-stone-200 mb-4">{blog.description}</p>

            {blog.url && (
              <div className="flex items-center gap-2 text-sm text-white mb-2">
                <FaExternalLinkAlt />
                <a href={blog.url} target="_blank" className="hover:underline">
                  {blog.url_text}
                </a>
              </div>
            )}

            {blog.video && (
              <div className="flex items-center gap-2 text-sm text-white mb-2">
                <FaVideo />
                <span>Video included</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-6 text-white text-sm">
            <p className="bg-white/30 px-4 py-1 rounded hover:bg-white/50 font-semibold transition-all">
              Read More
            </p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
                <FaHeart />
                {blog.likes}
              </span>
              <span className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
                <FaCommentDots />
                {blog.comments_count}
              </span>
              <span className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
                <FaShare />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-10 ">
        <h2 className="text-2xl font-semibold mb-4">Blog Content</h2>
        <p className="text-gray-200 whitespace-pre-line">{blog.content}</p>
      </div>

      {/* Dynamic Blog Sections */}
      {blog.contents?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">More Details</h2>
          <div className="space-y-6">
            {blog.contents.map((item, index) => (
              <div
                key={index}
                className="p-6 border border-white/20 bg-white/10 rounded-xl"
              >
                <h3 className="text-xl font-bold text-white mb-1">
                  {item.heading}
                </h3>

                {item.subtitle && (
                  <p className="text-sm text-gray-300 italic mb-2">
                    {item.subtitle}
                  </p>
                )}

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1 mb-2 text-sm"
                  >
                    <FaExternalLinkAlt />
                    {item.url_text || "View Link"}
                  </a>
                )}

                <p className="text-gray-200 whitespace-pre-line">
                  {item.content}
                </p>

                {item.image && (
                  <div className="mt-4">
                    <img
                      src={`${baseUrl}/${item.image}`}
                      alt={item.heading}
                      className="w-full max-h-80 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
