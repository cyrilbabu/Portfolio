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
  FaArrowRight,
} from "react-icons/fa";

export async function generateMetadata({ params }) {
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "Blog Not Found | Cyril Babu",
      description: "This blog post was not found.",
    };
  }

  const blog = await res.json();

  return {
    title: blog.title || "Blog | Cyril Babu",
    description: blog.subtitle || blog.description?.slice(0, 150),
    keywords: [
      blog.title,
      blog.subtitle,
      "Cyril Babu",
      "Chropton Unsh Cyril Babu",
      "Web Dev Blog",
      "React",
      "Next.js",
      "Coding",
    ],
    openGraph: {
      title: blog.title,
      description: blog.subtitle || blog.description,
      url: `${baseUrl}/blog/${id}`,
      siteName: "Cyril Babu's Blog",
      images: [
        {
          url: blog.thumbnail ? `${baseUrl}/${blog.thumbnail}` : "/cyril.jpg",
          width: 800,
          height: 600,
        },
      ],
      type: "article",
      publishedTime: blog.created_at,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.subtitle || blog.description,
      images: [blog.thumbnail ? `${baseUrl}/${blog.thumbnail}` : "/cyril.jpg"],
    },
  };
}

export default async function BlogPage({ params }) {
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const blog = await res.json();

  return (
    <div className="bg-blue-950 text-white px-8 md:px-60 py-4 pb-12">
      <div className="max-w-4xl mx-auto shadow-2xl bg-white/10 rounded p-2 border-2 border-white">
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
      <div className="mt-4 border-2 border-white rounded-lg p-6 bg-white/10 shadow-2xl ">
        <p className="text-gray-200 ">{blog.content}</p>
      </div>

      {blog.contents?.length > 0 && (
        <div className="">
          {blog.contents.map((item, index) => (
            <div key={index}>
              <div className="mt-4 border-2 border-white rounded-lg p-6 bg-white/10 shadow-2xl ">
                {item.heading && (
                  <h3 className="text-xl border-l-4 border-red-500 pl-4 font-bold  text-white">
                    {item.heading}
                  </h3>
                )}

                {item.subtitle && (
                  <p className="text-sm text-gray-300 flex items-center gap-2 py-1 mt-2">
                    <FaArrowRight />
                    {item.subtitle}
                  </p>
                )}

                {item.content && (
                  <div className="text-gray-200 items-center gap-2 mt-2">
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                )}

                {item.url && (
                  <div className="mt-4 flex">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white border-2 border-white bg-white/40 font-bold px-2 py-1 rounded hover:underline flex items-center gap-1 text-sm"
                    >
                      <FaExternalLinkAlt />
                      {item.url_text || "View Link"}
                    </a>
                  </div>
                )}

                {item.image && (
                  <div className="mt-4 w-full flex justify-center items-center">
                    <img
                      src={`${baseUrl}/${item.image}`}
                      alt={item.heading}
                      className="max-w-3xl object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
