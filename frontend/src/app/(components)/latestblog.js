import LatestBlogCarousel from "./BlogeSilider";

const LatestBlog = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/blogs/?page=1`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="text-red-500 text-center">Failed to load blogs</div>;
  }

  const data = await res.json();
  const blogs = data.blogs || [];

  if (blogs.length === 0) {
    return <div></div>;
  }

  return (
    <div className="w-full bg-yellow-400">
      <div className="w-full flex flex-col items-center justify-center pt-12  text-white">
        <h1 className="text-4xl font-extrabold text-blue-950 col-span-3 mb-4">
          Latest Blogs
        </h1>
        <p className="text-xl text-blue-950 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Here are some of my latest blog posts. Click on any blog to read more.
        </p>
      </div>
      <LatestBlogCarousel blogs={blogs} baseUrl={baseUrl} />
    </div>
  );
};

export default LatestBlog;
