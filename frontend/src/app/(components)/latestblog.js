import { FaEye, FaHeart, FaCommentDots, FaShareAlt } from "react-icons/fa";

const latestBlogData = [
  {
    id: 1,
    title: "My First Blog",
    subtitle: "Introduction to my journey",
    summary: "This is a short summary of my blog post.",
    url: "",
    url_text: "Thumbnail",
    video: "",
    likes: 45,
    views: 120,
    shares: 12,
    comments_count: 5,
    created_at: "2024-07-01T10:30:00",
  },
  {
    id: 2,
    title: "React Tips & Tricks",
    subtitle: "Level up your frontend skills",
    summary: "Let's explore some hidden gems in React development.",
    url: "",
    video: "",
    likes: 78,
    views: 200,
    shares: 25,
    comments_count: 14,
    created_at: "2024-07-03T09:15:00",
  },
  {
    id: 3,
    title: "Next.js Best Practices",
    subtitle: "Optimize your Next.js apps",
    summary: "Learn how to make your Next.js apps faster and more efficient.",
    url: "",
    url_text: "Thumbnail",
    video: "",
    likes: 60,
    views: 150,
    shares: 18,
    comments_count: 8,
    created_at: "2024-07-05T14:20:00",
  },
];

const LatestBlog = () => {
  return (
    <div className="w-full bg-yellow-400">
      <div className="w-full flex flex-col items-center justify-center pt-12  text-white">
        <h1 className="text-4xl font-extrabold text-blue-950 col-span-3 mb-4">
          Latest Blogs
        </h1>
        <p className="text-blue-950 col-span-3 text-lg mb-4">
          Here are some of my latest blog posts. Click on any blog to read more.
        </p>
      </div>
      <div className=" px-36 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {latestBlogData.map((blog) => (
          <div
            key={blog.id}
            className="bg-blue-950 text-white p-4 rounded-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={blog.url || "/default.jpg"}
              alt={blog.url_text || "Blog"}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              {blog.subtitle && (
                <p className="text-yellow-400 text-sm mb-2">{blog.subtitle}</p>
              )}
              <p className="text-white text-base mb-4">{blog.summary}</p>
              <div className="flex justify-between items-center text-yellow-400 text-sm">
                <span className="flex items-center gap-1">
                  <FaEye /> {blog.views}
                </span>
                <span className="flex items-center gap-1">
                  <FaHeart /> {blog.likes}
                </span>
                <span className="flex items-center gap-1">
                  <FaCommentDots /> {blog.comments_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaShareAlt /> {blog.shares}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
