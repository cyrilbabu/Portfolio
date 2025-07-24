import SelectCategory from "./(components)/Categry";
import BlogCard from "./blogeCard";

const BlogList = async ({ searchParams }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const category = searchParams.category || "";
  const title = searchParams.title || "";
  const page = searchParams.page || 1;

  const query = new URLSearchParams({
    ...(category && { category }),
    ...(title && { title }),
    ...(page && { page }),
  });

  const res = await fetch(`${baseUrl}/blogs/?${query.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="text-red-500 text-center">Failed to load blogs</div>;
  }

  const data = await res.json();
  const blogs = data.blogs || [];
  const totalPages = data.total_pages || 1;
  const currentPage = data.current_page || 1;

  return (
    <div className="w-full bg-blue-950 px-4 sm:px-6 md:px-10 lg:px-24 xl:px-36 py-8">
      {/* Search Form */}
      <form className="mb-6 flex flex-col sm:flex-row gap-3" method="GET">
        <input
          type="text"
          name="title"
          defaultValue={title}
          placeholder="Search blogs..."
          className="p-2 px-4 rounded bg-white/40 border border-white text-white w-full sm:w-auto flex-1"
        />
        <button
          type="submit"
          className="bg-white text-blue-950 px-4 py-2 rounded font-semibold"
        >
          Search
        </button>
      </form>

      {/* Category Select */}
      <div className="mb-6">
        <SelectCategory selectedCategory={category} />
      </div>

      {/* Blog Cards */}
      {blogs.length > 0 ? (
        <div className="space-y-10">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} isReversed={index % 2 !== 0} />
          ))}
        </div>
      ) : (
        <div className="text-white text-center text-lg">No blogs found</div>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-10 space-y-4 sm:space-y-0 sm:space-x-6">
        <a
          href={`?title=${title}&category=${category}&page=${Math.max(
            currentPage - 1,
            1
          )}`}
          className="bg-white text-blue-950 px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Prev
        </a>
        <span className="text-white text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <a
          href={`?title=${title}&category=${category}&page=${Math.min(
            currentPage + 1,
            totalPages
          )}`}
          className="bg-white text-blue-950 px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Next
        </a>
      </div>
    </div>
  );
};

export default BlogList;
