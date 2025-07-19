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

  console.log("Blogs data:", data);

  return (
    <div className="w-full bg-blue-950 px-36 py-8">
      {/* <div className="text-center mb-10">
        <p className="text-white/90 text-2xl font-bold mt-2">
          Explore my latest blogs and articles on various topics related to
          software development, AI, and more.
        </p>
      </div> */}

      {/* Search form */}
      <form className="mb-4 flex gap-2" method="GET">
        <input
          type="text"
          name="title"
          defaultValue={title}
          placeholder="Search blogs..."
          className="p-1 px-4 rounded bg-white/40 border-white border text-white w-full"
        />
        <button
          type="submit"
          className=" bg-white text-blue-950 px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {/* Categories */}
      {/* <div className="text-white text-center mb-4">
        <p className="text-2xl font-bold">Categories</p>
      </div> */}

      <SelectCategory selectedCategory={category} />

      {/* Blog Cards */}
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <BlogCard key={blog.id} blog={blog} isReversed={index % 2 !== 0} />
        ))
      ) : (
        <div className="text-white text-center">No blogs found</div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <a
          href={`?title=${title}&category=${category}&page=${Math.max(
            currentPage - 1,
            1
          )}`}
          className="bg-white text-blue-950 px-4 py-2 rounded"
        >
          Prev
        </a>
        <span className="text-white self-center">
          Page {currentPage} of {totalPages}
        </span>
        <a
          href={`?title=${title}&category=${category}&page=${Math.min(
            currentPage + 1,
            totalPages
          )}`}
          className="bg-white text-blue-950 px-4 py-2 rounded"
        >
          Next
        </a>
      </div>
    </div>
  );
};

export default BlogList;
