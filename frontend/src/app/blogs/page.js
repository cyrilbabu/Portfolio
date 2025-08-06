// app/blogs/page.jsx
import SelectCategory from "./(components)/Categry";
import BlogCard from "./blogeCard";

// ✅ SEO Metadata
export async function generateMetadata({ searchParams }) {
  const title = searchParams?.title || "All Blogs";
  const category = searchParams?.category || "";
  const page = searchParams?.page || 1;

  const capitalizedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  const metaTitle = `${title}${
    category ? ` in ${capitalizedCategory}` : ""
  } | Blog`;
  const description = `Discover blogs${
    category ? ` in ${capitalizedCategory}` : ""
  } about ${title}. Page ${page}.`;

  return {
    title: metaTitle,
    description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs?title=${title}&category=${category}&page=${page}`,
    },
    openGraph: {
      title: metaTitle,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs?title=${title}&category=${category}&page=${page}`,
      type: "website",
    },
  };
}

// ✅ Main Page Component
const BlogList = async ({ searchParams }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const category = searchParams?.category || "";
  const title = searchParams?.title || "";
  const page = parseInt(searchParams?.page || 1);

  const query = new URLSearchParams({
    ...(category && { category }),
    ...(title && { title }),
    ...(page && { page }),
  });

  const res = await fetch(`${baseUrl}/blogs/?${query.toString()}`, {
    next: { revalidate: 60 }, // ✅ ISR
  });

  if (!res.ok) {
    return <div className="text-red-500 text-center">Failed to load blogs</div>;
  }

  const data = await res.json();
  const blogs = data.blogs || [];
  const totalPages = data.total_pages || 1;
  const currentPage = data.current_page || 1;

  // // ✅ JSON-LD Structured Data
  // const jsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "Blog",
  //   name: "Chropton Blog",
  //   url: `${baseUrl}/blogs`,
  //   blogPosts: blogs.map((blog) => ({
  //     "@type": "BlogPosting",
  //     headline: blog.title,
  //     url: `${baseUrl}/blog/${blog.slug}`,
  //     datePublished: blog.created_at,
  //     author: {
  //       "@type": "Person",
  //       name: blog.author || "Unknown",
  //     },
  //   })),
  // };

  return (
    <div className="w-full bg-blue-950 px-4 sm:px-6 md:px-10 lg:px-24 xl:px-36 py-8">
      {/* ✅ JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ✅ Page Heading */}
      <h1 className="text-white text-3xl font-bold mb-6">
        {category ? `Blogs in ${category}` : "All Blogs"}
      </h1>

      {/* ✅ Search Form */}
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

      {/* ✅ Category Filter */}
      <div className="mb-6">
        <SelectCategory selectedCategory={category} />
      </div>

      {/* ✅ Blog Cards */}
      {blogs.length > 0 ? (
        <div className="space-y-10">
          {blogs.map((blog, index) => (
            <article key={blog.id}>
              <BlogCard blog={blog} isReversed={index % 2 !== 0} />
            </article>
          ))}
        </div>
      ) : (
        <div className="text-white text-center text-lg">No blogs found</div>
      )}

      {/* ✅ Pagination with rel="next/prev" */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-10 space-y-4 sm:space-y-0 sm:space-x-6">
        {currentPage > 1 && (
          <a
            href={`?title=${title}&category=${category}&page=${
              currentPage - 1
            }`}
            rel="prev"
            className="bg-white text-blue-950 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Prev
          </a>
        )}
        <span className="text-white text-lg">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <a
            href={`?title=${title}&category=${category}&page=${
              currentPage + 1
            }`}
            rel="next"
            className="bg-white text-blue-950 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
};

export default BlogList;
